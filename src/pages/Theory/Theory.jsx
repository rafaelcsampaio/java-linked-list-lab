import { useState } from "react";
import { motion } from "motion/react";
import {
    ArrowLeft,
    ArrowLeftRight,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    CircleDot,
    Link2,
    ListChecks,
    Plus,
    Search,
    Trash2
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";
import ListTypeSwitch from "../../components/ui/ListTypeSwitch";

import "./Theory.css";

const theoryData = {
    simple: {
        title: "Lista simplesmente encadeada",

        description:
            "Cada nó armazena um elemento e uma referência para o próximo nó da sequência.",

        concepts: {
            inicio: {
                title: "inicio",
                description:
                    "Guarda a referência para o primeiro nó da lista. Se a lista estiver vazia, inicio é null."
            },

            fim: {
                title: "fim",
                description:
                    "Guarda a referência para o último nó da lista. Isso facilita operações feitas diretamente no final."
            },

            proximo: {
                title: "proximo",
                description:
                    "É a referência que liga um nó ao próximo. No último nó, proximo possui valor null."
            },

            null: {
                title: "null",
                description:
                    "Representa ausência de referência. No último nó, proximo é null."
            }
        },

        nodeCode: `class No {
    String elemento;
    No proximo;

    public No(String elemento) {
        this.elemento = elemento;
        this.proximo = null;
    }
}`,

        connectionExamples: {
            insert: {
                title: "Conectando um novo nó",
                description:
                    'Vamos adicionar "Carlos" ao final da lista.',
                complexity: "O(1)",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana → Bruno → null`,
                        explanation:
                            "inicio referencia Ana e fim referencia Bruno.",
                        state: "insertInitial"
                    },

                    {
                        label: "Criando o nó",
                        code: `No novoNo = new No("Carlos");`,
                        explanation:
                            "Carlos foi criado, mas ainda está fora da lista. Seu proximo é null.",
                        state: "insertCreated"
                    },

                    {
                        label: "Criando a ligação",
                        code: `fim.proximo = novoNo;`,
                        explanation:
                            "Bruno era o último nó. Agora seu proximo aponta para Carlos.",
                        state: "insertLinked"
                    },

                    {
                        label: "Atualizando fim",
                        code: `fim = novoNo;`,
                        explanation:
                            "A cadeia já está conectada. Agora fim passa a indicar Carlos.",
                        state: "insertFinished"
                    }
                ]
            },

            removeMiddle: {
                title: "Removendo um nó do meio",
                description:
                    'Vamos remover "Bruno" de Ana → Bruno → Carlos.',
                complexity: "O(n)",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana → Bruno → Carlos → null`,
                        explanation:
                            "Bruno está entre Ana e Carlos.",
                        state: "removeMiddleInitial"
                    },

                    {
                        label: "Localizando os nós",
                        code: `No anterior = inicio;
No atual = anterior.proximo;`,
                        explanation:
                            "anterior referencia Ana e atual referencia Bruno.",
                        state: "removeMiddleLocated"
                    },

                    {
                        label: "Desviando a referência",
                        code: `anterior.proximo = atual.proximo;`,
                        explanation:
                            "Ana deixa de apontar para Bruno e passa a apontar diretamente para Carlos.",
                        state: "removeMiddleBypassed"
                    },

                    {
                        label: "Resultado",
                        code: `// Ana → Carlos → null`,
                        explanation:
                            "Bruno ficou fora da cadeia. A lista agora passa diretamente de Ana para Carlos.",
                        state: "removeMiddleFinished"
                    }
                ]
            },

            removeEnd: {
                title: "Removendo o último nó",
                description:
                    'Vamos remover "Carlos", que atualmente é o nó referenciado por fim.',
                complexity: "O(n)",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana → Bruno → Carlos → null`,
                        explanation:
                            "fim aponta para Carlos, mas Carlos não sabe quem vem antes dele.",
                        state: "removeEndInitial"
                    },

                    {
                        label: "Procurando o penúltimo",
                        code: `No atual = inicio;

while (atual.proximo != fim) {
    atual = atual.proximo;
}`,
                        explanation:
                            "Como a lista simples não possui referência anterior, precisamos começar em inicio e procurar o nó imediatamente anterior a fim.",
                        state: "removeEndLocated"
                    },

                    {
                        label: "Cortando a ligação",
                        code: `atual.proximo = null;`,
                        explanation:
                            "Bruno deixa de apontar para Carlos. Carlos sai da cadeia, mas fim ainda precisa ser atualizado.",
                        state: "removeEndCut"
                    },

                    {
                        label: "Atualizando fim",
                        code: `fim = atual;`,
                        explanation:
                            "Bruno passa a ser oficialmente o último nó da lista.",
                        state: "removeEndFinished"
                    }
                ]
            }
        },

        operations: [
            {
                id: "insert",
                icon: Plus,
                title: "Adicionar",
                subtitle: "Inserção no final",
                complexity: "O(1) usando fim",

                steps: [
                    "Um novo nó é criado contendo o elemento.",
                    "Se a lista estiver vazia, inicio e fim recebem o novo nó.",
                    "Caso contrário, fim.proximo aponta para o novo nó.",
                    "fim passa a referenciar o novo último nó."
                ]
            },

            {
                id: "remove",
                icon: Trash2,
                title: "Remover",
                subtitle: "Remoção por valor",
                complexity: "O(n)",

                steps: [
                    "A lista é percorrida procurando o elemento.",
                    "Precisamos conhecer o nó atual e o anterior.",
                    "Se remover o primeiro, inicio precisa ser atualizado.",
                    "No meio, o anterior passa a apontar para atual.proximo.",
                    "Se remover o último, fim também precisa ser atualizado."
                ]
            },

            {
                id: "search",
                icon: Search,
                title: "Buscar",
                subtitle: "Pesquisa sequencial",
                complexity: "O(n)",

                steps: [
                    "A busca começa em inicio.",
                    "O elemento atual é comparado com o valor procurado.",
                    "Se não encontrar, seguimos atual.proximo.",
                    "Terminamos ao encontrar o elemento ou chegar a null."
                ]
            },

            {
                id: "traverse",
                icon: ListChecks,
                title: "Percorrer",
                subtitle: "Visitar todos os nós",
                complexity: "O(n)",

                steps: [
                    "atual recebe inicio.",
                    "Processamos o elemento atual.",
                    "atual recebe atual.proximo.",
                    "Repetimos enquanto atual for diferente de null."
                ]
            }
        ],

        traversalCode: `No atual = this.inicio;

while (atual != null) {
    System.out.println(atual.elemento);
    atual = atual.proximo;
}`,

        examNotes: [
            "inicio == null indica lista vazia.",
            "O último nó possui proximo == null.",
            "fim.proximo = novoNo altera a cadeia; fim = novoNo altera a referência fim.",
            "Remover um nó significa alterar referências para que a cadeia deixe de passar por ele.",
            "Na lista simples, remover do final exige encontrar o penúltimo nó.",
            "Ao remover o único elemento, inicio e fim precisam se tornar null."
        ]
    },

    double: {
        title: "Lista duplamente encadeada",

        description:
            "Cada nó possui duas referências: uma para o nó anterior e outra para o próximo.",

        concepts: {
            inicio: {
                title: "inicio",
                description:
                    "Referencia o primeiro nó. O anterior do primeiro nó é null."
            },

            fim: {
                title: "fim",
                description:
                    "Referencia o último nó e permite iniciar um percurso no sentido inverso."
            },

            anterior: {
                title: "anterior",
                description:
                    "Referencia o nó que vem antes do atual."
            },

            proximo: {
                title: "proximo",
                description:
                    "Referencia o nó que vem depois do atual."
            },

            null: {
                title: "null",
                description:
                    "No primeiro nó, anterior é null. No último nó, proximo é null."
            }
        },

        nodeCode: `class No {
    String elemento;
    No anterior;
    No proximo;

    public No(String elemento) {
        this.elemento = elemento;
        this.anterior = null;
        this.proximo = null;
    }
}`,

        connectionExamples: {
            insert: {
                title: "Conectando um novo nó",
                description:
                    'Vamos adicionar "Carlos" depois de Bruno.',
                complexity: "O(1)",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana ⇄ Bruno`,
                        explanation:
                            "Ana e Bruno já estão conectados nos dois sentidos.",
                        state: "insertInitial"
                    },

                    {
                        label: "Criando o nó",
                        code: `No novoNo = new No("Carlos");`,
                        explanation:
                            "Carlos nasce com anterior e proximo iguais a null.",
                        state: "insertCreated"
                    },

                    {
                        label: "Ligando os dois lados",
                        code: `fim.proximo = novoNo;
novoNo.anterior = fim;`,
                        explanation:
                            "Bruno aponta para Carlos e Carlos aponta de volta para Bruno.",
                        state: "insertLinked"
                    },

                    {
                        label: "Atualizando fim",
                        code: `fim = novoNo;`,
                        explanation:
                            "Carlos passa a ser o último nó.",
                        state: "insertFinished"
                    }
                ]
            },

            removeMiddle: {
                title: "Removendo um nó do meio",
                description:
                    'Vamos remover "Bruno" de Ana ⇄ Bruno ⇄ Carlos.',
                complexity: "O(n) para localizar",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana ⇄ Bruno ⇄ Carlos`,
                        explanation:
                            "Bruno possui Ana como anterior e Carlos como proximo.",
                        state: "removeMiddleInitial"
                    },

                    {
                        label: "Obtendo os vizinhos",
                        code: `No anterior = atual.anterior;
No proximo = atual.proximo;`,
                        explanation:
                            "Guardamos os dois vizinhos antes de modificar as ligações.",
                        state: "removeMiddleLocated"
                    },

                    {
                        label: "Reconectando os dois lados",
                        code: `anterior.proximo = proximo;
proximo.anterior = anterior;`,
                        explanation:
                            "Ana aponta para Carlos e Carlos aponta de volta para Ana.",
                        state: "removeMiddleBypassed"
                    },

                    {
                        label: "Resultado",
                        code: `// Ana ⇄ Carlos`,
                        explanation:
                            "Bruno ficou fora da cadeia e as duas direções continuam consistentes.",
                        state: "removeMiddleFinished"
                    }
                ]
            },

            removeEnd: {
                title: "Removendo o último nó",
                description:
                    'Vamos remover "Carlos". Na lista dupla, fim consegue acessar diretamente o nó anterior.',
                complexity: "O(1)",

                steps: [
                    {
                        label: "Estado inicial",
                        code: `// Ana ⇄ Bruno ⇄ Carlos
//                 ↑
//                fim`,
                        explanation:
                            "Carlos é o último nó e possui uma referência anterior apontando para Bruno.",
                        state: "removeEndInitial"
                    },

                    {
                        label: "Acessando o anterior",
                        code: `No anterior = fim.anterior;`,
                        explanation:
                            "Não precisamos percorrer a lista. Carlos já sabe que Bruno é seu anterior.",
                        state: "removeEndLocated"
                    },

                    {
                        label: "Atualizando fim",
                        code: `fim = anterior;`,
                        explanation:
                            "Bruno passa a ser o nó referenciado por fim.",
                        state: "removeEndCut"
                    },

                    {
                        label: "Encerrando a lista",
                        code: `fim.proximo = null;`,
                        explanation:
                            "Removemos a ligação de Bruno para Carlos. Bruno agora é o último nó.",
                        state: "removeEndFinished"
                    }
                ]
            }
        },

        operations: [
            {
                id: "insertStart",
                icon: Plus,
                title: "Inserir início",
                subtitle: "Novo primeiro nó",
                complexity: "O(1)",

                steps: [
                    "Criamos o novo nó.",
                    "novoNo.proximo aponta para o antigo inicio.",
                    "O antigo inicio aponta de volta usando anterior.",
                    "inicio passa a apontar para o novo nó."
                ]
            },

            {
                id: "insertEnd",
                icon: Plus,
                title: "Inserir fim",
                subtitle: "Novo último nó",
                complexity: "O(1)",

                steps: [
                    "Criamos o novo nó.",
                    "fim.proximo aponta para ele.",
                    "novoNo.anterior aponta para o antigo fim.",
                    "fim passa a referenciar o novo nó."
                ]
            },

            {
                id: "remove",
                icon: Trash2,
                title: "Remover",
                subtitle: "Reconectar os dois lados",
                complexity: "Busca O(n)",

                steps: [
                    "Localizamos o nó.",
                    "Seu anterior precisa ser conectado ao próximo.",
                    "Seu próximo precisa ser conectado ao anterior.",
                    "Nas pontas, inicio ou fim também precisam ser atualizados."
                ]
            },

            {
                id: "traverse",
                icon: ArrowLeftRight,
                title: "Percorrer",
                subtitle: "Nos dois sentidos",
                complexity: "O(n)",

                steps: [
                    "Direto: começamos em inicio e seguimos proximo.",
                    "Inverso: começamos em fim e seguimos anterior.",
                    "O percurso termina quando chegamos a null."
                ]
            }
        ],

        traversalCode: `// Sentido direto
No atual = this.inicio;

while (atual != null) {
    System.out.println(atual.elemento);
    atual = atual.proximo;
}

// Sentido inverso
atual = this.fim;

while (atual != null) {
    System.out.println(atual.elemento);
    atual = atual.anterior;
}`,

        examNotes: [
            "O primeiro nó possui anterior == null.",
            "O último nó possui proximo == null.",
            "As duas direções precisam permanecer consistentes.",
            "Remover do meio exige reconectar anterior e proximo.",
            "Com fim e anterior, remover do final pode ser O(1).",
            "Ao remover o único elemento, inicio e fim se tornam null."
        ]
    }
};

function ReferenceNode({
    value,
    tone,
    label,
    highlighted = false,
    faded = false
}) {
    return (
        <div
            className={`referenceDemoNodeWrapper ${
                faded
                    ? "faded"
                    : ""
            }`}
        >
            {label && (
                <span className="referencePointer">
                    {label}
                    <span>↓</span>
                </span>
            )}

            <div
                className={`referenceDemoNode ${tone} ${
                    highlighted
                        ? "highlighted"
                        : ""
                }`}
            >
                {value}
            </div>
        </div>
    );
}

function InsertDemo({
    listType,
    state
}) {
    const isDouble = listType === "double";

    const created =
        state === "insertCreated";

    const linked =
        state === "insertLinked" ||
        state === "insertFinished";

    const finished =
        state === "insertFinished";

    return (
        <div className="referenceDemo">
            <div className="referenceMainRow">
                <ReferenceNode
                    value="Ana"
                    tone="yellow"
                    label="inicio"
                />

                <span className="referenceLink">
                    {isDouble ? "⇄" : "→"}
                </span>

                <ReferenceNode
                    value="Bruno"
                    tone="green"
                    label={
                        finished
                            ? null
                            : "fim"
                    }
                    highlighted={
                        state === "insertLinked"
                    }
                />

                {linked && (
                    <>
                        <span className="referenceLink active">
                            {isDouble ? "⇄" : "→"}
                        </span>

                        <ReferenceNode
                            value="Carlos"
                            tone="blue"
                            label={
                                finished
                                    ? "fim"
                                    : null
                            }
                            highlighted
                        />
                    </>
                )}

                <span className="referenceLink">
                    →
                </span>

                <span className="referenceNull">
                    null
                </span>
            </div>

            {created && (
                <motion.div
                    className="detachedNodeRow"
                    initial={{
                        opacity: 0,
                        y: 12
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >
                    <span className="detachedLabel">
                        novoNo
                    </span>

                    <ReferenceNode
                        value="Carlos"
                        tone="blue"
                        highlighted
                    />

                    <span className="referenceLink">
                        →
                    </span>

                    <span className="referenceNull">
                        null
                    </span>

                    <small>
                        ainda fora da lista
                    </small>
                </motion.div>
            )}
        </div>
    );
}

function RemoveMiddleDemo({
    listType,
    state
}) {
    const isDouble = listType === "double";

    const located =
        state === "removeMiddleLocated";

    const removed =
        state === "removeMiddleBypassed" ||
        state === "removeMiddleFinished";

    return (
        <div className="referenceDemo">
            {!removed ? (
                <div className="referenceMainRow">
                    <ReferenceNode
                        value="Ana"
                        tone="yellow"
                        label={
                            located
                                ? "anterior"
                                : "inicio"
                        }
                        highlighted={located}
                    />

                    <span className="referenceLink">
                        {isDouble ? "⇄" : "→"}
                    </span>

                    <ReferenceNode
                        value="Bruno"
                        tone="green"
                        label={
                            located
                                ? "atual"
                                : null
                        }
                        highlighted={located}
                    />

                    <span className="referenceLink">
                        {isDouble ? "⇄" : "→"}
                    </span>

                    <ReferenceNode
                        value="Carlos"
                        tone="blue"
                        label="fim"
                    />

                    <span className="referenceLink">
                        →
                    </span>

                    <span className="referenceNull">
                        null
                    </span>
                </div>
            ) : (
                <>
                    <motion.div
                        className="referenceMainRow"
                        initial={{
                            opacity: 0.7
                        }}
                        animate={{
                            opacity: 1
                        }}
                    >
                        <ReferenceNode
                            value="Ana"
                            tone="yellow"
                            label="inicio"
                            highlighted
                        />

                        <span className="referenceLink active">
                            {isDouble ? "⇄" : "→"}
                        </span>

                        <ReferenceNode
                            value="Carlos"
                            tone="blue"
                            label="fim"
                            highlighted
                        />

                        <span className="referenceLink">
                            →
                        </span>

                        <span className="referenceNull">
                            null
                        </span>
                    </motion.div>

                    <motion.div
                        className="detachedNodeRow"
                        initial={{
                            opacity: 0,
                            y: -10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >
                        <ReferenceNode
                            value="Bruno"
                            tone="green"
                            faded
                        />

                        <small>
                            fora da cadeia
                        </small>
                    </motion.div>
                </>
            )}
        </div>
    );
}

function RemoveEndDemo({
    listType,
    state
}) {
    const isDouble =
        listType === "double";

    const located =
        state === "removeEndLocated";

    const cut =
        state === "removeEndCut";

    const finished =
        state === "removeEndFinished";

    if (!cut && !finished) {
        return (
            <div className="referenceDemo">
                <div className="referenceMainRow">
                    <ReferenceNode
                        value="Ana"
                        tone="yellow"
                        label="inicio"
                        highlighted={
                            !isDouble && located
                        }
                    />

                    <span className="referenceLink">
                        {isDouble ? "⇄" : "→"}
                    </span>

                    <ReferenceNode
                        value="Bruno"
                        tone="green"
                        label={
                            located
                                ? isDouble
                                    ? "fim.anterior"
                                    : "atual"
                                : null
                        }
                        highlighted={located}
                    />

                    <span className="referenceLink">
                        {isDouble ? "⇄" : "→"}
                    </span>

                    <ReferenceNode
                        value="Carlos"
                        tone="blue"
                        label="fim"
                        highlighted={
                            isDouble && located
                        }
                    />

                    <span className="referenceLink">
                        →
                    </span>

                    <span className="referenceNull">
                        null
                    </span>
                </div>

                {located && !isDouble && (
                    <div className="walkHint">
                        <ArrowRight size={17} />

                        Percorremos a lista até encontrar o nó cujo
                        proximo é fim.
                    </div>
                )}

                {located && isDouble && (
                    <div className="walkHint success">
                        <Link2 size={17} />

                        Nenhum percurso é necessário:
                        fim.anterior já referencia Bruno.
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="referenceDemo">
            <motion.div
                className="referenceMainRow"
                initial={{
                    opacity: 0.75
                }}
                animate={{
                    opacity: 1
                }}
            >
                <ReferenceNode
                    value="Ana"
                    tone="yellow"
                    label="inicio"
                />

                <span className="referenceLink">
                    {isDouble ? "⇄" : "→"}
                </span>

                <ReferenceNode
                    value="Bruno"
                    tone="green"
                    label={
                        finished || isDouble
                            ? "fim"
                            : "atual"
                    }
                    highlighted
                />

                <span className="referenceLink">
                    →
                </span>

                <span className="referenceNull">
                    null
                </span>
            </motion.div>

            <motion.div
                className="detachedNodeRow"
                initial={{
                    opacity: 0,
                    y: -10
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
            >
                <ReferenceNode
                    value="Carlos"
                    tone="blue"
                    label={
                        !finished && !isDouble
                            ? "fim"
                            : null
                    }
                    faded
                />

                <small>
                    removido da cadeia
                </small>
            </motion.div>
        </div>
    );
}

function ConnectionDemo({
    listType,
    action,
    state
}) {
    if (action === "insert") {
        return (
            <InsertDemo
                listType={listType}
                state={state}
            />
        );
    }

    if (action === "removeMiddle") {
        return (
            <RemoveMiddleDemo
                listType={listType}
                state={state}
            />
        );
    }

    return (
        <RemoveEndDemo
            listType={listType}
            state={state}
        />
    );
}

function Theory() {
    const [listType, setListType] =
        useState("simple");

    const [selectedConcept, setSelectedConcept] =
        useState("proximo");

    const [activeOperation, setActiveOperation] =
        useState(0);

    const [connectionAction, setConnectionAction] =
        useState("insert");

    const [connectionStep, setConnectionStep] =
        useState(0);

    const content =
        theoryData[listType];

    const operation =
        content.operations[activeOperation];

    const connectionExample =
        content.connectionExamples[connectionAction];

    const currentConnectionStep =
        connectionExample.steps[connectionStep];

    const concept =
        content.concepts[selectedConcept];

    function changeListType(type) {
        setListType(type);
        setActiveOperation(0);
        setConnectionAction("insert");
        setConnectionStep(0);

        if (type === "simple") {
            setSelectedConcept("proximo");
        } else {
            setSelectedConcept("anterior");
        }
    }

    function changeConnectionAction(action) {
        setConnectionAction(action);
        setConnectionStep(0);
    }

    function previousConnectionStep() {
        setConnectionStep((current) =>
            Math.max(0, current - 1)
        );
    }

    function nextConnectionStep() {
        setConnectionStep((current) =>
            Math.min(
                connectionExample.steps.length - 1,
                current + 1
            )
        );
    }

    return (
        <main className="theoryPage">
            <div className="pageTop">
                <BackButton />
            </div>

            <header className="theoryHeader">
                <span className="theoryBadge">
                    📚 Teoria
                </span>

                <h1>
                    Entendendo listas encadeadas
                </h1>

                <p>
                    Revise a estrutura, as referências e as principais
                    operações antes de partir para o simulador e para o código.
                </p>

                <ListTypeSwitch
                    value={listType}
                    onChange={changeListType}
                />
            </header>

            <motion.div
                key={listType}
                className="theoryContent"
                initial={{
                    opacity: 0,
                    y: 12
                }}
                animate={{
                    opacity: 1,
                    y: 0
                }}
            >
                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">
                            01
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Estrutura
                            </span>

                            <h2>
                                {content.title}
                            </h2>

                            <p>
                                {content.description}
                            </p>
                        </div>
                    </div>

                    <div className="theoryDiagram">
                        {listType === "double" && (
                            <>
                                <span className="diagramNull">
                                    null
                                </span>

                                <ArrowLeft
                                    className="diagramArrow"
                                    size={48}
                                />
                            </>
                        )}

                        <div className="diagramNodeWrapper">
                            <span className="pointerLabel">
                                inicio
                                <span>↓</span>
                            </span>

                            <button
                                className="diagramNode yellow"
                                onClick={() =>
                                    setSelectedConcept("inicio")
                                }
                            >
                                <span className="nodeNumber">
                                    Ana
                                </span>

                                {listType === "double" && (
                                    <span className="leftReference" />
                                )}

                                <span className="rightReference" />
                            </button>
                        </div>

                        {listType === "simple" ? (
                            <ArrowRight
                                className="diagramArrow"
                                size={58}
                            />
                        ) : (
                            <ArrowLeftRight
                                className="diagramArrow"
                                size={58}
                            />
                        )}

                        <button
                            className="diagramNode green"
                            onClick={() =>
                                setSelectedConcept(
                                    listType === "simple"
                                        ? "proximo"
                                        : "anterior"
                                )
                            }
                        >
                            <span className="nodeNumber">
                                Bruno
                            </span>

                            {listType === "double" && (
                                <span className="leftReference" />
                            )}

                            <span className="rightReference" />
                        </button>

                        {listType === "simple" ? (
                            <ArrowRight
                                className="diagramArrow"
                                size={58}
                            />
                        ) : (
                            <ArrowLeftRight
                                className="diagramArrow"
                                size={58}
                            />
                        )}

                        <div className="diagramNodeWrapper">
                            <span className="pointerLabel">
                                fim
                                <span>↓</span>
                            </span>

                            <button
                                className="diagramNode blue"
                                onClick={() =>
                                    setSelectedConcept("fim")
                                }
                            >
                                <span className="nodeNumber">
                                    Carlos
                                </span>

                                {listType === "double" && (
                                    <span className="leftReference" />
                                )}

                                <span className="rightReference" />
                            </button>
                        </div>

                        <ArrowRight
                            className="diagramArrow"
                            size={48}
                        />

                        <button
                            className="diagramNull clickable"
                            onClick={() =>
                                setSelectedConcept("null")
                            }
                        >
                            null
                        </button>
                    </div>

                    <div className="conceptExplorer">
                        <div className="conceptButtons">
                            {Object.keys(content.concepts).map((key) => (
                                <button
                                    key={key}
                                    className={
                                        selectedConcept === key
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedConcept(key)
                                    }
                                >
                                    <CircleDot size={15} />

                                    {key}
                                </button>
                            ))}
                        </div>

                        <motion.div
                            key={`${listType}-${selectedConcept}`}
                            className="conceptExplanation"
                            initial={{
                                opacity: 0,
                                y: 5
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                        >
                            <strong>
                                {concept.title}
                            </strong>

                            <p>
                                {concept.description}
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">
                            02
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Anatomia
                            </span>

                            <h2>
                                Como é um nó?
                            </h2>

                            <p>
                                O nó armazena o elemento e as referências
                                responsáveis por formar a sequência da lista.
                            </p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="nodeCodeCard">
                            <div className="codeCardHeader">
                                No.java
                            </div>

                            <pre>
                                <code>
                                    {content.nodeCode}
                                </code>
                            </pre>
                        </div>

                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">
                                    elemento
                                </span>

                                <strong>
                                    O dado armazenado
                                </strong>

                                <p>
                                    Neste exemplo usamos String.
                                    Cada nó guarda um texto como
                                    "Ana", "Bruno" ou "Carlos".
                                </p>
                            </div>

                            <div>
                                <span className="miniTag">
                                    referência
                                </span>

                                <strong>
                                    A ligação entre os nós
                                </strong>

                                <p>
                                    {listType === "simple"
                                        ? "proximo guarda a referência necessária para chegar ao próximo nó."
                                        : "anterior e proximo conectam cada nó aos seus dois vizinhos."}
                                </p>
                            </div>

                            <aside className="typeNote">
                                <span>
                                    💡
                                </span>

                                <p>
                                    Aqui usamos <strong>String</strong> para
                                    facilitar o exemplo, mas poderíamos armazenar,
                                    por exemplo, <strong>Integer</strong>,{" "}
                                    <strong>Double</strong> ou objetos de uma
                                    classe <strong>Aluno</strong>. No módulo
                                    bônus veremos como generalizar isso.
                                </p>
                            </aside>

                            <aside className="theoryTip">
                                <span>
                                    🧠
                                </span>

                                <p>
                                    Os nós não precisam estar lado a lado
                                    fisicamente na memória. A sequência é
                                    determinada pelas referências.
                                </p>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="theorySection connectionSection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">
                            03
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Referências na prática
                            </span>

                            <h2>
                                Conectando e desconectando nós
                            </h2>

                            <p>
                                Inserir e remover elementos significa,
                                principalmente, alterar as referências que
                                formam a cadeia.
                            </p>
                        </div>
                    </div>

                    <div className="connectionActionSelector">
                        <button
                            className={
                                connectionAction === "insert"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                changeConnectionAction("insert")
                            }
                        >
                            <Plus size={18} />

                            Adicionar ao final
                        </button>

                        <button
                            className={
                                connectionAction === "removeMiddle"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                changeConnectionAction("removeMiddle")
                            }
                        >
                            <Trash2 size={18} />

                            Remover do meio
                        </button>

                        <button
                            className={
                                connectionAction === "removeEnd"
                                    ? "selected"
                                    : ""
                            }
                            onClick={() =>
                                changeConnectionAction("removeEnd")
                            }
                        >
                            <Trash2 size={18} />

                            Remover do final
                        </button>
                    </div>

                    <div className="connectionLesson">
                        <div className="connectionLessonHeader">
                            <div>
                                <span className="connectionStepCounter">
                                    Passo {connectionStep + 1} de{" "}
                                    {connectionExample.steps.length}
                                </span>

                                <h3>
                                    {connectionExample.title}
                                </h3>

                                <p>
                                    {connectionExample.description}
                                </p>
                            </div>

                            <div className="connectionHeaderSide">
                                <span className="connectionComplexity">
                                    {connectionExample.complexity}
                                </span>

                                <Link2
                                    size={27}
                                    strokeWidth={1.8}
                                />
                            </div>
                        </div>

                        <ConnectionDemo
                            listType={listType}
                            action={connectionAction}
                            state={currentConnectionStep.state}
                        />

                        <motion.div
                            key={`${listType}-${connectionAction}-${connectionStep}`}
                            className="connectionExplanationGrid"
                            initial={{
                                opacity: 0,
                                y: 8
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                        >
                            <div className="connectionCode">
                                <div className="codeCardHeader">
                                    {currentConnectionStep.label}
                                </div>

                                <pre>
                                    <code>
                                        {currentConnectionStep.code}
                                    </code>
                                </pre>
                            </div>

                            <div className="connectionExplanation">
                                <span>
                                    O que aconteceu?
                                </span>

                                <strong>
                                    {currentConnectionStep.label}
                                </strong>

                                <p>
                                    {currentConnectionStep.explanation}
                                </p>
                            </div>
                        </motion.div>

                        <div className="connectionNavigation">
                            <button
                                onClick={previousConnectionStep}
                                disabled={connectionStep === 0}
                            >
                                <ChevronLeft size={18} />

                                Anterior
                            </button>

                            <div className="connectionDots">
                                {connectionExample.steps.map(
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={
                                                connectionStep === index
                                                    ? "selected"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setConnectionStep(index)
                                            }
                                            aria-label={`Ir para o passo ${
                                                index + 1
                                            }`}
                                        />
                                    )
                                )}
                            </div>

                            <button
                                onClick={nextConnectionStep}
                                disabled={
                                    connectionStep ===
                                    connectionExample.steps.length - 1
                                }
                            >
                                Próximo

                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>

                    {connectionAction === "removeEnd" && (
                        <motion.div
                            className="endRemovalComparison"
                            initial={{
                                opacity: 0,
                                y: 8
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                        >
                            <div>
                                <span>
                                    Lista simples
                                </span>

                                <strong>
                                    O(n)
                                </strong>

                                <p>
                                    Precisamos procurar o penúltimo nó porque
                                    não existe referência para o anterior.
                                </p>
                            </div>

                            <div>
                                <span>
                                    Lista dupla
                                </span>

                                <strong>
                                    O(1)
                                </strong>

                                <p>
                                    fim.anterior fornece diretamente o novo
                                    último nó.
                                </p>
                            </div>
                        </motion.div>
                    )}

                    <aside className="singleNodeWarning">
                        <span>
                            ⚠️
                        </span>

                        <div>
                            <strong>
                                E se a lista tiver somente um nó?
                            </strong>

                            <p>
                                Se inicio e fim apontam para o mesmo nó e ele é
                                removido, a lista ficará vazia.
                            </p>

                            <code>
                                inicio = null; fim = null;
                            </code>
                        </div>
                    </aside>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">
                            04
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Operações
                            </span>

                            <h2>
                                O que fazemos com uma lista?
                            </h2>

                            <p>
                                Escolha uma operação para revisar seu
                                raciocínio.
                            </p>
                        </div>
                    </div>

                    <div className="operationSelector">
                        {content.operations.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={item.id}
                                    className={
                                        activeOperation === index
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setActiveOperation(index)
                                    }
                                >
                                    <span className="operationIcon">
                                        <Icon size={20} />
                                    </span>

                                    <span>
                                        <strong>
                                            {item.title}
                                        </strong>

                                        <small>
                                            {item.subtitle}
                                        </small>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <motion.div
                        key={`${listType}-${operation.id}`}
                        className="operationDetail"
                        initial={{
                            opacity: 0,
                            y: 8
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >
                        <div className="operationDetailHeader">
                            <div>
                                <span>
                                    Passo a passo
                                </span>

                                <h3>
                                    {operation.title}
                                </h3>
                            </div>

                            <span className="complexityBadge">
                                {operation.complexity}
                            </span>
                        </div>

                        <div className="operationSteps">
                            {operation.steps.map((step, index) => (
                                <div
                                    className="operationStep"
                                    key={step}
                                >
                                    <span>
                                        {index + 1}
                                    </span>

                                    <p>
                                        {step}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">
                            05
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Percurso
                            </span>

                            <h2>
                                Como visitar os elementos?
                            </h2>

                            <p>
                                Em uma lista encadeada chegamos aos elementos
                                seguindo suas referências.
                            </p>
                        </div>
                    </div>

                    <div className="traversalGrid">
                        <div className="traversalExplanation">
                            <span className="traversalIcon">
                                <ArrowRight size={25} />
                            </span>

                            <h3>
                                Siga as referências
                            </h3>

                            <p>
                                {listType === "simple"
                                    ? "Começamos em inicio e seguimos proximo até encontrar null."
                                    : "Podemos começar em inicio e seguir proximo ou começar em fim e seguir anterior."}
                            </p>

                            <div className="traversalPath">
                                {listType === "simple"
                                    ? "inicio → Ana → Bruno → Carlos → null"
                                    : "inicio ⇄ Ana ⇄ Bruno ⇄ Carlos ⇄ fim"}
                            </div>
                        </div>

                        <div className="traversalCode">
                            <div className="codeCardHeader">
                                Percurso
                            </div>

                            <pre>
                                <code>
                                    {content.traversalCode}
                                </code>
                            </pre>
                        </div>
                    </div>
                </section>

                <section className="examSection">
                    <div className="examTitle">
                        <span>
                            📝
                        </span>

                        <div>
                            <span className="sectionEyebrow">
                                Revisão
                            </span>

                            <h2>
                                O que lembrar para a prova
                            </h2>
                        </div>
                    </div>

                    <div className="examNotes">
                        {content.examNotes.map((note, index) => (
                            <div
                                className="examNote"
                                key={note}
                            >
                                <span>
                                    {index + 1}
                                </span>

                                <p>
                                    {note}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </motion.div>
        </main>
    );
}

export default Theory;