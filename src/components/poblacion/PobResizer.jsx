import React, { useEffect, useState } from "react"
import "./PobResizer.css"

const PobResizer = () => {
    const [isDragging, setIsDragging] = useState(false)

    useEffect(() => {
        const container = document.querySelector(".page-data-container")

        const leftPanel = document.querySelector(".page-data-container__left-side")
        const rightPanel = document.querySelector(".page-data-container__right-side")
        const resizer = document.querySelector(".pob-resizer")

        if (!container || !leftPanel || !rightPanel || !resizer) return

        const onMouseDown = () => {
            setIsDragging(true)
            document.body.style.cursor = "e-resize"
            document.body.style.userSelect = "none"
        }

        const onMouseUp = () => {
            setIsDragging(false)
            document.body.style.cursor = "default"
            document.body.style.userSelect = "auto"
        }

        const onMouseMove = (e) => {
            if (!isDragging) return

            const containerRect = container.getBoundingClientRect()
            const containerWidth = containerRect.width

            const minRightPercent = 55 // 45%
            const maxRightPercent = 100 // 100%

            // Calcular ancho derecho en píxeles basado en la posición del mouse
            const rightWidthPx = containerRect.right - e.clientX

            // Convertir a porcentaje respecto al ancho del container
            let rightWidthPercent = (rightWidthPx / containerWidth) * 100

            if (rightWidthPercent < minRightPercent) rightWidthPercent = minRightPercent
            if (rightWidthPercent > maxRightPercent) rightWidthPercent = maxRightPercent

            let leftWidthPercent = 100 - rightWidthPercent

            if (rightWidthPercent == 100) {
                leftPanel.style.display = 'none'
            } else {
                leftPanel.style.display = 'block'
            }

            // Aplicar los anchos en porcentaje
            leftPanel.style.width = `${leftWidthPercent}%`
            rightPanel.style.width = `${rightWidthPercent}%`
        }

        resizer.addEventListener("mousedown", onMouseDown)
        window.addEventListener("mouseup", onMouseUp)
        window.addEventListener("mousemove", onMouseMove)

        // Cleanup al desmontar el componente
        return () => {
            resizer.removeEventListener("mousedown", onMouseDown)
            window.removeEventListener("mouseup", onMouseUp)
            window.removeEventListener("mousemove", onMouseMove)
        }
    }, [isDragging])

    return <div className="pob-resizer" />
}

export default PobResizer
