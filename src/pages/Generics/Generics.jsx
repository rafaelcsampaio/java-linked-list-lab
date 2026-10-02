import { useState } from "react";
import { motion } from "motion/react";
import {
    ArrowRight,
    Box,
    Check,
    CircleHelp,
    Code2,
    Lightbulb,
    RefreshCcw,
    Sparkles,
    TriangleAlert
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";

import "./Generics.css";

const typeExamples = {
    String: {
        type: "String",
        value: '"Ana"',
        values: ['"Ana"', '"Bruno"', '"Carlos"'],
        variable: "nomes",
        description: "Textos",
        tone: "purple"
    },

    Integer: {
        type: "Integer",
        value: "10",
        values: ["10", "20", "35"],
        variable: "numeros",
        description: "Números inteiros",
        tone: "blue"
    },

    Double: {
        type: "Double",
        value: "7.5",
        values: ["7.5", "8.2", "9.0"],
        variable: "notas",
        description: "Números decimais",
        tone: "green"
    },

    Aluno: {
        type: "Aluno",
        value: 'new Aluno("Ana")',
        values: ["Ana", "Bruno", "Carlos"],
        variable: "alunos",
        description: "Objetos próprios",
        tone: "pink"
    }
};

function Generics() {
    const [selectedType, setSelectedType] =
        useState("String");

    const [showGeneric, setShowGeneric] =
        useState(false);

    const current =
        typeExamples[selectedType];

    const genericNodeCode = `class No<T> {
    T elemento;
    No<T> proximo;

    public No(T elemento) {
        this.elemento = elemento;
        this.proximo = null;
    }
}`;

    const concreteNodeCode = `class NoString {
    String elemento;
    NoString proximo;

    public NoString(String elemento) {
        this.elemento = elemento;
        this.proximo = null;
    }
}`;

    const currentListCode =
        selectedType === "Aluno"
            ? `ListaEncadeada<Aluno> ${current.variable}
    = new ListaEncadeada<>();

${current.variable}.adicionar(
    new Aluno("Ana")
);`
            : `ListaEncadeada<${current.type}> ${current.variable}
    = new ListaEncadeada<>();

${current.variable}.adicionar(${current.value});`;

    return (
        <main className="genericsPage">
            <div className="pageTop">
                <BackButton />
            </div>

            <header className="genericsHeader">
                <span className="genericsBadge">
                    ✨ Bônus
                </span>

                <h1>
                    Afinal, o que é &lt;T&gt;?
                </h1>

                <p>
                    Entenda como o Java permite criar uma única estrutura
                    capaz de trabalhar com diferentes tipos de dados.
                </p>
            </header>

            <div className="genericsContent">
                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">
                            01
                        </span>

                        <div>
                            <span className="genericEyebrow">
                                O problema
                            </span>

                            <h2>
                                E se quisermos guardar outro tipo?
                            </h2>

                            <p>
                                Até agora usamos String para aprender listas.
                                Imagine que nossa classe de nó fosse criada
                                especificamente para armazenar textos.
                            </p>
                        </div>
                    </div>

                    <div className="genericProblemGrid">
                        <div className="genericCodeCard">
                            <div className="genericCodeHeader">
                                NoString.java
                            </div>

                            <pre>
                                <code>
                                    {`class NoString {
    String elemento;
    NoString proximo;
}`}
                                </code>
                            </pre>
                        </div>

                        <div className="genericProblemArrow">
                            <ArrowRight size={27} />

                            <span>
                                E para números?
                            </span>
                        </div>

                        <div className="genericCodeCard problem">
                            <div className="genericCodeHeader">
                                NoInteger.java?
                            </div>

                            <pre>
                                <code>
                                    {`class NoInteger {
    Integer elemento;
    NoInteger proximo;
}`}
                                </code>
                            </pre>
                        </div>
                    </div>

                    <aside className="genericWarning">
                        <TriangleAlert
                            size={22}
                            strokeWidth={2}
                        />

                        <div>
                            <strong>
                                Isso começaria a se repetir
                            </strong>

                            <p>
                                Teríamos uma classe para String, outra para
                                Integer, outra para Double, outra para Aluno...
                                mesmo que a lógica da lista fosse praticamente
                                a mesma.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="genericSection genericSolutionSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">
                            02
                        </span>

                        <div>
                            <span className="genericEyebrow">
                                A solução
                            </span>

                            <h2>
                                Deixe o tipo para ser escolhido depois
                            </h2>

                            <p>
                                Em vez de escrever um tipo fixo, usamos um
                                parâmetro de tipo. É aí que aparece o
                                famoso &lt;T&gt;.
                            </p>
                        </div>
                    </div>

                    <div className="genericTransformation">
                        <div className="genericTransformationCode">
                            <div className="genericToggle">
                                <button
                                    className={
                                        !showGeneric
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setShowGeneric(false)
                                    }
                                >
                                    Tipo fixo
                                </button>

                                <button
                                    className={
                                        showGeneric
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        setShowGeneric(true)
                                    }
                                >
                                    Com &lt;T&gt;
                                </button>
                            </div>

                            <motion.div
                                key={
                                    showGeneric
                                        ? "generic"
                                        : "concrete"
                                }
                                className="genericCodeCard large"
                                initial={{
                                    opacity: 0,
                                    y: 6
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                            >
                                <div className="genericCodeHeader">
                                    No.java
                                </div>

                                <pre>
                                    <code>
                                        {showGeneric
                                            ? genericNodeCode
                                            : concreteNodeCode}
                                    </code>
                                </pre>
                            </motion.div>
                        </div>

                        <div className="genericMeaning">
                            <div className="bigGenericT">
                                &lt;T&gt;
                            </div>

                            <h3>
                                T representa um tipo
                            </h3>

                            <p>
                                Ele funciona como um espaço reservado.
                                Quando criamos a lista, escolhemos qual
                                tipo ocupará esse lugar.
                            </p>

                            <div className="genericMeaningExample">
                                <code>
                                    ListaEncadeada&lt;String&gt;
                                </code>

                                <ArrowRight size={20} />

                                <span>
                                    T passa a ser String
                                </span>
                            </div>

                            <div className="genericMeaningExample">
                                <code>
                                    ListaEncadeada&lt;Integer&gt;
                                </code>

                                <ArrowRight size={20} />

                                <span>
                                    T passa a ser Integer
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">
                            03
                        </span>

                        <div>
                            <span className="genericEyebrow">
                                Consistência
                            </span>

                            <h2>
                                O mesmo T acompanha toda a estrutura
                            </h2>

                            <p>
                                Quando escolhemos um tipo para a lista,
                                os nós utilizados por ela precisam seguir
                                o mesmo tipo.
                            </p>
                        </div>
                    </div>

                    <div className="genericTypeFlow">
                        <div className="genericFlowBox main">
                            <span>
                                Lista
                            </span>

                            <strong>
                                ListaEncadeada&lt;String&gt;
                            </strong>
                        </div>

                        <ArrowRight
                            size={29}
                            className="genericFlowArrow"
                        />

                        <div className="genericFlowBox">
                            <span>
                                Nó
                            </span>

                            <strong>
                                No&lt;String&gt;
                            </strong>
                        </div>

                        <ArrowRight
                            size={29}
                            className="genericFlowArrow"
                        />

                        <div className="genericFlowBox">
                            <span>
                                Elemento
                            </span>

                            <strong>
                                String elemento
                            </strong>
                        </div>
                    </div>

                    <aside className="genericImportant">
                        <Lightbulb size={23} />

                        <div>
                            <strong>
                                O T não é um tipo especial chamado “T”
                            </strong>

                            <p>
                                É apenas o nome escolhido para o parâmetro
                                de tipo. T é uma convenção muito usada em
                                Java para representar “Type”.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="genericSection experimentSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">
                            04
                        </span>

                        <div>
                            <span className="genericEyebrow">
                                Experimente
                            </span>

                            <h2>
                                Escolha o tipo da lista
                            </h2>

                            <p>
                                A estrutura continua a mesma. O que muda
                                é o tipo armazenado pelos nós.
                            </p>
                        </div>
                    </div>

                    <div className="typeSelector">
                        {Object.entries(
                            typeExamples
                        ).map(
                            ([
                                key,
                                item
                            ]) => (
                                <button
                                    key={key}
                                    className={
                                        selectedType === key
                                            ? "selectedType"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedType(
                                            key
                                        )
                                    }
                                >
                                    <Box
                                        size={18}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        <strong>
                                            {item.type}
                                        </strong>

                                        <small>
                                            {
                                                item.description
                                            }
                                        </small>
                                    </span>
                                </button>
                            )
                        )}
                    </div>

                    <motion.div
                        key={selectedType}
                        className="genericExperiment"
                        initial={{
                            opacity: 0,
                            y: 10
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >
                        <div className="genericExperimentCode">
                            <div className="genericCodeHeader">
                                Exemplo.java
                            </div>

                            <pre>
                                <code>
                                    {currentListCode}
                                </code>
                            </pre>
                        </div>

                        <div className="genericVisual">
                            <div className="genericVisualTitle">
                                <span>
                                    Tipo escolhido
                                </span>

                                <strong>
                                    ListaEncadeada&lt;
                                    {current.type}
                                    &gt;
                                </strong>
                            </div>

                            <div className="genericNodes">
                                {current.values.map(
                                    (
                                        value,
                                        index
                                    ) => (
                                        <div
                                            className="genericNodeItem"
                                            key={`${selectedType}-${value}-${index}`}
                                        >
                                            <motion.div
                                                className={`genericNode ${current.tone}`}
                                                initial={{
                                                    scale: 0.85,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.08
                                                }}
                                            >
                                                {
                                                    value
                                                }
                                            </motion.div>

                                            {index <
                                                current
                                                    .values
                                                    .length -
                                                    1 && (
                                                <ArrowRight
                                                    size={
                                                        34
                                                    }
                                                />
                                            )}
                                        </div>
                                    )
                                )}

                                <span className="genericNull">
                                    null
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">
                            05
                        </span>

                        <div>
                            <span className="genericEyebrow">
                                Sintaxe importante
                            </span>

                            <h2>
                                Três detalhes que você precisa lembrar
                            </h2>
                        </div>
                    </div>

                    <div className="genericRules">
                        <article className="genericRule">
                            <div className="genericRuleIcon">
                                <Code2 size={22} />
                            </div>

                            <span className="genericRuleNumber">
                                01
                            </span>

                            <h3>
                                Integer, não int
                            </h3>

                            <p>
                                Generics trabalham com tipos de referência.
                                Por isso usamos Integer no lugar do tipo
                                primitivo int.
                            </p>

                            <div className="genericCorrectWrong">
                                <span className="wrong">
                                    int ✕
                                </span>

                                <span className="correct">
                                    Integer ✓
                                </span>
                            </div>
                        </article>

                        <article className="genericRule">
                            <div className="genericRuleIcon">
                                <Sparkles size={22} />
                            </div>

                            <span className="genericRuleNumber">
                                02
                            </span>

                            <h3>
                                O operador &lt;&gt;
                            </h3>

                            <p>
                                Depois de informar o tipo do lado esquerdo,
                                o Java normalmente consegue inferir o mesmo
                                tipo do lado direito.
                            </p>

                            <code className="ruleCode">
                                new ListaEncadeada&lt;&gt;()
                            </code>
                        </article>

                        <article className="genericRule">
                            <div className="genericRuleIcon">
                                <RefreshCcw size={22} />
                            </div>

                            <span className="genericRuleNumber">
                                03
                            </span>

                            <h3>
                                Mantenha o tipo consistente
                            </h3>

                            <p>
                                Se a lista foi criada como
                                ListaEncadeada&lt;String&gt;, seus nós e
                                elementos devem respeitar String.
                            </p>

                            <code className="ruleCode">
                                No&lt;String&gt;
                            </code>
                        </article>
                    </div>
                </section>

                <section className="genericSummary">
                    <div className="genericSummaryHeader">
                        <CircleHelp
                            size={28}
                            strokeWidth={2}
                        />

                        <div>
                            <span className="genericEyebrow">
                                Resumo
                            </span>

                            <h2>
                                Então, para que serve &lt;T&gt;?
                            </h2>
                        </div>
                    </div>

                    <div className="genericSummaryItems">
                        <div>
                            <Check size={19} />

                            <p>
                                Permite reaproveitar a mesma classe com
                                diferentes tipos.
                            </p>
                        </div>

                        <div>
                            <Check size={19} />

                            <p>
                                Mantém o tipo dos elementos conhecido pelo Java.
                            </p>
                        </div>

                        <div>
                            <Check size={19} />

                            <p>
                                Evita criar uma versão da lista para String,
                                outra para Integer, outra para Aluno etc.
                            </p>
                        </div>

                        <div>
                            <Check size={19} />

                            <p>
                                Em ListaEncadeada&lt;String&gt;, o T usado
                                pela estrutura passa a representar String.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Generics;