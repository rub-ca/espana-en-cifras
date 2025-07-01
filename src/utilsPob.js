export function getYear(y) {
    if (y == "Edad / Género") return 0
    if (y == "Edad / Pais origen / Género") return 0
    return 2024 - y
}
export function getYearInverse(y) {
    return Math.abs(y - 2024)
}

export function addDotsToNumbers(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

export const ageGroups90 = ['total', '00-04', '05-09', '10-14', '15-19', '20-24', '25-29',
    '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74',
    '75-79', '80-84', '85-89', '++ 90']
export const ageGroups100 = ['total', '00-04', '05-09', '10-14', '15-19', '20-24', '25-29',
    '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74',
    '75-79', '80-84', '85-89', '90-94', '95-99', '++100']
export function getAgeGroup90(g) {
    return ageGroups90[g] || null
}
export function getAgeGroup100(g) {
    return ageGroups100[g] || null
}

export const genreList = ['Total', 'Hombres', 'Mujeres']
export function getGenre(g) {
    return genreList[g] || null
}
export function getGenreInverse(genre) {
    return genreList.indexOf(genre)
}

export function getRowClassByGenre(row) {
    const gen = row[0]
    if (gen.includes('Hombres')) {
        return "row-genre-hombre"
    } else if (gen.includes('Mujeres')) {
        return "row-genre-mujer"
    } else {
        return "row-genre-total"
    }
}

export const paises13 = ['total', 'España', 'UE27 2020 sin España', 'UE28 sin España',
    'Europa menos UE27 2020', 'Europa menos UE28', 'África', 'América del norte',
    'Centro América y Caribe', 'Sudamérica', 'Asia', 'Oceanía', 'Extranjera']
export function getPais13(r) {
    return paises13[r] || null
}
export function getPais13Inverse(pais) {
    return paises13.indexOf(pais)
}
export function getPais13InverseInclude(pais) {
    const splitted = pais.split("/")[1]?.trim()
    return paises13.indexOf(splitted)
}

export const paises59 = ["Total", "Bélgica", "Bulgaria", "Dinamarca", "España", "Finlandia",
    "Francia", "Irlanda", "Italia", "Noruega", "Países Bajos", "Polonia", "Portugal",
    "Reino Unido", "Alemania", "Rumanía", "Suecia", "Suiza", "Ucrania", "Moldavia",
    "Lituania", "Rusia", "Otros países de Europa", "Argelia", "Gambia", "Ghana", "Guinea",
    "Guinea Ecuatorial", "Mali", "Marruecos", "Mauritania", "Nigeria", "Senegal",
    "Otros países de África", "Canadá", "Estados Unidos de América", "México", "Cuba",
    "Honduras", "Nicaragua", "República Dominicana", "Argentina", "Bolivia", "Brasil",
    "Colombia", "Chile", "Ecuador", "Paraguay", "Perú", "Uruguay", "Venezuela",
    "Otros países de América", "Bangladesh", "China", "Filipinas", "India",
    "Pakistán", "Otros países de Asia", "Oceanía"]
export function getPais59(r) {
    return paises59[r] || null
}
export function getPais59Inverse(pais) {
    return paises59.indexOf(pais)
}

export function getIndexPrimarySelected(data, p) {
    return data.findIndex(item => item.name.trim() === p)
}