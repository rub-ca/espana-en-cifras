import { useEffect } from "react"

/**
 * Detecta clics fuera del elemento referenciado y ejecuta la callback.
 *
 * @param {React.RefObject} ref - Referencia al DOM externo.
 * @param {Function} callback - Función a ejecutar al hacer clic fuera.
 */
export const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, callback])
}
