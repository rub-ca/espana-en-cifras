export function sendFirstAnalytics(sessionId) {
    const obj = {
        session: sessionId,
        user: getOrCreateAnalyticsId(),
        url: window.location.href,
        dimensions: getDeviceDimensions()
    }

    fetch("https://data.xn--espaaencifras-lkb.es/analytics/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
    }).catch(err => {
        console.error("Error enviando analytics:", err)
    })
}


function getOrCreateAnalyticsId() {
    const cookieName = "analytics_user_id"

    // Buscar cookie existente
    const cookies = document.cookie.split(";").map(c => c.trim())
    const existing = cookies.find(c => c.startsWith(cookieName + "="))

    if (existing) {
        // Si existe, devolver el valor
        return existing.split("=")[1]
    }

    // Si no existe, generar un UUID
    const newId = crypto.randomUUID()

    // Guardar cookie (aquí con duración de 1 año)
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)

    document.cookie = `${cookieName}=${newId}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`

    return newId
}

function getDeviceDimensions() {
    const vv = window.visualViewport

    return {
        viewport: {
            width: vv ? Math.round(vv.width) : window.innerWidth,
            height: vv ? Math.round(vv.height) : window.innerHeight
        },
        screen: {
            width: window.screen?.width ?? null,
            height: window.screen?.height ?? null,
            availWidth: window.screen?.availWidth ?? null,
            availHeight: window.screen?.availHeight ?? null
        },
        devicePixelRatio: window.devicePixelRatio || 1,
        orientation: (screen.orientation && screen.orientation.type) || (window.orientation ?? null),
        timestamp: Date.now()
    }
}