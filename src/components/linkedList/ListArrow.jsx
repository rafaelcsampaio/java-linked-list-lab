import "./ListArrow.css";

function ListArrow({ direction = "right" }) {
    const isVertical = direction === "down";

    return (
        <div className={`listArrow ${isVertical ? "listArrow--vertical" : ""}`}>
            <svg
                viewBox={isVertical ? "0 0 24 44" : "0 0 110 24"}
                aria-hidden="true"
            >
                {isVertical ? (
                    <>
                        <line x1="12" y1="2" x2="12" y2="30" className="arrowPath" />
                        <polygon points="5,28 12,42 19,28" className="arrowTip" />
                    </>
                ) : (
                    <>
                        <line
                            x1={direction === "left" ? "100" : direction === "both" ? "16" : "10"}
                            y1="12"
                            x2={direction === "left" ? "23" : direction === "both" ? "94" : "87"}
                            y2="12"
                            className="arrowPath"
                        />

                        {(direction === "left" || direction === "both") && (
                            <polygon points="26,5 12,12 26,19" className="arrowTip" />
                        )}

                        {(direction === "right" || direction === "both") && (
                            <polygon points="84,5 98,12 84,19" className="arrowTip" />
                        )}
                    </>
                )}
            </svg>
        </div>
    );
}

export default ListArrow;
