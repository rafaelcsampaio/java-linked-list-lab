import { useMemo, useState } from "react";
import {
    ArrowRight,
    Box,
    Check,
    Code2,
    Lightbulb,
    RefreshCcw,
    Sparkles,
    TriangleAlert
} from "lucide-react";

import BackButton from "../layout/BackButton";
import StructurePreview from "./StructurePreview";

import "../../pages/Generics/Generics.css";
import "./ModuleVisuals.css";

const typeExamples = {
    String: {
        type: "String",
        sample: '"Ana"',
        values: ["Ana", "Bruno", "Carlos"],
        description: "Textos"
    },
    Integer: {
        type: "Integer",
        sample: "10",
        values: ["10", "20", "35"],
        description: "Números inteiros"
    },
    Double: {
        type: "Double",
        sample: "7.5",
        values: ["7.5", "8.2", "9.0"],
        description: "Números decimais"
    },
    Aluno: {
        type: "Aluno",
        sample: 'new Aluno("Ana")',
        values: ["Ana", "Bruno", "Carlos"],
        description: "Objetos próprios"
    }
};

function StructureGenericsPage({
    variant,
    title,
    description,
    structureName,
    fixedTypeName,
    genericTypeName,
    declaration,
    typeFlow,
    coreCode,
    notes,
    previewMode
}) {
    const [selectedType, setSelectedType] = useState("String");
    const [showGeneric, setShowGeneric] = useState(true);

    const current = typeExamples[selectedType];

    const previewValues = previewMode === "tree"
        ? [current.values[1], current.values[0], current.values[2]]
        : current.values;

    const declarationCode = useMemo(
        () => declaration
            .replaceAll("{{TYPE}}", current.type)
            .replaceAll("{{SAMPLE}}", current.sample),
        [declaration, current]
    );

    return (
        <main className={`genericsPage moduleGenericsPage moduleGenericsPage--${variant}`}>
            <BackButton />

            <header className="genericsHeader">
                <span className="genericsBadge moduleBadgeSoft">
                    {"{}"} Generics aplicados
                </span>

                <h1>{title}</h1>
                <p>{description}</p>
            </header>

            <div className="genericsContent">
                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">01</span>
                        <div>
                            <span className="genericEyebrow">O problema</span>
                            <h2>Sem &lt;T&gt;, a lógica começa a se repetir</h2>
                            <p>
                                A estrutura e suas operações continuam iguais; o que muda é apenas o tipo armazenado.
                                Generics evitam criar uma classe diferente para cada tipo de dado.
                            </p>
                        </div>
                    </div>

                    <div className="genericProblemGrid">
                        <div className="genericCodeCard">
                            <div className="genericCodeHeader">{fixedTypeName}</div>
                            <pre><code>{coreCode.fixed}</code></pre>
                        </div>

                        <div className="genericProblemArrow">
                            <ArrowRight size={27} />
                            <span>E para outro tipo?</span>
                        </div>

                        <div className="genericCodeCard problem">
                            <div className="genericCodeHeader">Outra classe?</div>
                            <pre><code>{coreCode.duplicate}</code></pre>
                        </div>
                    </div>

                    <aside className="genericWarning">
                        <TriangleAlert size={22} strokeWidth={2} />
                        <div>
                            <strong>O algoritmo seria duplicado</strong>
                            <p>
                                push, inserir, percorrer, remover ou comparar continuariam fazendo a mesma coisa.
                                A organização é preservada; em uma BST, a comparação precisa ser compatível com o tipo.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">02</span>
                        <div>
                            <span className="genericEyebrow">A solução</span>
                            <h2>O tipo passa a ser um parâmetro da estrutura</h2>
                            <p>
                                O &lt;T&gt; funciona como um espaço reservado. O tipo concreto é escolhido quando a estrutura é criada.
                            </p>
                        </div>
                    </div>

                    <div className="genericTransformation">
                        <div className="genericTransformationCode">
                            <div className="genericToggle">
                                <button
                                    className={!showGeneric ? "selected" : ""}
                                    onClick={() => setShowGeneric(false)}
                                >
                                    Tipo fixo
                                </button>
                                <button
                                    className={showGeneric ? "selected" : ""}
                                    onClick={() => setShowGeneric(true)}
                                >
                                    Com &lt;T&gt;
                                </button>
                            </div>

                            <div className="genericCodeCard large">
                                <div className="genericCodeHeader">
                                    {showGeneric ? genericTypeName : fixedTypeName}
                                </div>
                                <pre><code>{showGeneric ? coreCode.generic : coreCode.fixed}</code></pre>
                            </div>
                        </div>

                        <div className="genericMeaning">
                            <div className="bigGenericT">&lt;T&gt;</div>
                            <h3>T representa o tipo armazenado</h3>
                            <p>
                                O compilador verifica T como o tipo escolhido: parâmetros e retornos devem ser compatíveis. Isso não cria uma cópia da classe para cada tipo.
                            </p>

                            <div className="genericMeaningExample">
                                <code>{`${genericTypeName.replace(".java", "").replace("<T>", "")}<String>`}</code>
                                <ArrowRight size={20} />
                                <span>T passa a ser String</span>
                            </div>

                            <div className="genericMeaningExample">
                                <code>{`${genericTypeName.replace(".java", "").replace("<T>", "")}<Integer>`}</code>
                                <ArrowRight size={20} />
                                <span>T passa a ser Integer</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">03</span>
                        <div>
                            <span className="genericEyebrow">Consistência</span>
                            <h2>O mesmo T acompanha a estrutura inteira</h2>
                            <p>
                                A regra vale para os campos, parâmetros, retornos e nós associados à estrutura. O fluxo abaixo acompanha o tipo selecionado no experimento.
                            </p>
                        </div>
                    </div>

                    <div className="genericTypeFlow">
                        {typeFlow.map((item, index) => (
                            <div key={item.title} style={{ display: "contents" }}>
                                <div className={`genericFlowBox ${index === 0 ? "main" : ""}`}>
                                    <span>{item.title}</span>
                                    <strong>{item.code.replace(/String|Integer/g, current.type)}</strong>
                                </div>
                                {index < typeFlow.length - 1 && (
                                    <ArrowRight size={29} className="genericFlowArrow" />
                                )}
                            </div>
                        ))}
                    </div>

                    <aside className="genericImportant">
                        <Lightbulb size={23} />
                        <div>
                            <strong>Separe tipo de organização</strong>
                            <p>
                                T responde “que tipo de dado estou guardando?”. Topo, início/fim ou filhos respondem “como a estrutura está organizada?”.
                            </p>
                        </div>
                    </aside>
                </section>

                <section className="genericSection experimentSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">04</span>
                        <div>
                            <span className="genericEyebrow">Experimente</span>
                            <h2>Troque o tipo sem reescrever o algoritmo</h2>
                            <p>A forma da estrutura continua a mesma; apenas o tipo dos elementos muda.</p>
                        </div>
                    </div>

                    <div className="typeSelector">
                        {Object.entries(typeExamples).map(([key, item]) => (
                            <button
                                key={key}
                                className={selectedType === key ? "selectedType" : ""}
                                onClick={() => setSelectedType(key)}
                            >
                                <Box size={18} strokeWidth={2} />
                                <span>
                                    <strong>{item.type}</strong>
                                    <small>{item.description}</small>
                                </span>
                            </button>
                        ))}
                    </div>

                    <aside className="genericImportant"><Lightbulb size={23} /><div><strong>Consistência verificada pelo compilador</strong><p>{`${structureName}<${current.type}> aceita ${current.sample}. `}{current.type === "String" ? "Inserir 10 é um erro de tipo." : 'Inserir "texto" é um erro de tipo.'}</p></div></aside>
                    <div className="genericExperiment">
                        <div className="genericExperimentCode">
                            <div className="genericCodeHeader">Exemplo.java</div>
                            <pre><code>{declarationCode}</code></pre>
                        </div>

                        <div className="genericVisual">
                            <div className="genericVisualTitle">
                                <span>Exemplo de estrutura preenchida</span>
                                <strong>{`${structureName}<${current.type}>`}</strong>
                            </div>

                            <div className="moduleGenericPreview">
                                <StructurePreview mode={previewMode} values={previewValues} />
                            </div>
                        </div>
                    </div>
                </section>

                {previewMode === "tree" && selectedType === "Aluno" && <section className="genericSection"><h2>Como ordenar Aluno?</h2><p>A BST exige uma comparação. Neste exemplo, os nomes definem a ordem; nomes iguais representam a mesma chave.</p><div className="genericCodeCard"><div className="genericCodeHeader">Aluno.java</div><pre><code>{`record Aluno(String nome)
    implements Comparable<Aluno> {
    public int compareTo(Aluno outro) {
        return nome.compareTo(outro.nome());
    }
}`}</code></pre></div></section>}
                <section className="genericSection">
                    <div className="genericSectionHeading">
                        <span className="genericSectionNumber">05</span>
                        <div>
                            <span className="genericEyebrow">Sintaxe importante</span>
                            <h2>Três detalhes para levar para a prática</h2>
                        </div>
                    </div>

                    <div className="genericRules">
                        <article className="genericRule">
                            <div className="genericRuleIcon"><Code2 size={22} /></div>
                            <span className="genericRuleNumber">01</span>
                            <h3>Integer, não int</h3>
                            <p>Generics trabalham com tipos de referência.</p>
                            <div className="genericCorrectWrong">
                                <span className="wrong">int ✕</span>
                                <span className="correct">Integer ✓</span>
                            </div>
                        </article>

                        <article className="genericRule">
                            <div className="genericRuleIcon"><Sparkles size={22} /></div>
                            <span className="genericRuleNumber">02</span>
                            <h3>Use o diamond &lt;&gt;</h3>
                            <p>Depois de informar o tipo à esquerda, o Java normalmente consegue inferi-lo à direita.</p>
                            <code className="ruleCode">new {structureName}&lt;&gt;({previewMode === "stack" ? "6" : previewMode === "queue" ? "7" : ""})</code>
                        </article>

                        <article className="genericRule">
                            <div className="genericRuleIcon"><RefreshCcw size={22} /></div>
                            <span className="genericRuleNumber">03</span>
                            <h3>Mantenha T consistente</h3>
                            <p>Campos, parâmetros, retornos e nós da mesma estrutura devem concordar com o tipo escolhido.</p>
                            <code className="ruleCode">T elemento</code>
                        </article>
                    </div>
                </section>

                <section className="genericSummary">
                    <div className="genericSummaryHeader">
                        <Check size={28} strokeWidth={2} />
                        <div>
                            <span className="genericEyebrow">Resumo</span>
                            <h2>Generics não mudam o algoritmo</h2>
                        </div>
                    </div>

                    <div className="genericSummaryItems">
                        {notes.map((note) => (
                            <div key={note}>
                                <Check size={19} />
                                <p>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default StructureGenericsPage;
