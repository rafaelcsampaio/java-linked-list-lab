import "./ListTypeSwitch.css";

function ListTypeSwitch({
    value,
    onChange
}) {
    return (
        <div className="listTypeSwitch">
            <button
                className={value === "simple" ? "selected" : ""}
                onClick={() => onChange("simple")}
            >
                <span>→</span>

                Lista simples
            </button>

            <button
                className={value === "double" ? "selected" : ""}
                onClick={() => onChange("double")}
            >
                <span>⇄</span>

                Lista dupla
            </button>
        </div>
    );
}

export default ListTypeSwitch;