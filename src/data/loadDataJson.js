import { openDB } from 'idb'

// Abrir o crear la base de datos
const dbPromise = openDB('espanaencifras-es-db', 2, {
    upgrade(db) {
        db.createObjectStore('json-files-2024')
    },
})

export async function loadDataJson(path, setter, setLoading) {
    if (setLoading) setLoading(true)

    const db = await dbPromise

    // Intentar obtener datos de IndexedDB
    let json = await db.get('json-files-2024', path)

    if (!json) {
        // Si no está en DB, hacer fetch
        const res = await fetch("https://data.xn--espaaencifras-lkb.es" + path)
        if (!res.ok) {
            if (setLoading) setLoading(false)
            throw new Error("Error al cargar los datos")
        }
        json = await res.json()

        // Guardar en IndexedDB
        await db.put('json-files-2024', json, path)
    }

    // Setear los datos en React
    await setter(json)

    if (setLoading) setLoading(false)
}


    // const loadZipFromPublic = async () => {
    //     try {
    //         console.log('Cargando ZIP desde public/')
    //         const response = await fetch('/your.zip') // archivo dentro de public/
    //         if (!response.ok) throw new Error('Error al cargar el archivo ZIP')

    //         console.log('Archivo ZIP cargado correctamente')
    //         const blob = await response.blob()

    //         const zip = await JSZip.loadAsync(blob)
    //         console.log('ZIP cargado:', zip)


    //         for (const filename of Object.keys(zip.files)) {
    //             if (filename.endsWith('.json')) {
    //                 const fileContent = await zip.files[filename].async('string')
    //                 const jsonData = JSON.parse(fileContent)
    //                 console.log(`Contenido de ${filename}:`, jsonData)
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error al leer el ZIP:', error)
    //     }
    // }

    // loadZipFromPublic()