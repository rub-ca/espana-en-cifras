package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import static org.example.Utils.getCellValueAsString;

public class Sec8_c2 {
    // A JSON is generated that contains an 2D array
    // 2D array | 1 year, 2 type
    // todas, incapacidad, jubilacion, viudedad, orfandad, favor_familiar
    //
    // in js:
    // data[5][2]
    // year [5] | type [2 = jubilacion]

    final static int FIRST_DATA_ROW = 2;

    public static void main(String[] args) {
        IOUtils.setByteArrayMaxOverride(500 * 1024 * 1024);
        start();
    }

    private static void start() {
        String excelFilePath = "data\\" + "sec8_c2.xlsx";
        String jsonFilePath = "data\\" + "sec8_c2.json";

        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);
            int maxRows = sheet.getPhysicalNumberOfRows();

            ArrayList<ArrayList<Integer>> data = new ArrayList<>();

            for (int rowIndex = FIRST_DATA_ROW; rowIndex < maxRows; rowIndex++) {
                Row row = sheet.getRow(rowIndex);
                if (row == null) {
                    System.out.println("No se puede procesar fila " + rowIndex);
                    break;
                }
                String year = getCellValueAsString(row.getCell(0));

                if (!year.toLowerCase().contains("enero")) continue;


                ArrayList<Integer> dataYear = new ArrayList<>();

                for (int ce = 1; ce < 7; ce++) {
                    int val = (int) row.getCell(ce).getNumericCellValue();
                    dataYear.add(val);
                }
                data.add(dataYear);
            }

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String jsonOutput = gson.toJson(data);

            try (FileWriter writer = new FileWriter(jsonFilePath)) {
                writer.write(jsonOutput);
                System.out.println("JSON exportado exitosamente en: " + jsonFilePath);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
