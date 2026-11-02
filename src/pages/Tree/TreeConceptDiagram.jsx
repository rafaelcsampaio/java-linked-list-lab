import "./TreeConceptDiagram.css";

const levels = {
    0: ["A"],
    1: ["B", "C"],
    2: ["D", "E", "F", "G"],
    3: ["H", "I"]
};

const positions = {
    A: [260, 44],
    B: [160, 124],
    C: [360, 124],
    D: [110, 204],
    E: [210, 204],
    F: [310, 204],
    G: [410, 204],
    H: [75, 284],
    I: [145, 284]
};

const branches = [
    { id: "A-B", path: "M 246 62 L 174 106" },
    { id: "A-C", path: "M 274 62 L 346 106" },
    { id: "B-D", path: "M 149 144 L 122 182" },
    { id: "B-E", path: "M 171 144 L 198 182" },
    { id: "C-F", path: "M 349 144 L 322 182" },
    { id: "C-G", path: "M 371 144 L 398 182" },
    { id: "D-H", path: "M 101 226 L 93 260" },
    { id: "D-I", path: "M 119 226 L 127 260" }
];

const nodeTones = {
    A: "yellow",
    B: "green",
    C: "blue",
    D: "pink",
    E: "purple",
    F: "yellow",
    G: "green",
    H: "blue",
    I: "pink"
};

function highlightedNodes(concept, level) {
    if (concept === "raiz") return ["A"];
    if (concept === "subarvore") return ["B", "D", "E", "H", "I"];
    if (concept === "grau") return ["B", "D", "E"];
    if (concept === "nivel") return levels[level];
    if (concept === "altura") return ["A", "B", "D", "H", "I"];
    return ["E", "F", "G", "H", "I"];
}

function highlightedBranches(concept) {
    if (concept === "subarvore") return ["B-D", "B-E", "D-H", "D-I"];
    if (concept === "grau") return ["B-D", "B-E"];
    if (concept === "altura") return ["A-B", "B-D", "D-H", "D-I"];
    return [];
}

export default function TreeConceptDiagram({ concept, level }) {
    const activeNodes = new Set(highlightedNodes(concept, level));
    const activeBranches = new Set(highlightedBranches(concept));

    return (
        <div className="treeConceptViewport">
            <svg
                className="treeConceptSvg"
                viewBox="0 0 560 325"
                role="img"
                aria-labelledby="tree-concept-title tree-concept-description"
            >
                <title id="tree-concept-title">Árvore binária com os nós de A a I</title>
                <desc id="tree-concept-description">
                    A é a raiz. B e C estão no nível 1; D, E, F e G no nível 2; H e I no nível 3.
                    Os ramos e nós destacados correspondem ao conceito selecionado.
                </desc>

                {branches.map(({ id, path }) => (
                    <path
                        key={id}
                        d={path}
                        className={`treeConceptBranch ${activeBranches.has(id) ? "is-highlighted" : "is-muted"}`}
                    />
                ))}

                {[0, 1, 2, 3].map((itemLevel) => (
                    <text
                        key={itemLevel}
                        x="478"
                        y={positions[levels[itemLevel][0]][1] + 5}
                        className={`treeConceptLevelLabel ${concept === "nivel" && level === itemLevel ? "is-selected" : ""}`}
                    >
                        nível {itemLevel}
                    </text>
                ))}

                {Object.entries(positions).map(([value, [x, y]]) => (
                    <g
                        key={value}
                        className={`treeConceptNode treeConceptNode--${nodeTones[value]} ${activeNodes.has(value) ? "is-highlighted" : "is-muted"}`}
                    >
                        <rect x={x - 32} y={y - 24} width="64" height="48" rx="13" />
                        <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle">
                            {value}
                        </text>
                    </g>
                ))}

                {concept === "grau" && (
                    <g className="treeDegreeBadge" aria-hidden="true">
                        <rect x="200" y="111" width="68" height="26" rx="13" />
                        <text x="234" y="124" textAnchor="middle" dominantBaseline="middle">2 filhos</text>
                    </g>
                )}
            </svg>
        </div>
    );
}
