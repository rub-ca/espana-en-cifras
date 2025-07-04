package org.example;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class Stats {
    public static void main(String[] args) throws IOException {
        processMunicipios();
    }

    private static void processMunicipios() throws IOException {
        String pathMuni1 = "C:\\Users\\ikaru\\Desktop\\españa cifras\\excelToJson\\PobMuniEdad.json";

        String read = Files.readString(Paths.get(pathMuni1));

        Gson gson = new Gson();

        JsonElement jsonElement = gson.fromJson(read, JsonElement.class);
        JsonArray jsonArray = jsonElement.getAsJsonArray();

        Map<String, Long> mapaNombresCantidadPoblacion = new HashMap<>();

        for (int i = 1; i < jsonArray.size(); i++) {
            JsonElement j = jsonArray.get(i);

            JsonArray jPob = j.getAsJsonObject().get("data").getAsJsonArray();
            Long poblacion = jPob.get(0).getAsJsonArray().get(0).getAsJsonArray().get(0).getAsLong();

            String name = j.getAsJsonObject().get("name").getAsString();
            mapaNombresCantidadPoblacion.put(name, poblacion);
        }

        // Ordenar por valor de mayor a menor
        List<Map.Entry<String, Long>> listaOrdenada = mapaNombresCantidadPoblacion.entrySet()
                .stream()
                .sorted(Map.Entry.<String, Long>comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toList());

        System.out.println("5 mayores:");
        listaOrdenada.stream()
                .limit(5)
                .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));

        System.out.println("\n5 menores:");
        listaOrdenada.stream()
                .skip(Math.max(0, listaOrdenada.size() - 5))
                .forEach(e -> System.out.println(e.getKey() + ": " + e.getValue()));

    }
}
