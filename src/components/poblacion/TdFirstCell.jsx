// TdFirstCell.jsx
const TdFirstCell = ({ children, onClick, cursorPointer }) => {
  return (
    <td className={cursorPointer ? 'mouse-cursor-pointer' : ''} onClick={onClick}>
      {children}
    </td>
  )
}

export default TdFirstCell
