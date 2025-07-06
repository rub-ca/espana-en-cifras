import './ItemMuniScreener.css'

const ItemMuniScreener = ({ index, name, pobTotal, pobExtranj, porcentajeEdad }) => {
    let classIndex = 'screener-muni-result'

    if (index === 0) classIndex += ' screener-muni-result-header'
    else if (index % 2 === 0) classIndex += ' screener-muni-result-a'
    else classIndex += ' screener-muni-result-b'

    return (
        <div className={classIndex} key={index}>
            <div>{name}</div>
            <div>{pobTotal}</div>
            {porcentajeEdad !== null && porcentajeEdad !== undefined && <div>{porcentajeEdad}</div>}
            {pobExtranj !== null && pobExtranj !== undefined && <div>{pobExtranj}</div>}
        </div>
    )
}

export default ItemMuniScreener