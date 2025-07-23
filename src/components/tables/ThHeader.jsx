const ThHeader = ({ children, onClick, cursorPointer }) => {
    return (
        <th className={cursorPointer ? 'pob-cabecera-tabla mouse-cursor-pointer' : 'pob-cabecera-tabla'} onClick={onClick}>
            {children}
        </th>
    )
}

export default ThHeader

