export async function loadDataJson(path, setter, setLoading) {
    const res = await fetch("https://data.xn--espaaencifras-lkb.es" + path)
    if (!res.ok) throw new Error("Error al cargar los datos")
    const json = await res.json()
    await setter(json)
    if (setLoading) setLoading(false)
}