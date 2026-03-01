export function sendFirstAnalytics(sessionId) {
    const obj = {
        session: sessionId,
        user: getOrCreateAnalyticsId(),
        url: window.location.href,
        dimensions: getDeviceDimensions(),
        extra: JSON.stringify(getExtraInfo())
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

// Sends a page-view event (navigation or exit) for the current session.
// Uses sendBeacon when available so it fires even on tab close.
export function sendPageView(sessionId, pageData) {
    const payload = JSON.stringify({
        session: sessionId,
        extra: JSON.stringify(pageData)
    })

    const url = "https://data.xn--espaaencifras-lkb.es/analytics/pageviews"

    if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: "application/json" })
        navigator.sendBeacon(url, blob)
    } else {
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: payload
        }).catch(err => {
            console.error("Error enviando pageview analytics:", err)
        })
    }
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

// Returns contextual info about the browser/environment as a plain object.
// Stored as a JSON string in the `extra` field of the analytics payload.
function getExtraInfo() {
    return {
        language: navigator.language || null,
        languages: navigator.languages ? Array.from(navigator.languages) : null,
        timezone: Intl?.DateTimeFormat().resolvedOptions().timeZone ?? null,
        referrer: document.referrer || null,
        cookiesEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack ?? null,
        connection: getConnectionInfo(),
        performance: getPerformanceInfo(),
    }
}

function getConnectionInfo() {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (!conn) return null
    return {
        type: conn.type ?? null,
        effectiveType: conn.effectiveType ?? null,
        downlink: conn.downlink ?? null,
        rtt: conn.rtt ?? null,
        saveData: conn.saveData ?? false,
    }
}

function getPerformanceInfo() {
    if (!window.performance) return null
    const nav = performance.getEntriesByType?.("navigation")?.[0]
    if (!nav) return null
    return {
        // Time from navigation start until the page was fully loaded
        loadMs: nav.loadEventEnd > 0 ? Math.round(nav.loadEventEnd - nav.startTime) : null,
        // Time until DOMContentLoaded fired
        domContentLoadedMs: nav.domContentLoadedEventEnd > 0
            ? Math.round(nav.domContentLoadedEventEnd - nav.startTime)
            : null,
        // "navigate" | "reload" | "back_forward" | "prerender"
        type: nav.type ?? null,
    }
}