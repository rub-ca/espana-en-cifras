const PiramidePobHeader = ({ infoTitleArray }) => {
    return (
        <div className="piramide-pob-header">
            {infoTitleArray.map((titulo, index) => (
                <h5 key={index}>{titulo}</h5>
            ))}
        </div>
    )
}

export default PiramidePobHeader
