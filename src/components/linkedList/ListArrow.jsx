import "./ListArrow.css";

function ListArrow() {
    return (
        <div className="listArrow">
            <svg
                viewBox="0 0 110 24"
                aria-hidden="true"
            >
                <line
                    x1="10"
                    y1="12"
                    x2="87"
                    y2="12"
                    className="arrowPath"
                />

                <polygon
                    points="84,5 98,12 84,19"
                    className="arrowTip"
                />
            </svg>
        </div>
    );
}

export default ListArrow;