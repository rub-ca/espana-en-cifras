package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class EmpProvSector {
    // A JSON is generated that contains an array
    // each item represents a province
    // and contains a array with the information
    // 2D array | 1 sector, 2 year,
    //
    // in js:
    // data[0].data[1][2]
    // province [0] | sector [1] | year [2]
    // sector 0 total
    // sector 1 agriculture
    // sector 2 industry
    // sector 3 building
    // sector 4 services

    // AMOUNT_TYEARS = 66
    // Empieza en 2008 y tenemos datos hasta T2 2025
    // 17 years completos (4 * 17 = 68) + 2 trimestres de 2025
    final static int AMOUNT_TYEARS = 70; // Cantidad de columnas por seccion
    final static int AMOUNT_YEARS = 18; // Cantidad de years, debe subir con el tiempo
    final static int FIRST_DATA_ROW = 8;
    final static int MAX_ROWS = 61;

    public static void main(String[] args) {
        start();
    }

    private static void start() {
        String excelFilePath = "EmpProvSector.xlsx";
        String jsonFilePath = "EmpProvSector.json";

        List<ProvinciaEmpData> allData = new ArrayList<>();


        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);


            for (int rowIndex = FIRST_DATA_ROW; rowIndex < MAX_ROWS; rowIndex++) {
                ProvinciaEmpData provinceData = processProvinciaEmpData(sheet, rowIndex);

                if (provinceData == null) {
                    System.out.println("No se puede procesar fila " + rowIndex);
                    continue;
                }

                allData.add(provinceData);
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

    private static ProvinciaEmpData processProvinciaEmpData(Sheet sheet, int rowIndex) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) return null;

        String provinceName = row.getCell(0).getStringCellValue();
        ArrayList<ArrayList<Double>> data = new ArrayList<>();

        for (int sector = 0; sector < 5; sector++) {
            ArrayList<Double> sectorData = new ArrayList<>();

            for (int year = 0; year < AMOUNT_YEARS; year++) {
                int cellIndex = 1 + 1 + (sector * AMOUNT_TYEARS) + (year * 4);
                Double yearValue = 0.0;
                try {
                    yearValue = row.getCell(cellIndex).getNumericCellValue();
                } catch (Exception e) {
                    System.out.println("Error al procesar fila " + rowIndex + ", sector " + sector + ", year " + year);
                }
                sectorData.add(yearValue);
            }
            data.add(sectorData);

        }

        ProvinciaEmpData provinciaEmpData = new ProvinciaEmpData();
        provinciaEmpData.name = provinceName;
        provinciaEmpData.data = data;
        return provinciaEmpData;
//
//        System.out.println(row);
//        System.out.println(provinceName);

    }


    static class ProvinciaEmpData {
        private String name;
        private ArrayList<ArrayList<Double>> data;

        public String getName() {
            return name;
        }

        public ArrayList<ArrayList<Double>> getData() {
            return data;
        }
    }
}
