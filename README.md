Paginas:

primario: pais de nacimiento   otros: edad, genero
https://www.ine.es/jaxiT3/Tabla.htm?t=56937 ->  PobEdadPais  -> 56937
Se han eliminado columnas del excel para dejar solo las cifras de enero


primario: provincia   otros: edad, pais de nacimiento, genero
https://www.ine.es/jaxiT3/Tabla.htm?t=56948&L=0 -> PobProvPais -> 56948
Se han eliminado columnas del excel para dejar solo las cifras de enero


primario: municipios   otros: genero, pais de nacimiento
https://www.ine.es/jaxiT3/Tabla.htm?t=66322&L=0   -> PobMuniPais  > 66322  


primario: municipios   otros: genero, edad
https://www.ine.es/jaxiT3/Tabla.htm?t=68535&L=0   -> PobMuniEdad  > 68535  



Bug encontrados:
- En el dual range slider funciona mal si intentas introducir manualmente un numero menor que el limite menor actual
- En el dual range slider funciona mal en rango de edad si pones un numero que no coincide exactamente que un limite de un rango


Mejoras:

- En el header de la poblacion añadir un boton para resetear (volver a tener todos los valores por defecto) 
- En el header de la poblacion añadir un boton para decir de donde proviene la información (quizás un modal)
- En muni screener, al lado del nombre, añadir dos enlaces, uno que te abra el municipio en la pagina de edades y otro en la pagina de muni por pais origen