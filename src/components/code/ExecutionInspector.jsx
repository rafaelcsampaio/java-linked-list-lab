import {
    ChevronLeft,
    ChevronRight,
    CircleCheck,
    CircleX,
    Variable
} from "lucide-react";

import "./ExecutionInspector.css";

function ExecutionInspector({
    explanation,
    variables = {},
    condition = null,
    frameIndex = 0,
    frameCount = 1,
    onPrevious,
    onNext
}) {
    return (
        <div className="executionInspector">
            <div className="executionExplanation">
                <p>
                    {explanation}
                </p>

                {condition !== null && (
                    <div
                        className={`conditionResult ${
                            condition
                                ? "true"
                                : "false"
                        }`}
                    >
                        {condition ? (
                            <CircleCheck size={17} />
                        ) : (
                            <CircleX size={17} />
                        )}

                        condição = {condition ? "true" : "false"}
                    </div>
                )}
            </div>

            {Object.keys(variables).length > 0 && (
                <div className="variablePanel">
                    <div className="variablePanelTitle">
                        <Variable size={17} />

                        Variáveis neste momento
                    </div>

                    <div className="variableGrid">
                        {Object.entries(variables).map(
                            ([name, value]) => (
                                <div
                                    className="variableItem"
                                    key={name}
                                >
                                    <span>
                                        {name}
                                    </span>

                                    <strong>
                                        {value}
                                    </strong>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}

            {frameCount > 1 && (
                <div className="iterationNavigation">
                    <button
                        onClick={onPrevious}
                        disabled={frameIndex === 0}
                    >
                        <ChevronLeft size={17} />

                        Anterior
                    </button>

                    <span>
                        Execução {frameIndex + 1} de {frameCount}
                    </span>

                    <button
                        onClick={onNext}
                        disabled={frameIndex === frameCount - 1}
                    >
                        Próxima

                        <ChevronRight size={17} />
                    </button>
                </div>
            )}
        </div>
    );
}

export default ExecutionInspector;