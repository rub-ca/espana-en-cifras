## Paginas poblacion:

##### 1. PobEdadPais
Filtro primario: pais de nacimiento
Filtros secundarios: edad, genero

Datos: https://www.ine.es/jaxiT3/Tabla.htm?t=56937
Se han eliminado columnas del excel para dejar solo las cifras de enero

##### 2 PobProvPais
Filtro primario: provincia
Filtros secundarios: edad, pais de nacimiento, genero

Datos: https://www.ine.es/jaxiT3/Tabla.htm?t=56948&L=0 
Se han eliminado columnas del excel para dejar solo las cifras de enero

##### 3 PobMuniPais
Filtro primario: municipios
Filtros secundarios: genero, pais de nacimiento

https://www.ine.es/jaxiT3/Tabla.htm?t=66322&L=0

##### 4. PobMuniEdad
Filtro primario: municipios
Filtros secundarios: genero, edad

https://www.ine.es/jaxiT3/Tabla.htm?t=68535&L=0  



## Paginas empleo:

https://www.ine.es/jaxiT3/Tabla.htm?t=65321  -> EmpPubPri

https://www.ine.es/jaxiT3/Tabla.htm?t=65354 -> EmpProvSector
Pagina que muestra las personas que trabajan por provincia
y sector agricultura/servicios/etc 

Pagina que a nivel nacional muestra cuantas personas trabajan en el sector privado
y cuantas cobran del gobierno, sector publico, imv, paro, pensiones.



Bug encontrados:

- En el dual range slider funciona mal si intentas introducir manualmente un numero menor que el limite menor actual
- En el dual range slider funciona mal en rango de edad si pones un numero que no coincide exactamente que un limite de un rango
- Mientras se esta cargando una tabla se muestra un mensaje de no hay datos disponibles en vez de 'cargando datos'



Mejoras:

- En el header de la poblacion añadir un boton para resetear (volver a tener todos los valores por defecto) 
- En el header de la poblacion añadir un boton para decir de donde proviene la información (quizás un modal)
- En muni screener, al lado del nombre, añadir dos enlaces, uno que te abra el municipio en la pagina de edades y otro en la pagina de muni por pais origen
- Se ha aplicado un limite maximo de resultados en el screener de municipios, pero todavia no hay nada visual que se lo diga al usuario



UI:

- Emp prov sector, hacer coincidir los colores de los sectores en la tabla con los colores de los sectores en el grafico