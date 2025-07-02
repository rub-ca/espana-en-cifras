package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static org.example.Utils.getCellValueAsString;

public class PobProvPais {
    // A JSON is generated that contains an array
    // each item represents a province
    // and contains a 4D array with the information
    // 4D array | 1 age group, 2 persons region, 3 year, 4 gender (0 = total, 1 = male, 2 = female)
    //
    // in js:
    // data[0].data[3][1][5][2]
    // province [0] | age group [3] | region [1] | year [5] | gender [2] (female)

    final static int ROWS_PER_PROVINCIA = 1061;
    final static int ROWS_PER_GRUPO_EDAD = 53;
    final static int ROWS_PER_REGION = 4;
    final static int MAX_YEARS = 23;
    final static int FIRST_DATA_ROW = 7;
    final static String fileName = "PobProvPais";

    public static void main(String[] args) {
        start();
    }

    private static void start() {
        String excelFilePath = fileName + ".xlsx";
        String jsonFilePath = fileName + ".json";

        List<ProvinciaData> allData = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);
            int maxRows = sheet.getPhysicalNumberOfRows();

            for (int rowIndex = FIRST_DATA_ROW; rowIndex < maxRows; rowIndex += ROWS_PER_PROVINCIA) {
                ProvinciaData provinciaData = processProvincia(sheet, rowIndex);
                if (provinciaData == null) {
                    System.out.println("No se puede procesar fila " + rowIndex);
                    continue;
                }
                allData.add(provinciaData);
            }

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(allData);

            try (FileWriter writer = new FileWriter(jsonFilePath)) {
                writer.write(jsonOutput);
                System.out.println("JSON exportado exitosamente en: " + jsonFilePath);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static ProvinciaData processProvincia(Sheet sheet, int provinciaStartRow) {
        Row row = sheet.getRow(provinciaStartRow);
        if (row == null) return null;

        String provinciaName = getCellValueAsString(row.getCell(0)).replaceAll("\\d", "").trim();

        ArrayList<ArrayList<ArrayList<ArrayList<Long>>>> data = new ArrayList<>();

        for (int grupoEdadStart = provinciaStartRow + 2; grupoEdadStart < provinciaStartRow + ROWS_PER_PROVINCIA; grupoEdadStart += ROWS_PER_GRUPO_EDAD) {
            ArrayList<ArrayList<ArrayList<Long>>> grupoEdadList = new ArrayList<>();

            for (int regionStart = grupoEdadStart; regionStart < grupoEdadStart + ROWS_PER_GRUPO_EDAD; regionStart += ROWS_PER_REGION) {
                ArrayList<ArrayList<Long>> yearList = new ArrayList<>();

                Row totalRow = sheet.getRow(regionStart + 1);
                Row maleRow = sheet.getRow(regionStart + 2);
                Row femaleRow = sheet.getRow(regionStart + 3);

                for (int col = 1; col <= MAX_YEARS; col++) {
                    ArrayList<Long> generoList = new ArrayList<>();
                    long total = getNumericCellValue(totalRow, col);
                    long male = getNumericCellValue(maleRow, col);
                    long female = getNumericCellValue(femaleRow, col);

                    generoList.add(total);
                    generoList.add(male);
                    generoList.add(female);

                    yearList.add(generoList);
                }

                grupoEdadList.add(yearList);
            }

            data.add(grupoEdadList);
        }

        return new ProvinciaData(provinciaName, data);
    }

    private static long getNumericCellValue(Row row, int colIndex) {
        if (row == null) return 0;
        Cell cell = row.getCell(colIndex);
        try {
            return cell != null ? (long) cell.getNumericCellValue() : 0;
        } catch (Exception e) {
            return 0;
        }
    }


    static class ProvinciaData {
        private String name;
        private ArrayList<ArrayList<ArrayList<ArrayList<Long>>>> data;

        public ProvinciaData(String provincia, ArrayList<ArrayList<ArrayList<ArrayList<Long>>>> data) {
            this.name = provincia;
            this.data = data;
        }

        public String getProvincia() {
            return name;
        }

        public ArrayList<ArrayList<ArrayList<ArrayList<Long>>>> getData() {
            return data;
        }
    }

}