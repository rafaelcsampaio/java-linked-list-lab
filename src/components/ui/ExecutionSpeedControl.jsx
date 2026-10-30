import { useId } from "react";
import { Gauge } from "lucide-react";
import { executionSpeeds } from "../../hooks/useExecutionSpeed";

import "./ExecutionSpeedControl.css";

const speedLabels = [
    "Muito lenta",
    "Lenta",
    "Normal",
    "Rápida",
    "Muito rápida"
];

function ExecutionSpeedControl({ speed, onChange }) {
    const id = useId();
    const speedIndex = Math.max(0, executionSpeeds.indexOf(speed));

    return (
        <div className="executionSpeedControl">
            <div className="executionSpeedHeading">
                <Gauge size={17} aria-hidden="true" />

                <label htmlFor={id}>
                    Velocidade
                </label>

                <output htmlFor={id}>
                    {speed.toLocaleString("pt-BR")}×
                </output>
            </div>

            <input
                id={id}
                className="executionSpeedSlider"
                type="range"
                min={0}
                max={executionSpeeds.length - 1}
                step={1}
                value={speedIndex}
                onChange={(event) => {
                    onChange(executionSpeeds[Number(event.target.value)]);
                }}
                aria-valuetext={speedLabels[speedIndex]}
            />

            <div className="executionSpeedScale" aria-hidden="true">
                <span>Mais lenta</span>
                <span>{speedLabels[speedIndex]}</span>
                <span>Mais rápida</span>
            </div>
        </div>
    );
}

export default ExecutionSpeedControl;
