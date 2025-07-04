import './ItemMuniScreener.css'

const ItemMuniScreener = ({ index, name, pobTotal, pobExtranj }) => {
    const classIndex = index % 2 === 0 ? 'screener-muni-result screener-muni-result-a' : 'screener-muni-result screener-muni-result-b'

    return (
        <div className={classIndex} key={index}>
            <div>{name}</div>
            <div>{pobTotal}</div>
            <div>{pobExtranj}</div>
        </div>
    )
}

export default ItemMuniScreener