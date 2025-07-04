package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.example.Utils.getCellValueAsString;

public class PobMuniPais {
    // A JSON is generated that contains an array
    // each item represents a province
    // and contains a 3D array with the information
    // 3D array | 1 genre, 2 region, 3 year,
    //
    // in js:
    // data[0].data[1][2][3]
    // muni [0] | genre [1] male | region [2] | year [3]

    final static int AMOUNT_PAISES = 59;
    final static int MAX_YEARS = 4;
    final static int COLUMS_PER_GENRE = MAX_YEARS * AMOUNT_PAISES;
    final static int FIRST_DATA_ROW = 9;
    final static int FIRST_GENRE_INDEX_COL = 1;
    final static int MAX_ROWS = 8194;
    final static String fileName = "PobMuniPais";

    public static void main(String[] args) {
        IOUtils.setByteArrayMaxOverride(500 * 1024 * 1024);
        start();
    }

    private static void start() {
        String excelFilePath = fileName + ".xlsx";
        String jsonFilePath = fileName + ".json";

        List<MunicipioData> allData = new ArrayList<>();
        List<String> allNames = new ArrayList<>();

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

        String municipioName = getCellValueAsString(row.getCell(0)).trim();
        ArrayList<ArrayList<ArrayList<Long>>> data = new ArrayList<>();

        for (int columnaGeneroIndex = 0; columnaGeneroIndex < 3; columnaGeneroIndex++) {
            ArrayList<ArrayList<Long>> dataGenre = new ArrayList<>();

            for (int origenColIndex = 0; origenColIndex < AMOUNT_PAISES; origenColIndex++) {

                ArrayList<Long> dataOrigen = new ArrayList<>();

                for (int yearColIndex = 0; yearColIndex < MAX_YEARS; yearColIndex++) {
                    final int finalRowIndex = (columnaGeneroIndex * COLUMS_PER_GENRE) + (origenColIndex * MAX_YEARS) + yearColIndex + FIRST_GENRE_INDEX_COL;
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
