import { useState } from "react";
import { motion } from "motion/react";
import {
    CircleAlert,
    CircleCheck,
    Info,
    Play,
    Plus,
    RotateCcw,
    Route,
    Search,
    Trash2,
    Undo2
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";
import LinkedListVisualizer from "../../components/linkedList/LinkedListVisualizer";
import ListTypeSwitch from "../../components/ui/ListTypeSwitch";

import "./Simulator.css";

const initialValues = [
    "Ana",
    "Bruno",
    "Carlos"
];

const operations = {
    insert: {
        title: "Inserir",
        icon: Plus,
        description:
            "Adicione um novo elemento. Informe uma posição ou deixe em branco para inserir no final."
    },

    remove: {
        title: "Remover",
        icon: Trash2,
        description:
            "Informe o valor que deve ser removido. A primeira ocorrência encontrada será retirada."
    },

    search: {
        title: "Buscar",
        icon: Search,
        description:
            "Percorra a lista até encontrar o valor informado."
    },

    traverse: {
        title: "Percorrer",
        icon: Route,
        description:
            "Visite todos os nós da lista começando em inicio e seguindo suas referências."
    }
};

function Simulator() {
    const [listType, setListType] =
        useState("simple");

    const [values, setValues] =
        useState([...initialValues]);

    const [operation, setOperation] =
        useState("insert");

    const [valueInput, setValueInput] =
        useState("");

    const [positionInput, setPositionInput] =
        useState("");

    const [history, setHistory] =
        useState([]);

    const [activeIndexes, setActiveIndexes] =
        useState([]);

    const [newIndex, setNewIndex] =
        useState(null);

    const [isTraversing, setIsTraversing] =
        useState(false);

    const [feedback, setFeedback] =
        useState({
            type: "info",
            message:
                "Escolha uma operação à esquerda para começar."
        });

    const [fieldErrors, setFieldErrors] =
        useState({
            value: false,
            position: false
        });

    const currentOperation =
        operations[operation];

    function showFeedback(
        message,
        type = "info",
        errors = {}
    ) {
        setFeedback({
            type,
            message
        });

        setFieldErrors({
            value:
                errors.value ?? false,
            position:
                errors.position ?? false
        });
    }

    function clearFieldError(field) {
        setFieldErrors((current) => ({
            ...current,
            [field]: false
        }));
    }

    function selectOperation(nextOperation) {
        if (isTraversing) {
            return;
        }

        setOperation(nextOperation);

        setActiveIndexes([]);
        setNewIndex(null);

        setValueInput("");
        setPositionInput("");

        setFieldErrors({
            value: false,
            position: false
        });

        showFeedback(
            operations[nextOperation].description,
            "info"
        );
    }

    function changeListType(type) {
        if (isTraversing) {
            return;
        }

        setListType(type);

        setActiveIndexes([]);
        setNewIndex(null);

        showFeedback(
            type === "simple"
                ? "Agora estamos visualizando uma lista simplesmente encadeada."
                : "Agora cada nó possui referências para o anterior e para o próximo.",
            "info"
        );
    }

    function saveChange(nextValues) {
        setHistory((currentHistory) => [
            ...currentHistory,
            [...values]
        ]);

        setValues(nextValues);
    }

    function insertValue() {
        const value =
            valueInput.trim();

        if (!value) {
            showFeedback(
                "Digite um valor antes de inserir.",
                "error",
                {
                    value: true
                }
            );

            return;
        }

        let position;

        if (positionInput === "") {
            position =
                values.length;
        } else {
            position =
                Number(positionInput);
        }

        if (
            !Number.isInteger(position) ||
            position < 0 ||
            position > values.length
        ) {
            showFeedback(
                `A posição deve estar entre 0 e ${values.length}.`,
                "error",
                {
                    position: true
                }
            );

            return;
        }

        const nextValues =
            [...values];

        nextValues.splice(
            position,
            0,
            value
        );

        saveChange(nextValues);

        setActiveIndexes([
            position
        ]);

        setNewIndex(position);

        if (position === values.length) {
            showFeedback(
                `"${value}" foi conectado ao final da lista.`,
                "success"
            );
        } else if (position === 0) {
            showFeedback(
                `"${value}" foi inserido no início. A referência inicio agora aponta para o novo nó.`,
                "success"
            );
        } else {
            showFeedback(
                `"${value}" foi inserido na posição ${position}. As referências dos nós vizinhos foram reorganizadas.`,
                "success"
            );
        }

        setValueInput("");
        setPositionInput("");
    }

    function removeValue() {
        const value =
            valueInput.trim();

        if (!value) {
            showFeedback(
                "Digite o valor que deseja remover.",
                "error",
                {
                    value: true
                }
            );

            return;
        }

        const index =
            values.findIndex(
                (item) =>
                    item.toLowerCase() ===
                    value.toLowerCase()
            );

        if (index === -1) {
            setActiveIndexes([]);
            setNewIndex(null);

            showFeedback(
                `"${value}" não foi encontrado na lista.`,
                "error",
                {
                    value: true
                }
            );

            return;
        }

        const removedValue =
            values[index];

        const nextValues =
            values.filter(
                (_, currentIndex) =>
                    currentIndex !== index
            );

        saveChange(nextValues);

        setNewIndex(null);

        const neighbors = [];

        if (index - 1 >= 0) {
            neighbors.push(
                index - 1
            );
        }

        if (
            index <
            nextValues.length
        ) {
            neighbors.push(index);
        }

        setActiveIndexes(
            neighbors
        );

        if (
            nextValues.length === 0
        ) {
            showFeedback(
                `"${removedValue}" era o único nó. A lista agora está vazia e inicio e fim são null.`,
                "success"
            );
        } else if (index === 0) {
            showFeedback(
                `"${removedValue}" foi removido do início. inicio agora aponta para o próximo nó.`,
                "success"
            );
        } else if (
            index === values.length - 1
        ) {
            showFeedback(
                `"${removedValue}" foi removido do final. fim foi atualizado para o novo último nó.`,
                "success"
            );
        } else {
            showFeedback(
                `"${removedValue}" foi removido. Os nós vizinhos foram reconectados.`,
                "success"
            );
        }

        setValueInput("");
    }

    function searchValue() {
        const value =
            valueInput.trim();

        if (!value) {
            showFeedback(
                "Digite o valor que deseja buscar.",
                "error",
                {
                    value: true
                }
            );

            return;
        }

        const index =
            values.findIndex(
                (item) =>
                    item.toLowerCase() ===
                    value.toLowerCase()
            );

        setNewIndex(null);

        if (index === -1) {
            setActiveIndexes([]);

            showFeedback(
                `Percorremos toda a lista e "${value}" não foi encontrado.`,
                "error",
                {
                    value: true
                }
            );

            return;
        }

        setActiveIndexes([
            index
        ]);

        showFeedback(
            `"${values[index]}" foi encontrado na posição ${index}.`,
            "success"
        );
    }

    async function traverseList() {
        if (
            values.length === 0
        ) {
            showFeedback(
                "A lista está vazia. Não existem nós para percorrer.",
                "error"
            );

            return;
        }

        setIsTraversing(true);
        setNewIndex(null);

        for (
            let index = 0;
            index < values.length;
            index++
        ) {
            setActiveIndexes([
                index
            ]);

            showFeedback(
                `Visitando "${values[index]}" na posição ${index}.`,
                "info"
            );

            await new Promise(
                (resolve) =>
                    setTimeout(
                        resolve,
                        700
                    )
            );
        }

        setActiveIndexes(
            values.map(
                (_, index) =>
                    index
            )
        );

        showFeedback(
            `Percurso concluído. Visitamos ${values.length} nó${
                values.length === 1
                    ? ""
                    : "s"
            } e chegamos a null.`,
            "success"
        );

        setIsTraversing(false);
    }

    async function executeOperation() {
        if (isTraversing) {
            return;
        }

        if (
            operation === "insert"
        ) {
            insertValue();

            return;
        }

        if (
            operation === "remove"
        ) {
            removeValue();

            return;
        }

        if (
            operation === "search"
        ) {
            searchValue();

            return;
        }

        await traverseList();
    }

    function undo() {
        if (isTraversing) {
            return;
        }

        if (
            history.length === 0
        ) {
            showFeedback(
                "Ainda não existe nenhuma alteração para desfazer.",
                "error"
            );

            return;
        }

        const previousValues =
            history[
                history.length - 1
            ];

        setValues(
            previousValues
        );

        setHistory(
            history.slice(
                0,
                history.length - 1
            )
        );

        setActiveIndexes([]);
        setNewIndex(null);

        showFeedback(
            "A última alteração foi desfeita.",
            "info"
        );
    }

    function reset() {
        if (isTraversing) {
            return;
        }

        setValues([
            ...initialValues
        ]);

        setHistory([]);

        setValueInput("");
        setPositionInput("");

        setActiveIndexes([]);
        setNewIndex(null);

        setFieldErrors({
            value: false,
            position: false
        });

        showFeedback(
            "A lista voltou ao estado inicial.",
            "info"
        );
    }

    return (
        <main className="simulatorPage">
            <div className="pageTop">
                <BackButton />
            </div>

            <header className="simulatorHeader">
                <span className="simulatorBadge">
                    🧩 Visualizar
                </span>

                <h1>
                    Laboratório de listas
                </h1>

                <p>
                    Modifique a estrutura e acompanhe
                    visualmente como seus nós e referências
                    se comportam.
                </p>

                <ListTypeSwitch
                    value={listType}
                    onChange={changeListType}
                />
            </header>

            <section className="simulatorWorkspace">
                <aside className="operationPanel">
                    <span className="panelLabel">
                        Operação
                    </span>

                    <div className="operationButtons">
                        {Object.entries(
                            operations
                        ).map(
                            ([
                                key,
                                item
                            ]) => {
                                const Icon =
                                    item.icon;

                                return (
                                    <button
                                        key={key}
                                        className={
                                            operation === key
                                                ? "selected"
                                                : ""
                                        }
                                        onClick={() =>
                                            selectOperation(
                                                key
                                            )
                                        }
                                        disabled={
                                            isTraversing
                                        }
                                    >
                                        <Icon
                                            size={17}
                                            strokeWidth={2.2}
                                        />

                                        {
                                            item.title
                                        }
                                    </button>
                                );
                            }
                        )}
                    </div>

                    <div className="operationDescription">
                        <strong>
                            {
                                currentOperation.title
                            }
                        </strong>

                        <p>
                            {
                                currentOperation.description
                            }
                        </p>
                    </div>

                    {operation !==
                        "traverse" && (
                        <label>
                            Valor

                            <input
                                className={
                                    fieldErrors.value
                                        ? "inputError"
                                        : ""
                                }
                                type="text"
                                value={
                                    valueInput
                                }
                                onChange={(
                                    event
                                ) => {
                                    setValueInput(
                                        event.target.value
                                    );

                                    clearFieldError(
                                        "value"
                                    );
                                }}
                                placeholder={
                                    operation ===
                                    "insert"
                                        ? "Ex.: Daniela"
                                        : "Ex.: Bruno"
                                }
                                disabled={
                                    isTraversing
                                }
                            />

                            {fieldErrors.value && (
                                <span className="fieldErrorMessage">
                                    <CircleAlert
                                        size={13}
                                    />

                                    Verifique este campo.
                                </span>
                            )}
                        </label>
                    )}

                    {operation ===
                        "insert" && (
                        <label>
                            Posição

                            <small>
                                Opcional — vazio
                                insere no final
                            </small>

                            <input
                                className={
                                    fieldErrors.position
                                        ? "inputError"
                                        : ""
                                }
                                type="number"
                                min="0"
                                max={
                                    values.length
                                }
                                value={
                                    positionInput
                                }
                                onChange={(
                                    event
                                ) => {
                                    setPositionInput(
                                        event.target.value
                                    );

                                    clearFieldError(
                                        "position"
                                    );
                                }}
                                placeholder={`0 a ${values.length}`}
                                disabled={
                                    isTraversing
                                }
                            />

                            {fieldErrors.position && (
                                <span className="fieldErrorMessage">
                                    <CircleAlert
                                        size={13}
                                    />

                                    Use uma posição
                                    entre 0 e{" "}
                                    {
                                        values.length
                                    }.
                                </span>
                            )}
                        </label>
                    )}

                    <button
                        className="executeButton"
                        onClick={
                            executeOperation
                        }
                        disabled={
                            isTraversing
                        }
                    >
                        <Play
                            size={18}
                            fill="currentColor"
                        />

                        {isTraversing
                            ? "Percorrendo..."
                            : "Executar operação"}
                    </button>

                    <div className="historyActions">
                        <button
                            onClick={undo}
                            disabled={
                                history.length ===
                                    0 ||
                                isTraversing
                            }
                        >
                            <Undo2
                                size={18}
                                strokeWidth={2.2}
                            />

                            Desfazer
                        </button>

                        <button
                            onClick={reset}
                            disabled={
                                isTraversing
                            }
                        >
                            <RotateCcw
                                size={18}
                                strokeWidth={2.2}
                            />

                            Reiniciar
                        </button>
                    </div>
                </aside>

                <div className="simulatorMain">
                    <motion.aside
                        key={`${feedback.type}-${feedback.message}`}
                        className={`simulatorFeedback ${feedback.type}`}
                        initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.99
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1
                        }}
                    >
                        <div className="feedbackIcon">
                            {feedback.type ===
                                "error" && (
                                <CircleAlert
                                    size={21}
                                    strokeWidth={2.2}
                                />
                            )}

                            {feedback.type ===
                                "success" && (
                                <CircleCheck
                                    size={21}
                                    strokeWidth={2.2}
                                />
                            )}

                            {feedback.type ===
                                "info" && (
                                <Info
                                    size={21}
                                    strokeWidth={2.2}
                                />
                            )}
                        </div>

                        <div>
                            <strong>
                                {feedback.type ===
                                "error"
                                    ? "Verifique os dados"
                                    : feedback.type ===
                                        "success"
                                      ? "Operação concluída"
                                      : "O que está acontecendo?"}
                            </strong>

                            <p>
                                {
                                    feedback.message
                                }
                            </p>
                        </div>
                    </motion.aside>

                    <section className="visualizerCard">
                        <div className="visualizerHeader">
                            <div>
                                <span>
                                    Visualização
                                </span>

                                <strong>
                                    {listType ===
                                    "simple"
                                        ? "Lista simplesmente encadeada"
                                        : "Lista duplamente encadeada"}
                                </strong>
                            </div>

                            <span className="nodeCounter">
                                {values.length}{" "}
                                nó
                                {values.length ===
                                1
                                    ? ""
                                    : "s"}
                            </span>
                        </div>

                        <LinkedListVisualizer
                            values={
                                values
                            }
                            listType={
                                listType
                            }
                            activeIndexes={
                                activeIndexes
                            }
                            newIndex={
                                newIndex
                            }
                        />
                    </section>
                </div>
            </section>
        </main>
    );
}

export default Simulator;