import StructureWalkthrough from "../../components/structures/StructureWalkthrough";
import { useState } from "react";
import {
    CircleDot,
    Eye,
    Plus,
    RotateCw,
    Trash2
} from "lucide-react";

import BackButton from "../../components/layout/BackButton";
import StructurePreview from "../../components/structures/StructurePreview";

import "../Theory/Theory.css";
import "../../components/structures/ModuleVisuals.css";

const concepts = {
    inicio: {
        title: "inicio",
        description: "Indica o primeiro elemento da fila: é a posição de onde ocorre a próxima remoção."
    },
    fim: {
        title: "fim",
        description: "Na implementação circular da aula, aponta para a próxima posição disponível para inserção."
    },
    fifo: {
        title: "FIFO",
        description: "First In, First Out: quem entra primeiro é também quem sai primeiro."
    },
    circular: {
        title: "circular",
        description: "Ao ultrapassar o último índice do vetor, a referência volta ao início usando módulo (%)."
    }
};

const operations = [
    {
        id: "insert",
        icon: Plus,
        title: "Inserir",
        subtitle: "No final",
        steps: [
            "Verifique se a fila não está cheia.",
            "Grave o elemento na posição indicada por fim.",
            "Avance fim uma posição.",
            "Use % tamanho para voltar ao índice 0 quando necessário."
        ]
    },
    {
        id: "remove",
        icon: Trash2,
        title: "Remover",
        subtitle: "No início",
        steps: [
            "Verifique se a fila não está vazia.",
            "Leia o elemento indicado por inicio.",
            "Avance inicio uma posição.",
            "Use % tamanho para manter o gerenciamento circular."
        ]
    },
    {
        id: "peek",
        icon: Eye,
        title: "Acessar",
        subtitle: "Início / fim",
        steps: [
            "getInicio usa diretamente a posição inicio.",
            "O último elemento válido está imediatamente antes de fim.",
            "Se fim for 0, o último pode estar no final do vetor.",
            "Consultar não modifica a fila."
        ]
    },
    {
        id: "circular",
        icon: RotateCw,
        title: "Circular",
        subtitle: "Reaproveitar vetor",
        steps: [
            "inicio e fim caminham pelo vetor.",
            "Ao chegar no último índice, voltam ao índice 0.",
            "Não é necessário deslocar fisicamente todos os elementos.",
            "Uma posição livre diferencia cheia de vazia."
        ]
    }
];

function QueueTheory() {
    const [concept, setConcept] = useState("inicio");
    const [operation, setOperation] = useState("insert");

    const selectedConcept = concepts[concept];
    const selectedOperation = operations.find((item) => item.id === operation);

    return (
        <main className="theoryPage moduleTheoryPage moduleTheoryPage--queue">
            <BackButton />

            <header className="theoryHeader">
                <span className="theoryBadge moduleBadgeSoft">Teoria visual • Filas</span>
                <h1>
                    Fila: <span className="moduleTitleAccent">FIFO e gerenciamento circular</span>
                </h1>
                <p>
                    Da regra de entrada/saída até a solução circular usada no vetor: início, fim e módulo trabalham juntos.
                </p>
            </header>

            <div className="theoryContent">
                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">01</span>
                        <div>
                            <span className="sectionEyebrow">Estrutura</span>
                            <h2>Entra no fim, sai no início</h2>
                            <p>
                                A fila é uma estrutura linear com duas extremidades de responsabilidade diferente: inserção no final e remoção no início.
                            </p>
                        </div>
                    </div>

                    <div className="theoryDiagram">
                        <StructurePreview
                            mode="queue"
                            values={["Ana", "Bruno", "Carlos"]}
                            labels={{ 0: "inicio", 2: "fim" }}
                        />
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
                            <span className="sectionEyebrow">Aplicações</span>
                            <h2>Filas aparecem quando a ordem de chegada importa</h2>
                            <p>O material usa a analogia de atendimento e também cita aplicações de sistemas computacionais.</p>
                        </div>
                    </div>

                    <div className="nodeExplanationCard moduleTheoryFacts">
                        {[
                            ["Atendimento", "Quem chega primeiro fica mais próximo de ser atendido."],
                            ["Processos do SO", "Processos podem aguardar recursos em uma fila."],
                            ["Rede", "Pacotes podem aguardar transmissão em uma fila."],
                            ["Impressão", "Trabalhos enviados aguardam sua vez de impressão."]
                        ].map(([title, text]) => (
                            <div key={title}>
                                <span className="miniTag">FIFO</span>
                                <strong>{title}</strong>
                                <p>{text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">03</span>
                        <div>
                            <span className="sectionEyebrow">Operações</span>
                            <h2>Inicio e fim nunca fazem o mesmo trabalho</h2>
                            <p>Selecione uma operação para ver a sequência de decisões.</p>
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
                            <span className="sectionEyebrow">Fila estática</span>
                            <h2>Por que simplesmente deslocar os elementos é caro?</h2>
                            <p>
                                Se toda remoção do início mover todos os elementos restantes para a esquerda, o custo cresce conforme a fila aumenta.
                            </p>
                        </div>
                    </div>

                    <div className="modulePreviewShell">
                        <div className="moduleArrayVisual">
                            {["E1", "E2", "E3", "E4", "E5", "E6"].map((value, index) => (
                                <div className="moduleArrayCell" key={value}>
                                    {index === 0 && <span className="moduleArrayPointer">inicio<small>↓</small></span>}
                                    {index === 5 && <span className="moduleArrayPointer">fim<small>↓</small></span>}
                                    <div className={`visualNode ${["yellow", "green", "blue", "pink", "purple", "yellow"][index]}`}>
                                        <strong>{value}</strong>
                                    </div>
                                    <span className="moduleArrayIndex">{index}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="theoryTip">
                        <span>⚠️</span>
                        <p>
                            <strong>Problema:</strong> remover E1 e deslocar E2...E6 fisicamente é desnecessário. É melhor mover apenas a referência inicio.
                        </p>
                    </aside>
                </section>

                <section className="theorySection">
                    <div className="sectionHeading">
                        <span className="sectionNumber">05</span>
                        <div>
                            <span className="sectionEyebrow">Solução circular</span>
                            <h2>As referências percorrem o vetor e voltam ao começo</h2>
                            <p>
                                O módulo permite reaproveitar posições liberadas sem mover os dados. É a ideia central da fila circular trabalhada em aula.
                            </p>
                        </div>
                    </div>

                    <div className="nodeTheoryGrid">
                        <div className="nodeCodeCard">
                            <div className="codeCardHeader">FilaEstatica.java</div>
                            <pre><code>{`public boolean isVazia() {
    return this.inicio == this.fim;
}

public boolean isCheia() {
    return ((this.fim + 1) % this.tamanho)
        == this.inicio;
}`}</code></pre>
                        </div>

                        <div className="nodeExplanationCard">
                            <div>
                                <span className="miniTag">vazia</span>
                                <strong>inicio == fim</strong>
                                <p>As duas referências coincidem quando não há elemento aguardando.</p>
                            </div>
                            <div>
                                <span className="miniTag">cheia</span>
                                <strong>(fim + 1) % tamanho == inicio</strong>
                                <p>A próxima posição de fim alcançaria inicio; por isso a fila reserva uma célula.</p>
                            </div>
                        </div>
                    </div>

                    <div className="traversalGrid" style={{ marginTop: "20px" }}>
                        <div className="traversalExplanation">
                            <div className="traversalIcon"><RotateCw size={24} /></div>
                            <h3>Avançar circularmente</h3>
                            <p>O mesmo cálculo é usado para mover inicio ou fim.</p>
                            <div className="traversalPath">(indice + 1) % tamanho</div>
                        </div>

                        <div className="traversalCode">
                            <div className="codeCardHeader">Inserir / remover</div>
                            <pre><code>{`elementos[fim] = elem;
fim = (fim + 1) % tamanho;

int elem = elementos[inicio];
inicio = (inicio + 1) % tamanho;`}</code></pre>
                        </div>
                    </div>
                </section>

                <section className="theorySection"><div className="sectionHeading"><span className="sectionNumber">06</span><div><span className="sectionEyebrow">Consultar e percorrer</span><h2>Índices físicos, ordem lógica</h2><p>Na criação, inicio = 0 e fim = 0. Ao circular, inicio pode ser maior que fim. A ordem continua começando em inicio e terminando antes de fim.</p></div></div><div className="traversalGrid"><div className="traversalExplanation"><h3>Quantidade sem deslocamento</h3><p>(fim - inicio + tamanho) % tamanho calcula quantos elementos pertencem à fila. A capacidade útil é tamanho - 1.</p><div className="traversalPath">índices: 5 → 6 → 0 → 1</div><p>Com inicio = 5 e fim = 2, os quatro elementos ocupam 5, 6, 0 e 1. O próximo será inserido em 2.</p></div><div className="traversalCode"><div className="codeCardHeader">Busca sequencial na fila circular</div><pre><code>{`boolean buscar(int valor) {
    int i = inicio;
    while (i != fim) {
        if (elementos[i] == valor) {
            return true;
        }
        i = (i + 1) % tamanho;
    }
    return false;
}`}</code></pre></div></div><aside className="theoryTip"><span>💡</span><p>getInicio lê elementos[inicio]. getFim lê elementos[(fim - 1 + tamanho) % tamanho]. Antes de consultar, verifique isVazia.</p></aside></section>
                <StructureWalkthrough variant="queue" number="07" />
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
                            "Explicar por que fila é FIFO.",
                            "Diferenciar claramente inicio de fim.",
                            "Implementar isVazia e isCheia na fila circular.",
                            "Usar % tamanho ao avançar as referências.",
                            "Entender por que deslocar todo o vetor é oneroso.",
                            "Simular inserções e remoções desenhando os índices."
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

export default QueueTheory;
