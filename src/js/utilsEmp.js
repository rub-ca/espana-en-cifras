export function getRowClassByTypeOfWork(row) {
    const gen = row[0]
    if (gen.toLowerCase().includes('privado')) {
        return "row-emp-privado"
    }
    return "row-emp-publico"
}

export function getRowClassBySectorJob(row) {
    const splited = row[0].split('/')
    const str = splited[splited.length - 1].trim().toLowerCase()

    if (str.includes('agricultura')) {
        return "row-emp-sector-agricultura"
    } else if (str.includes('industria')) {
        return "row-emp-sector-industria"
    } else if (str.includes('construcción')) {
        return "row-emp-sector-construccion"
    } else if (str.includes('servicios')) {
        return "row-emp-sector-servicios"
    }
    return "row-emp-sector-total"
}

const comunidades19 = [
    "Total Nacional", "01 Andalucía", "02 Aragón", "03 Asturias, Principado de",
    "04 Balears, Illes", "05 Canarias", "06 Cantabria", "07 Castilla y León",
    "08 Castilla - La Mancha", "09 Cataluña", "10 Comunitat Valenciana", "11 Extremadura",
    "12 Galicia", "13 Madrid, Comunidad de", "14 Murcia, Región de",
    "15 Navarra, Comunidad Foral de", "16 País Vasco", "17 Rioja, La", "18 Ceuta", "19 Melilla"]

export function getIndexComunidad19WithInclude(str) {
    return comunidades19.findIndex(c => c.toLowerCase() === (str.toLowerCase()))
}

export function getRowClassByTypeOrSuma(row, rowIndex, rows) {
    const splited = row[0]
    const str = splited.trim().toLowerCase()

    if (str.includes('suma')) {
        return "row-emp-type-suma"
    }

    return ""
}