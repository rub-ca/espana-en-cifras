export function getRowClassByTypeOfWork(row) {
    const gen = row[0]
    if (gen.toLowerCase().includes('privado')) {
        return "row-emp-privado"
    }
    return "row-emp-publico"
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