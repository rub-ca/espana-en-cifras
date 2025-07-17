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
import java.util.List;

import static org.example.Utils.getCellValueAsString;

public class EmpPubPri {
    // A JSON is generated that contains an array
    // each item represents a comunidad autonoma
    // and contains a array with the information
    // 2D array | 1 type, 2 year,
    //
    // in js:
    // data[0].data[1][2]
    // comunidad [0] | type [1] | year [2]
    // type 0 empleo publico
    // type 1 empleo privado


    final static int AMOUNT_TYEARS = 93;
    final static int AMOUNT_YEARS = 23;
    final static int FIRST_DATA_ROW = 9;
    final static int FIRST_TYPE_INDEX_COL = 1 + AMOUNT_TYEARS; // Los primeros datos son los totales
    final static int MAX_ROWS = 29;
    final static String fileName = "EmpPubPri";

    public static void main(String[] args) {
        IOUtils.setByteArrayMaxOverride(500 * 1024 * 1024);
        start();
    }

    private static void start() {
        String excelFilePath = fileName + ".xlsx";
        String jsonFilePath = fileName + ".json";

        List<ComunidadData> allData = new ArrayList<>();

        try (FileInputStream fis = new FileInputStream(excelFilePath);
             Workbook workbook = new XSSFWorkbook(fis)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int rowIndex = FIRST_DATA_ROW; rowIndex < MAX_ROWS; rowIndex++) {
                ComunidadData comunidadData = processMunicipio(sheet, rowIndex);

                if (comunidadData == null) {
                    System.out.println("No se puede procesar fila " + rowIndex);
                    continue;
                }

                allData.add(comunidadData);
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

    private static ComunidadData processMunicipio(Sheet sheet, int rowIndex) {
        Row row = sheet.getRow(rowIndex);
        if (row == null) return null;

        String municipioName = getCellValueAsString(row.getCell(0)).trim();
        ArrayList<ArrayList<String>> data = new ArrayList<>();

        for (int type = 0; type < 2; type++) {
            ArrayList<String> dataYear = new ArrayList<>();

            for (int year = 0; year < AMOUNT_YEARS; year++) {
                final int finalRowIndex = FIRST_TYPE_INDEX_COL + (type * AMOUNT_TYEARS) + (year * 4);
                String val = getCellValueAsString(row.getCell(finalRowIndex));
                dataYear.add(val);
            }
            
            data.add(dataYear);
        }

        return new ComunidadData(municipioName, data);
    }

    static class ComunidadData {
        private String name;
        private ArrayList<ArrayList<String>> data;

        public ComunidadData(String provincia, ArrayList<ArrayList<String>> data) {
            this.name = provincia;
            this.data = data;
        }

        public String getMunicipio() {
            return name;
        }

        public ArrayList<ArrayList<String>> getData() {
            return data;
        }
    }
}
