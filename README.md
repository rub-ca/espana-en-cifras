## Páginas población

#### 1. PobEdadPais

**Filtro primario:** país de nacimiento  
**Filtros secundarios:** edad, género  

[Datos - 56937](https://www.ine.es/jaxiT3/Tabla.htm?t=56937)  
Se han eliminado columnas del Excel para dejar solo las cifras de enero.

data[0].data[3][3][1]
3D array | 1 age, 2 year, 3 genre (0 = total, 1 = male, 2 = female)

---

#### 2. PobProvPais

**Filtro primario:** provincia  
**Filtros secundarios:** edad, país de nacimiento, género  

[Datos - 56948](https://www.ine.es/jaxiT3/Tabla.htm?t=56948&L=0)  
Se han eliminado columnas del Excel para dejar solo las cifras de enero.



---

#### 3. PobMuniPais

**Filtro primario:** municipios  
**Filtros secundarios:** género, país de nacimiento  

[Datos - 66322](https://www.ine.es/jaxiT3/Tabla.htm?t=66322&L=0)

---

#### 4. PobMuniEdad

**Filtro primario:** municipios  
**Filtros secundarios:** género, edad  

[Datos - 68535](https://www.ine.es/jaxiT3/Tabla.htm?t=68535&L=0)

---

## Páginas empleo

- [EmpPubPri](https://www.ine.es/jaxiT3/Tabla.htm?t=65321)  
  Página que a nivel nacional muestra cuántas personas trabajan en el sector privado y cuántas cobran del gobierno (sector público, IMV, paro, pensiones).

- [EmpProvSector](https://www.ine.es/jaxiT3/Tabla.htm?t=65354)  
  Página que muestra las personas que trabajan por provincia y por sector (agricultura, servicios, etc).

---

## Bugs encontrados

- El dual range slider funciona mal si se introduce manualmente un número menor que el límite inferior actual.
- En el dual range slider para el rango de edad, falla si se introduce un número que no coincide exactamente con un límite de rango.
- Mientras se está cargando una tabla, se muestra el mensaje "no hay datos disponibles" en lugar de "cargando datos".

---

## Mejoras

- En el header de población, añadir un botón para **resetear** los filtros (volver a los valores por defecto).
- En el header de población, añadir un botón para indicar **de dónde proviene la información** (por ejemplo, un modal).
- En el **muni screener**, al lado del nombre del municipio de cada resultado, añadir dos enlaces:
  - Uno que lo abra en la página de edades.
  - Otro en la página de municipios por país de origen.
- Se ha aplicado un **límite máximo de resultados** en el screener de municipios, pero aún no hay ninguna indicación visual que informe al usuario.

---

## UI

- En "EmpProvSector", hacer coincidir los **colores de los sectores en la tabla** con los **colores de los sectores en el gráfico**.
