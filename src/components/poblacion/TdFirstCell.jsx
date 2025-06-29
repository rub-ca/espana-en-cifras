// TdFirstCell.jsx
const TdFirstCell = ({ children, onClick, cursorPointer }) => {
  return (
    <td className={cursorPointer ? 'mouse-cursor-pointer pob-align-center' : 'pob-align-center'} onClick={onClick}>
      {children}
    </td>
  )
}

export default TdFirstCell
