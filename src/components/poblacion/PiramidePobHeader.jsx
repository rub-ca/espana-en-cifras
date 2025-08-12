const PiramidePobHeader = ({ infoTitleArray }) => {
    const mainTitle = infoTitleArray[0]

    return (
        <div className="piramide-pob-header">
            <h2>{mainTitle}</h2>
            {infoTitleArray.slice(1).map((titulo, index) => (
                <h4 key={index}>{titulo}</h4>
            ))}
        </div>
    )
}

export default PiramidePobHeader
