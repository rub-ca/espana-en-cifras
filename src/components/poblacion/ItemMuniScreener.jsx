import './ItemMuniScreener.css'
import { addDots } from '../../js/utilsPob.js'

const ItemMuniScreener = ({ index, name, pobTotal, pobExtranj }) => {
    let classIndex = 'screener-muni-result'

    if (index === -1) classIndex += ' screener-muni-result-header'
    else if (index % 2 === 0) classIndex += ' screener-muni-result-a'
    else classIndex += ' screener-muni-result-b'

    return (
        <div className={classIndex} key={index}>
            <div>{name}</div>
            <div>{addDots(pobTotal)}</div>
            <div>{pobExtranj}</div>
        </div>
    )
}

export default ItemMuniScreener