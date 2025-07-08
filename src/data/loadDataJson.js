import { openDB } from 'idb'

// Abrir o crear la base de datos
const dbPromise = openDB('espanaencifras-es-db', 1, {
    upgrade(db) {
        db.createObjectStore('json-files')
    },
})

export async function loadDataJson(path, setter, setLoading) {
    if (setLoading) setLoading(true)

    const db = await dbPromise

    // Intentar obtener datos de IndexedDB
    let json = await db.get('json-files', path)

    if (!json) {
        // Si no está en DB, hacer fetch
        const res = await fetch("https://data.xn--espaaencifras-lkb.es" + path)
        if (!res.ok) {
            if (setLoading) setLoading(false)
            throw new Error("Error al cargar los datos")
        }
        json = await res.json()

        // Guardar en IndexedDB
        await db.put('json-files', json, path)
    }

    // Setear los datos en React
    await setter(json)

    if (setLoading) setLoading(false)
}
