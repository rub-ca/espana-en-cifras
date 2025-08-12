const ThHeader = ({ children, onClick, cursorPointer }) => {
    return (
        <th className={cursorPointer ? 'mouse-cursor-pointer' : ' '} onClick={onClick}>
            {children}
        </th>
    )
}

export default ThHeader

