import StructurePreview from "../../components/structures/StructurePreview";
import StructureWalkthrough from "../../components/structures/StructureWalkthrough";
import { useState } from "react";
import {
    CircleDot,
    Split,
    Waypoints
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";

import "../Theory/Theory.css";
import "../../components/linkedList/LinkedListVisualizer.css";
import "../../components/structures/ModuleVisuals.css";

const concepts = {
    subarvore: { title: "subárvore", description: "Um nó e todos os seus descendentes formam uma árvore. Uma floresta é um conjunto de árvores disjuntas." },
    raiz: {
        title: "raiz",
        description: "É o nó principal da árvore. No material da professora, a raiz está no nível 0."
    },
    grau: {
        title: "grau",
        description: "Indica o número de subárvores diretamente ligadas a um nó. Uma folha possui grau 0."
    },
    nivel: {
        title: "nível",
        description: "É o número de ligações existentes no caminho da raiz até o nó."
    },
    altura: {
        title: "altura",
        description: "É o nível mais alto existente na árvore. Se as folhas mais profundas estão no nível 2, a altura é 2."
    },
    folha: {
        title: "folha",
        description: "É um nó terminal: não possui subárvores/filhos e, portanto, possui grau 0."
    }
};

const traversals = {
    pre: {
        title: "Pré-fixado (pré-ordem)",
        path: "raiz → esquerda → direita",
        steps: ["Visite a raiz.", "Percorra a subárvore esquerda.", "Percorra a subárvore direita."]
    },
    in: {
        title: "Em ordem / in-fixado",
        path: "esquerda → raiz → direita",
        steps: ["Percorra a subárvore esquerda.", "Visite a raiz.", "Percorra a subárvore direita."]
    },
    post: {
        title: "Pós-fixado (pós-ordem)",
        path: "esquerda → direita → raiz",
        steps: ["Percorra a subárvore esquerda.", "Percorra a subárvore direita.", "Visite a raiz."]
    }
};

function TreeDiagram() {
    const root = { value: "A", children: [
        { value: "B", children: [{ value: "D", children: [] }, { value: "E", children: [] }] },
        { value: "C", children: [{ value: "F", children: [] }, { value: "G", children: [] }, { value: "H", children: [] }] }
    ] };
    return <StructurePreview mode="tree" state={{ root }} />;
}
function BinaryTreeDiagram() {
    return <StructurePreview mode="tree" values={[8, 4, 12]} />;
}

function TreeTheory() {
    const [concept, setConcept] = useState("raiz");
    const [traversal, setTraversal] = useState("pre");

    const selectedConcept = concepts[concept];
    const selectedTraversal = traversals[traversal];

    return (
        <main className="theoryPage moduleTheoryPage moduleTheoryPage--tree">
            <BackButton />

            <header className="theoryHeader">
                <span className="theoryBadge moduleBadgeSoft">Teoria visual • Árvores</span>
                <h1>
                    Árvores: <span className="moduleTitleAccent">hierarquia, nível e caminhamentos</span>
                </h1>
                <p>
                    A sequência acompanha o material da disciplina: conceitos gerais, árvore binária, ordenação, recursividade, percursos, pesquisa e remoção.
                </p>
            </header>

            <div className="theoryContent">
                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">01</span>
                        <div>
                            <span className="sectionEyebrow">Estrutura</span>
                            <h2>Uma árvore organiza relações hierárquicas</h2>
                            <p>
                                Uma árvore é uma estrutura não linear: um nó pode levar a várias subárvores. Existe um nó principal chamado raiz.
                            </p>
                        </div>
                    </div>

                    <div className="theoryDiagram">
                        <TreeDiagram />
                    </div>

                    <div className="conceptExplorer">
                        <div className="conceptButtons">
                            {Object.keys(concepts).map((key) => (
                                <button
                                    type="button"
                                    key={key}
                                    className={concept === key ? "selected" : ""}
                                    onClick={() => setConcept(key)}
                                >
                                    <CircleDot size={13} />
                                    {key}
                                </button>
                            ))}
                        </div>

                        <div className="conceptExplanation">
                            <strong>{selectedConcept.title}</strong>
                            <p>{selectedConcept.description}</p>
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">02</span>
                        <div>
                            <span className="sectionEyebrow">Anatomia</span>
                            <h2>Grau, nível, altura, folha e floresta</h2>
                            <p>Esses termos aparecem antes da implementação e ajudam a descrever qualquer árvore.</p>
                        </div>
                    </div>

                    <div className="nodeExplanationCard moduleTheoryFacts">
                        <div>
                            <span className="miniTag">grau</span>
                            <strong>Número de subárvores</strong>
                            <p>Na árvore A-B-C, se A possui B e C como filhos, o grau de A é 2.</p>
                        </div>
                        <div>
                            <span className="miniTag">nível</span>
                            <strong>Raiz = nível 0</strong>
                            <p>Cada ligação percorrida para baixo aumenta o nível em uma unidade.</p>
                        </div>
                        <div>
                            <span className="miniTag">altura</span>
                            <strong>Maior nível existente</strong>
                            <p>Se a folha mais profunda está no nível 2, a árvore tem altura 2.</p>
                        </div>
                        <div>
                            <span className="miniTag">floresta</span>
                            <strong>Árvores após retirar a raiz</strong>
                            <p>As subárvores restantes formam uma floresta.</p>
                        </div>
                    </div>

                    <aside className="theoryTip">
                        <span>💡</span>
                        <p><strong>Folha:</strong> todo nó sem filhos/subárvores possui grau 0 e é chamado de nó terminal.</p>
                    </aside>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">03</span>
                        <div>
                            <span className="sectionEyebrow">Árvore binária</span>
                            <h2>Da árvore ordenada à árvore binária</h2>
                            <p>Em uma árvore ordenada, a ordem dos filhos importa. Isso não implica valores em ordem numérica. Uma árvore binária distingue no máximo dois filhos: esquerdo e direito; apenas a BST acrescenta a regra de comparação dos valores.</p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="modulePreviewShell">
                            <BinaryTreeDiagram />
                        </div>

                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">grau máximo</span>
                                <strong>2</strong>
                                <p>Cada nó possui no máximo dois filhos.</p>
                            </div>
                            <div>
                                <span className="miniTag">nível k</span>
                                <strong>máximo de 2^k nós</strong>
                                <p>O número máximo de nós dobra a cada nível.</p>
                            </div>
                            <div>
                                <span className="miniTag">altura k</span>
                                <strong>máximo de 2^(k+1) - 1 nós</strong>
                                <p>Esse máximo é atingido quando todos os níveis estão preenchidos (árvore perfeita).</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">04</span>
                        <div>
                            <span className="sectionEyebrow">Ordenação</span>
                            <h2>Na BST, cada comparação escolhe um ramo</h2>
                            <p>
                                Para chaves ordenadas, valores menores seguem para a esquerda e valores maiores seguem para a direita.
                            </p>
                        </div>
                    </div>

                    <div className="traversalGrid">
                        <div className="traversalExplanation">
                            <div className="traversalIcon"><Split size={24} /></div>
                            <h3>Regra da busca binária</h3>
                            <p>Compare o valor com o nó atual e descarte o ramo que não pode conter a resposta.</p>
                            <div className="traversalPath">menor ← nó → maior</div>
                        </div>

                        <div className="traversalCode">
                            <div className="codeCardHeader">Regra conceitual</div>
                            <pre><code>{`if (valor < atual.valor) {
    atual = atual.esquerdo;
} else if (valor > atual.valor) {
    atual = atual.direito;
}`}</code></pre>
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">05</span>
                        <div>
                            <span className="sectionEyebrow">Caminhamentos</span>
                            <h2>A posição da visita muda a ordem do resultado</h2>
                            <p>Recursividade é chamar o mesmo método sobre uma subárvore menor. Ao chegar a null, a chamada retorna (caso base). A pilha de chamadas guarda onde continuar. Nos três percursos abaixo, muda apenas o momento de visitar a raiz.</p>
                        </div>
                    </div>

                    <div className="operationSelector">
                        <button type="button" className={traversal === "pre" ? "selected" : ""} onClick={() => setTraversal("pre")}>
                            <span className="operationIcon"><Waypoints size={19} /></span>
                            <span><strong>Pré-ordem</strong><small>raiz primeiro</small></span>
                        </button>
                        <button type="button" className={traversal === "in" ? "selected" : ""} onClick={() => setTraversal("in")}>
                            <span className="operationIcon"><Waypoints size={19} /></span>
                            <span><strong>Em ordem</strong><small>raiz no meio</small></span>
                        </button>
                        <button type="button" className={traversal === "post" ? "selected" : ""} onClick={() => setTraversal("post")}>
                            <span className="operationIcon"><Waypoints size={19} /></span>
                            <span><strong>Pós-ordem</strong><small>raiz por último</small></span>
                        </button>
                    </div>

                    <div className="operationDetail">
                        <div className="operationDetailHeader">
                            <div>
                                <span>Ordem de visita</span>
                                <h3>{selectedTraversal.title}</h3>
                            </div>
                        </div>

                        <div className="operationSteps">
                            {selectedTraversal.steps.map((step, index) => (
                                <div className="operationStep" key={step}>
                                    <span>{index + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>

                        <div className="traversalPath" style={{ marginTop: "18px" }}>
                            {selectedTraversal.path}
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">06</span>
                        <div>
                            <span className="sectionEyebrow">Recursividade e pesquisa</span>
                            <h2>Cada chamada resolve uma subárvore menor</h2>
                            <p>O material relaciona caminhamentos e pesquisa com funções recursivas.</p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="nodeCodeCard">
                            <div className="codeCardHeader">pesquisa.java</div>
                            <pre><code>{`public boolean pesquisa(No atual, String procurado) {
    if (atual != null) {
        if (procurado.equals(atual.getNome()))
            return true;

        if (pesquisa(atual.getFilhoEsq(), procurado))
            return true;

        if (pesquisa(atual.getFilhoDir(), procurado))
            return true;
    }
    return false;
}`}</code></pre>
                        </div>

                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">caso base</span>
                                <strong>atual == null</strong>
                                <p>O ramo terminou e a chamada pode retornar.</p>
                            </div>
                            <div>
                                <span className="miniTag">recursão</span>
                                <strong>chamar o mesmo método</strong>
                                <p>A função delega a pesquisa às subárvores esquerda e direita.</p>
                            </div>
                            <div>
                                <span className="miniTag">pilha</span>
                                <strong>retorno das chamadas</strong>
                                <p>A própria pilha de execução controla onde cada chamada deve continuar.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">07</span>
                        <div>
                            <span className="sectionEyebrow">Remoção</span>
                            <h2>Antes de remover, descubra quantos filhos o nó possui</h2>
                            <p>O reencadeamento depende do formato local da árvore.</p>
                        </div>
                    </div>

                    <div className="moduleTheoryFacts">
                        <div className="moduleTheoryFact">
                            <span className="miniTag">caso 1</span>
                            <strong>Nó folha</strong>
                            <p>O pai passa a apontar para uma subárvore vazia.</p>
                        </div>
                        <div className="moduleTheoryFact">
                            <span className="miniTag">caso 2</span>
                            <strong>Um filho</strong>
                            <p>O pai passa a apontar diretamente para o único filho do nó removido.</p>
                        </div>
                        <div className="moduleTheoryFact">
                            <span className="miniTag">caso 3</span>
                            <strong>Dois filhos</strong>
                            <p>Copie o menor valor da subárvore direita (sucessor). Depois remova o nó original desse sucessor; ele terá no máximo um filho.</p>
                        </div>
                    </div>
                </section>

                
                <StructureWalkthrough variant="tree" number="08" />
                <section className="examSection">
                    <div className="examTitle">
                        <span>🧠</span>
                        <div>
                            <span className="sectionEyebrow">Revisão prática</span>
                            <h2>O que você precisa conseguir desenhar e codificar</h2>
                        </div>
                    </div>

                    <div className="examNotes">
                        {[
                            "Identificar raiz, folha, grau, nível e altura.",
                            "Diferenciar árvore geral, árvore binária e BST.",
                            "Aplicar a regra menor à esquerda e maior à direita.",
                            "Executar pré-ordem, em ordem e pós-ordem manualmente.",
                            "Entender o caso base de uma função recursiva.",
                            "Separar os três casos de remoção de nós."
                        ].map((note, index) => (
                            <div className="examNote" key={note}>
                                <span>{index + 1}</span>
                                <p>{note}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default TreeTheory;
