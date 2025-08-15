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

public class PobEdadPais {
    // A JSON is generated that contains an array
    // each item represents a country
    // and contains a 3D array with the information
    // 3D array | 1 age, 2 year, 3 genre (0 = total, 1 = male, 2 = female)

    // in js:
    // data[0].data[3][3][1]
    // country [0] | age-group [3] | year [3] | genre [male]


    final static int ROWS_PER_COUNTRY = 81;
    final static int MAX_YEARS = 23;
    final static int FIRST_AGEGROUP_INDEX_ROW = 7;
    final static String fileName = "PobEdadPais";

    public static void main(String[] args) {
        start();
    }

    private static void start() {
        String excelFilePath = "data\\" + fileName + ".xlsx";
        String jsonFilePath = "data\\" + fileName + ".json";

        List<CountryData> allCountriesData = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);
            int maxRows = sheet.getPhysicalNumberOfRows();

            for (int rowIndex = FIRST_AGEGROUP_INDEX_ROW; rowIndex < maxRows; rowIndex += ROWS_PER_COUNTRY) {
                CountryData countryData = processCountry(sheet, rowIndex);
                if (countryData == null) {
                    System.out.println("Cannot process row " + rowIndex + " (block " + (rowIndex / 81) + ")");
                    continue;
                }
                allCountriesData.add(countryData);
            }

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(allCountriesData);

            try (FileWriter writer = new FileWriter(jsonFilePath)) {
                writer.write(jsonOutput);
                System.out.println("JSON exportado exitosamente en: " + jsonFilePath);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static CountryData processCountry(Sheet sheet, int indexCountryStarts) {
        Row row = sheet.getRow(indexCountryStarts);

        if (row == null) return null;

        Cell countryNameCell = row.getCell(0);
        String countryName = getCellValueAsString(countryNameCell);

        // 3D array | 1 age, 2 year, 3 genre (0 = total, 1 = hombres, 2 = mujeres)
        ArrayList<ArrayList<ArrayList<Long>>> array = new ArrayList<>();

        for (int ageGroup = 0, readingRow = indexCountryStarts + 2; readingRow < indexCountryStarts + ROWS_PER_COUNTRY; readingRow += 4, ageGroup++) {
            ArrayList<ArrayList<Long>> yearList = new ArrayList<>();

            Row totalRow = sheet.getRow(readingRow);
            Row maleRow = sheet.getRow(readingRow + 1);
            Row femaleRow = sheet.getRow(readingRow + 2);

            for (int col = 1; col <= MAX_YEARS; col++) {
                ArrayList<Long> genreList = new ArrayList<>();

                Cell totalCell = totalRow.getCell(col);
                Cell maleCell = maleRow.getCell(col);
                Cell femaleCell = femaleRow.getCell(col);
                long total = 0;
                long male = 0;
                long female = 0;
                try {
                    total = (long) totalCell.getNumericCellValue();
                    male = (long) maleCell.getNumericCellValue();
                    female = (long) femaleCell.getNumericCellValue();
                } catch (IllegalStateException excep) {
                    total = 0;
                    male = 0;
                    female = 0;
                }


                genreList.add(total);  // 0: Total
                genreList.add(male);   // 1: Male
                genreList.add(female); // 2: Female

                yearList.add(genreList); // Add the genre list for the year
            }

            array.add(yearList); // Add the year list for the age group
        }

        return new CountryData(countryName, array);
    }


    static class CountryData {
        private String name;
        private ArrayList<ArrayList<ArrayList<Long>>> data;

        public CountryData(String country, ArrayList<ArrayList<ArrayList<Long>>> data) {
            this.name = country;
            this.data = data;
        }

        // Getters opcionales si los necesitas
        public String getName() {
            return name;
        }

        public ArrayList<ArrayList<ArrayList<Long>>> getData() {
            return data;
        }
    }
}
