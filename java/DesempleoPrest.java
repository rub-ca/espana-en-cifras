package org.example;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.poi.openxml4j.util.ZipSecureFile;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class DesempleoPrest {
    // PENSIONES

    // A JSON is generated that contains data and an 2D array
    // 2D array | 1 year, 2 type
    // total, prest-contributiva, subsidio-desempleo, renta-agraria, subsidio-agrario, renta-inserccion
    //
    // in js:
    // data.data[5][2]
    // year [5] | type [2 = prest-contributiva]
    // data.maxYear = 2025
    // data.minYear = 2017

    public static void main(String[] args) {
        IOUtils.setByteArrayMaxOverride(500 * 1024 * 1024);
        ZipSecureFile.setMinInflateRatio(0.0);
        start();
    }

    private static void start() {

        String pathFolder = "data\\desempleo-prestaciones";
        String jsonFilePath = pathFolder + "\\" + "DesempleoPrest.json";

        // List files
        File folder = new File(pathFolder);

        File[] files = folder.listFiles((dir, name) -> name.endsWith(".xlsx"));

        int maxYear = 0, minYear = 9999;
        ArrayList<ArrayList<Integer>> data = new ArrayList<>();

        for (int x = 0; x < files.length; x++) {
            String fileName = files[x].getName();
            String[] aFileName = fileName.split(" "); // [1] year, [2] month
            ArrayList<Integer> yearData = new ArrayList<>();

            System.out.println("Processing file: " + fileName);

            if (Integer.parseInt(aFileName[1]) >= maxYear) maxYear = Integer.parseInt(aFileName[1]);
            if (Integer.parseInt(aFileName[1]) <= minYear) minYear = Integer.parseInt(aFileName[1]);

            try (FileInputStream fis = new FileInputStream(files[x]);
                 Workbook workbook = new XSSFWorkbook(fis)) {

                Sheet sheet = workbook.getSheetAt(2); //  BP 1.1

                Row dataRow = sheet.getRow(19);

                for (int indexType = 0; indexType < 6; indexType++) {
                    Integer value = (int) dataRow.getCell(indexType + 2).getNumericCellValue();
                    yearData.add(value);
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
            data.add(yearData);
        }
        DesempleoPrestData infoJSON = new DesempleoPrestData(data, maxYear, minYear);

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        String jsonOutput = gson.toJson(infoJSON);


        System.out.println("\nMax year: " + maxYear);
        System.out.println("Min year: " + minYear + "\n");

        try (FileWriter writer = new FileWriter(jsonFilePath)) {
            writer.write(jsonOutput);
            System.out.println("JSON exportado exitosamente en: " + jsonFilePath);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


    }


    static class DesempleoPrestData {
        private ArrayList<ArrayList<Integer>> data; // 2D array | 1 year, 2 type
        int maxYear;
        int minYear;

        public DesempleoPrestData(ArrayList<ArrayList<Integer>> d, int maxYear, int minYear) {
            this.data = d;
            this.maxYear = maxYear;
            this.minYear = minYear;
        }
    }
}
