package org.example;

import com.google.gson.*;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;

import java.io.FileReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Utils {
    public static void main(String[] args) {
        calcularRepetidos();
    }

    private static void calcularRepetidos () {
        String path = "C:\\Users\\ikaru\\Desktop\\españa cifras\\excelToJson\\PobMuniPais.json";

        try (Reader reader = new FileReader(path)) {
            Gson gson = new Gson();

            JsonElement jsonElement = JsonParser.parseReader(reader);
            JsonArray jArray = jsonElement.getAsJsonArray();


            Map<String, Integer> nameCount = new HashMap<>();

            // Contar ocurrencias de cada name
            for (JsonElement element : jArray) {
                JsonObject obj = element.getAsJsonObject();
                String name = obj.get("name").getAsString();

                nameCount.put(name, nameCount.getOrDefault(name, 0) + 1);
            }

            // Filtrar nombres repetidos
            List<String> repetidos = new ArrayList<>();
            for (Map.Entry<String, Integer> entry : nameCount.entrySet()) {
                if (entry.getValue() > 1) {
                    repetidos.add(entry.getKey() + " (" + entry.getValue() + ")");
                }
            }

            // Mostrar repetidos
            for (String s : repetidos) {
                System.out.println(s);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static String getCellValueAsString(Cell cell) {
        if (cell == null) return "";

        return switch (cell.getCellType()) {
            case STRING -> cell.getStringCellValue();
            case NUMERIC -> DateUtil.isCellDateFormatted(cell)
                    ? cell.getDateCellValue().toString()
                    : String.valueOf(cell.getNumericCellValue());
            case BOOLEAN -> String.valueOf(cell.getBooleanCellValue());
            case FORMULA -> cell.getCellFormula();
            case BLANK -> "";
            default -> "???";
        };
    }
}
