package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.example.Utils.getCellValueAsString;

public class PobMuniEdad {
    // A JSON is generated that contains an array
    // each item represents a province
    // and contains a 3D array with the information
    // 3D array | 1 genre, 2 region, 3 year,
    //
    // in js:
    // data[0].data[1][2][3]
    // province [0] | genre [1] male | age [2] | year [3]

    final static int AMOUNT_AGE_GROUPS = 22;
    final static int MAX_YEARS = 4;
    final static int COLUMS_PER_GENRE = MAX_YEARS * AMOUNT_AGE_GROUPS;
    final static int FIRST_DATA_ROW = 10;
    final static int FIRST_GENRE_INDEX_COL = 1;
    final static int MAX_ROWS = 8195;
    final static int SHIFT_EXTRANJERO = 2 * MAX_YEARS;
    final static String fileName = "PobMuniEdad";

    public static void main(String[] args) throws IOException {
        IOUtils.setByteArrayMaxOverride(500 * 1024 * 1024);
        start();
    }

    private static void start() throws IOException {
        String excelFilePath = fileName + ".xlsx";
        String jsonFilePath = fileName + ".json";

        List<MunicipioData> allData = new ArrayList<>();
        List<String> allNames = new ArrayList<>();

        borrarColumnasPorPatron(excelFilePath);

        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int rowIndex = FIRST_DATA_ROW; rowIndex < MAX_ROWS; rowIndex++) {
                String[] splitted = sheet.getRow(rowIndex).getCell(0).getStringCellValue().split(" ");
                if (splitted[0].length() < 3) {
                    System.out.println(splitted[0]);
                    System.out.println("Provincia en fila: " + rowIndex);
                    continue;
                }


                MunicipioData municipioData = processMunicipio(sheet, rowIndex);


                if (municipioData == null) {
                    System.out.println("No se puede procesar fila " + rowIndex);
                    continue;
                }
                allData.add(municipioData);
                allNames.add(municipioData.getMunicipio());
            }

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(allData);

            try (FileWriter writer = new FileWriter(jsonFilePath)) {
                writer.write(jsonOutput);
                System.out.println("JSON exportado exitosamente en: " + jsonFilePath);
            }

            try (FileWriter writer = new FileWriter(fileName + "-names.json")) {
                String json = gson.toJson(allNames);
                writer.write(json);
            }


        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static MunicipioData processMunicipio(Sheet sheet, int rowIndex) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) return null;

        String municipioName = getCellValueAsString(row.getCell(0)).replaceAll("\\d", "").trim();
        ArrayList<ArrayList<ArrayList<Long>>> data = new ArrayList<>();

        for (int columnaGeneroIndex = 0; columnaGeneroIndex < 3; columnaGeneroIndex++) {
            ArrayList<ArrayList<Long>> dataGenre = new ArrayList<>();

            for (int edadColIndex = 0; edadColIndex < AMOUNT_AGE_GROUPS; edadColIndex++) {

                ArrayList<Long> dataOrigen = new ArrayList<>();

                for (int yearColIndex = 0; yearColIndex < MAX_YEARS; yearColIndex++) {
                    final int finalRowIndex = (columnaGeneroIndex * COLUMS_PER_GENRE) + (edadColIndex * MAX_YEARS)
                            + yearColIndex + FIRST_GENRE_INDEX_COL + (edadColIndex * SHIFT_EXTRANJERO)
                            +(columnaGeneroIndex*SHIFT_EXTRANJERO*AMOUNT_AGE_GROUPS);
                    String val = getCellValueAsString(row.getCell(finalRowIndex));

                    long total = 0;
                    try {
                        total = (long) Double.parseDouble(val);
                    } catch (NumberFormatException e) {
                        total = 0;
                    }

                    dataOrigen.add(total);
                }

                dataGenre.add(dataOrigen);
            }

            data.add(dataGenre);
        }
        return new MunicipioData(municipioName, data);
    }


    public static void borrarColumnasPorPatron(String rutaArchivo) throws IOException {
        FileInputStream fis = new FileInputStream(rutaArchivo);
        Workbook workbook = new XSSFWorkbook(fis);
        Sheet sheet = workbook.getSheetAt(0);

        int startCol = 5; // columna 6 en índice 0-based
        int deleteCols = 8;
        int keepCols = 4;

        for (Row row : sheet) {
            System.out.println("borrando fila: " + row.getRowNum());
            int col = startCol;
            boolean delete = true;
            while (col < row.getLastCellNum()) {
                if (delete) {
                    for (int i = 0; i < deleteCols && col + i < row.getLastCellNum(); i++) {
                        Cell cell = row.getCell(col + i);
                        if (cell != null) {
                            row.removeCell(cell);
                        }
                    }
                    col += deleteCols;
                } else {
                    col += keepCols;
                }
                delete = !delete;
            }
        }

        fis.close();

        // Sobrescribir el mismo archivo
        FileOutputStream fos = new FileOutputStream(rutaArchivo);
        workbook.write(fos);
        fos.close();
        workbook.close();
    }

    static class MunicipioData {
        private String name;
        private ArrayList<ArrayList<ArrayList<Long>>> data;

        public MunicipioData(String provincia, ArrayList<ArrayList<ArrayList<Long>>> data) {
            this.name = provincia;
            this.data = data;
        }

        public String getMunicipio() {
            return name;
        }

        public ArrayList<ArrayList<ArrayList<Long>>> getData() {
            return data;
        }
    }

}
