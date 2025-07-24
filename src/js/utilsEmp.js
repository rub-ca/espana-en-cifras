export function getRowClassByTypeOfWork(row) {
    const gen = row[0]
    if (gen.toLowerCase().includes('privado')) {
        return "row-emp-privado"
    } 
    return "row-emp-publico"
}