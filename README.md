## Páginas población

#### 1. PobEdadPais /pob-pais

**Filtro primario:** país de nacimiento  
**Filtros secundarios:** edad, género  

[Datos - 56937](https://www.ine.es/jaxiT3/Tabla.htm?t=56937)  
Se han eliminado columnas del Excel para dejar solo las cifras de enero.

`data[0].data[3][3][1]`
<br>
`[country].[age][year][genre] (0 = total, 1 = male, 2 = female)`

---

#### 2. PobProvPais /pob-prov-pais

**Filtro primario:** provincia  
**Filtros secundarios:** edad, país de nacimiento, género  

[Datos - 56948](https://www.ine.es/jaxiT3/Tabla.htm?t=56948&L=0)  
Se han eliminado columnas del Excel para dejar solo las cifras de enero.

`data[0].data[3][1][5][2]`
<br>
`[province].[age][region][year][genre]`

---

#### 3. PobMuniPais /pob-muni-pais

**Filtro primario:** municipios  
**Filtros secundarios:** género, país de nacimiento  

[Datos - 66322](https://www.ine.es/jaxiT3/Tabla.htm?t=66322&L=0)

`data[0].data[1][2][3]`
<br>
`[muni].[genre][region][year]`

---

#### 4. PobMuniEdad /pob-muni-edad

**Filtro primario:** municipios  
**Filtros secundarios:** género, edad  

[Datos - 68535](https://www.ine.es/jaxiT3/Tabla.htm?t=68535&L=0)

`data[0].data[1][2][3]`
<br>
`[muni].[genre][age][year]`


---

#### 5. MuniScreener /screener-muni

**Filtro primario:** cantidad de habitantes  
**Filtros secundario:** porcentaje de población en rango de edad  
**Filtros secundario:** porcentaje población extranjera  

Lo datos provienen de PobMuniPais y PobMuniEdad


## Páginas empleo

#### 1. EmpPubPri /emp-pub-pri 

[Datos - 65321](https://www.ine.es/jaxiT3/Tabla.htm?t=65321)  

`data[0].data[3][1]`
<br>
`[comunidad].[type][year] (type 0 = publico, type 1 = privado)`

---

#### 2. EmpProvSector emp-prov-sector

[Datos - 65354](https://www.ine.es/jaxiT3/Tabla.htm?t=65354)  

`data[0].data[3][1]`
<br>
`[province].[sector][year] (total, agricultura, industria, construcción, servicios)`


<br>
<br>

## Bugs encontrados

- El dual range slider funciona mal si se introduce manualmente un número menor que el límite inferior actual.
- En el dual range slider para el rango de edad, falla si se introduce un número que no coincide exactamente con un límite de rango.
- Cuando en empleo publico y privado muevo un poco el resizer, el margen superior se pierde


## Mejoras

- En el header de población, añadir un botón para indicar **de dónde proviene la información** (por ejemplo, un modal).
- En el **muni screener**, al lado del nombre del municipio de cada resultado, añadir dos enlaces:
  - Uno que lo abra en la página de edades.
  - Otro en la página de municipios por país de origen.
- En el **muni screener**, añadir un nuevo campo de búsqueda que sea nombre.
- Se ha aplicado un **límite máximo de resultados** en el screener de municipios, pero aún no hay ninguna indicación visual que informe al usuario.
- Poner en algún sitio funcionamiento, por ejemplo (m) son miles


## UI

- En muni screener permitir activar un filtro pulsando en su barra pero no desactivarlo

- En muni screener permitir ordenar los resultados