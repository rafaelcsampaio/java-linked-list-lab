import StructureWalkthrough from "../../components/structures/StructureWalkthrough";
import { useState } from "react";
import {
    CircleDot,
    Eye,
    Layers3,
    Plus,
    Trash2
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";
import StructurePreview from "../../components/structures/StructurePreview";

import "../Theory/Theory.css";
import "../../components/structures/ModuleVisuals.css";

const concepts = {
    topo: {
        title: "topo",
        description: "É o único ponto da pilha usado pelas operações principais. O último elemento inserido ocupa o topo."
    },
    lifo: {
        title: "LIFO",
        description: "Last In, First Out: o último elemento empilhado é o primeiro que poderá ser removido."
    },
    push: {
        title: "push",
        description: "Empilha um novo elemento. Depois da operação, o novo valor passa a ocupar o topo."
    },
    pop: {
        title: "pop",
        description: "Remove e normalmente retorna o elemento que está no topo."
    }
};

const operations = [
    {
        id: "push",
        icon: Plus,
        title: "push",
        subtitle: "Empilhar",
        steps: [
            "Verifique se há espaço na implementação estática.",
            "Avance a referência/índice de topo.",
            "Armazene o novo elemento na posição do topo.",
            "O novo elemento passa a ser o primeiro candidato a sair."
        ]
    },
    {
        id: "pop",
        icon: Trash2,
        title: "pop",
        subtitle: "Desempilhar",
        steps: [
            "Verifique se a pilha não está vazia.",
            "Leia o elemento que ocupa o topo.",
            "Faça topo recuar para o elemento anterior.",
            "Retorne o elemento removido."
        ]
    },
    {
        id: "peek",
        icon: Eye,
        title: "getTopo",
        subtitle: "Consultar",
        steps: [
            "Verifique se existe elemento na pilha.",
            "Acesse diretamente a posição ou referência topo.",
            "Retorne o elemento.",
            "A estrutura permanece inalterada."
        ]
    },
    {
        id: "state",
        icon: Layers3,
        title: "Estado",
        subtitle: "Vazia / cheia",
        steps: [
            "Na pilha estática, topo == -1 indica vazia.",
            "topo + 1 == elementos.length indica cheia.",
            "A quantidade de elementos é topo + 1.",
            "Na pilha encadeada, topo == null indica vazia."
        ]
    }
];

function StackTheory() {
    const [concept, setConcept] = useState("topo");
    const [operation, setOperation] = useState("push");

    const selectedConcept = concepts[concept];
    const selectedOperation = operations.find((item) => item.id === operation);

    return (
        <main className="theoryPage moduleTheoryPage moduleTheoryPage--stack">
            <BackButton />

            <header className="theoryHeader">
                <span className="theoryBadge moduleBadgeSoft">Teoria visual • Pilhas</span>
                <h1>
                    Pilha: <span className="moduleTitleAccent">LIFO e controle pelo topo</span>
                </h1>
                <p>
                    Acompanhe a mesma progressão da aula: conceito, operações, implementação estática e implementação encadeada.
                </p>
            </header>

            <div className="theoryContent">
                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">01</span>
                        <div>
                            <span className="sectionEyebrow">Estrutura</span>
                            <h2>O último que entra é o primeiro que sai</h2>
                            <p>
                                A pilha é uma estrutura linear. Inserção e retirada acontecem em um único ponto: o topo. Essa restrição é o que define a filosofia LIFO.
                            </p>
                        </div>
                    </div>

                    <div className="theoryDiagram">
                        <StructurePreview mode="stack" values={["Ana", "Bruno", "Carlos"]} />
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
                            <span className="sectionEyebrow">Modelo mental</span>
                            <h2>Pense em uma pilha de pratos</h2>
                            <p>
                                Um novo prato é colocado por cima. Para retirar um prato sem desmontar a pilha, retiramos também pelo topo.
                            </p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">entrada</span>
                                <strong>Inserir = empilhar</strong>
                                <p>O novo elemento é colocado acima de todos os anteriores.</p>
                            </div>
                            <div>
                                <span className="miniTag">saída</span>
                                <strong>Remover = desempilhar</strong>
                                <p>Somente o elemento do topo pode sair diretamente.</p>
                            </div>
                        </div>

                        <div className="traversalExplanation">
                            <div className="traversalIcon"><Layers3 size={24} /></div>
                            <h3>Regra que não muda</h3>
                            <p>
                                Seja em vetor ou em nós encadeados, push e pop continuam trabalhando na mesma extremidade lógica.
                            </p>
                            <div className="traversalPath">push ↑ topo ↓ pop</div>
                        </div>
                    </div>

                    <aside className="theoryTip">
                        <span>💡</span>
                        <p><strong>Dica:</strong> antes de codificar, desenhe qual elemento é o topo antes e depois da operação.</p>
                    </aside>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">03</span>
                        <div>
                            <span className="sectionEyebrow">Operações</span>
                            <h2>Quatro ideias controlam quase todo o código</h2>
                            <p>Selecione uma operação e acompanhe o raciocínio que deve aparecer na implementação.</p>
                        </div>
                    </div>

                    <div className="operationSelector">
                        {operations.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    type="button"
                                    key={item.id}
                                    className={operation === item.id ? "selected" : ""}
                                    onClick={() => setOperation(item.id)}
                                >
                                    <span className="operationIcon"><Icon size={19} /></span>
                                    <span>
                                        <strong>{item.title}</strong>
                                        <small>{item.subtitle}</small>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="operationDetail">
                        <div className="operationDetailHeader">
                            <div>
                                <span>Passo a passo</span>
                                <h3>{selectedOperation.title}</h3>
                            </div>
                        </div>

                        <div className="operationSteps">
                            {selectedOperation.steps.map((step, index) => (
                                <div className="operationStep" key={step}>
                                    <span>{index + 1}</span>
                                    <p>{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">04</span>
                        <div>
                            <span className="sectionEyebrow">Implementação estática</span>
                            <h2>Vetor + índice topo</h2>
                            <p>
                                Na pilha estática, topo indica o índice do último elemento válido. A pilha vazia começa com topo igual a -1.
                            </p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="nodeCodeCard">
                            <div className="codeCardHeader">PilhaEstatica.java</div>
                            <pre><code>{`public class PilhaInt {
    private int[] elementos;
    private int topo;

    public PilhaInt(int tamanho) {
        this.elementos = new int[tamanho];
        this.topo = -1;
    }
}`}</code></pre>
                        </div>

                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">vazia</span>
                                <strong>topo == -1</strong>
                                <p>Nenhum índice do vetor pertence logicamente à pilha.</p>
                            </div>
                            <div>
                                <span className="miniTag">cheia</span>
                                <strong>topo + 1 == elementos.length</strong>
                                <p>Não existe próxima posição para receber um novo elemento.</p>
                            </div>
                            <div>
                                <span className="miniTag">quantidade</span>
                                <strong>topo + 1</strong>
                                <p>Como o vetor começa no índice 0, topo 2 significa três elementos.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">05</span>
                        <div>
                            <span className="sectionEyebrow">Implementação encadeada</span>
                            <h2>O topo deixa de ser índice e vira referência</h2>
                            <p>
                                Cada nó guarda um elemento e o próximo. Empilhar significa colocar um novo nó antes do topo antigo.
                            </p>
                        </div>
                    </div>

                    <div className="theoryDiagram">
                        <StructurePreview
                            mode="queue"
                            values={["Carlos", "Bruno", "Ana"]}
                            labels={{ 0: "topo" }}
                        />
                        <span className="diagramNull">null</span>
                    </div>

                    <div className="nodeTheoryGrid" style={{ marginTop: "20px" }}>
                        <div className="nodeCodeCard">
                            <div className="codeCardHeader">PilhaEncadeada.java</div>
                            <pre><code>{`public void push(int elemento) {
    No novo = new No(elemento);
    novo.setProximo(this.topo);
    this.topo = novo;
}`}</code></pre>
                        </div>

                        <div className="connectionExplanation">
                            <span>O que acontece?</span>
                            <strong>Nenhum dado precisa ser deslocado</strong>
                            <p>
                                O novo nó aponta para o topo antigo e, em seguida, topo passa a referenciar o novo nó.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="theorySection"><div className="sectionHeading"><span className="sectionNumber">06</span><div><span className="sectionEyebrow">Percurso e comparação</span><h2>Do topo até a base, sem remover</h2><p>Na implementação encadeada, topo começa em null. A quantidade pode ser calculada por percurso; uma implementação também pode manter um contador.</p></div></div><div className="nodeTheoryGrid"><div className="nodeCodeCard"><div className="codeCardHeader">PilhaEncadeada.java • consulta e remoção</div><pre><code>{`boolean isVazia() {
    return topo == null;
}
int pop() {
    if (isVazia()) {
        throw new IllegalStateException("Vazia");
    }
    int valor = topo.elemento;
    topo = topo.proximo;
    return valor;
}
int quantidade() {
    int quantidade = 0;
    No atual = topo;
    while (atual != null) {
        quantidade++;
        atual = atual.proximo;
    }
    return quantidade;
}`}</code></pre></div><div className="nodeExplanationCard"><div><span className="miniTag">estática</span><strong>Vetor com limite fixo</strong><p>topo é um índice. Vazia: -1. Quantidade: topo + 1. isCheia verifica o limite do vetor.</p></div><div><span className="miniTag">encadeada</span><strong>Referências entre nós</strong><p>topo é uma referência. Vazia: null. Não há limite fixo de posições; novas alocações dependem da memória disponível.</p></div><div><span className="miniTag">percurso</span><strong>Uma referência auxiliar</strong><p>atual percorre os nós. topo não muda, portanto a pilha continua intacta.</p></div></div></div></section>
                <StructureWalkthrough variant="stack" number="07" />
                <section className="examSection">
                    <div className="examTitle">
                        <span>🧠</span>
                        <div>
                            <span className="sectionEyebrow">Revisão prática</span>
                            <h2>O que você precisa conseguir reproduzir</h2>
                        </div>
                    </div>

                    <div className="examNotes">
                        {[
                            "Explicar por que a pilha é LIFO.",
                            "Dizer o valor de topo em uma pilha vazia estática.",
                            "Implementar isVazia, isCheia e getQuantidade.",
                            "Entender a diferença entre ++topo e topo-- em push/pop.",
                            "Desenhar como topo muda na pilha encadeada.",
                            "Percorrer os nós do topo à base sem desempilhar."
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

export default StackTheory;
