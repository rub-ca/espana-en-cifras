const ItemMuniScreener = ({ index, name, pobTotal, pobExtranj, porcentajeEdad, maxLengthPoblacionTotal }) => {
    let classIndex = 'screener-muni-result'

    if (index === 0) classIndex += ' screener-muni-result-header'
    else if (index % 2 === 0) classIndex += ' screener-muni-result-a'
    else classIndex += ' screener-muni-result-b'

    return (
        <div className={classIndex} key={index}>
            <div>{name}</div>

            <div>{String(pobTotal).padStart(maxLengthPoblacionTotal, "\u00A0")}</div>

            {porcentajeEdad !== null && porcentajeEdad !== undefined &&
                <div>{porcentajeEdad.length == 6 ? porcentajeEdad : '\u00A0' + porcentajeEdad}</div>}

            {pobExtranj !== null && pobExtranj !== undefined &&
                <div>{pobExtranj.length == 6 ? pobExtranj : '\u00A0' + pobExtranj}</div>}
        </div>
    )
}

export default ItemMuniScreener
