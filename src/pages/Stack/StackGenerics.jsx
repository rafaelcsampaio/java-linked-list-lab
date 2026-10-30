import StructureGenericsPage from "../../components/structures/StructureGenericsPage";

function StackGenerics() {
    return (
        <StructureGenericsPage
            variant="stack"
            title={<>Generics em <span className="moduleTitleAccent">Pilhas</span></>}
            description="Aplique <T> às duas implementações trabalhadas em aula sem mudar a lógica LIFO."
            structureName="PilhaEstatica"
            fixedTypeName="PilhaString"
            genericTypeName="PilhaEstatica<T>"
            declaration={`PilhaEstatica<{{TYPE}}> pilha\n    = new PilhaEstatica<>(6);\npilha.push({{SAMPLE}});`}
            typeFlow={[
                { title: "Pilha", code: "PilhaEstatica<String>" },
                { title: "Vetor", code: "String[] elementos" },
                { title: "Operação", code: "push(String novo)" }
            ]}
            coreCode={{
                fixed: `class PilhaString {\n    String[] elementos;\n    int topo;\n\n    void push(String novo) { ... }\n}`,
                duplicate: `class PilhaInteger {\n    Integer[] elementos;\n    int topo;\n\n    void push(Integer novo) { ... }\n}`,
                generic: `class PilhaEstatica<T> {\n    T[] elementos;\n    int topo;\n\n    void push(T novo) { ... }\n    T pop() { ... }\n}`
            }}
            notes={[
                "T define o tipo armazenado; topo continua controlando a posição lógica da pilha.",
                "push recebe T e pop/getTopo retornam T.",
                "Na pilha encadeada, PilhaEncadeada<T> e No<T> precisam usar o mesmo tipo.",
                "Integer, Double e Boolean substituem os tipos primitivos em Generics."
            ]}
            previewMode="stack"
        />
    );
}

export default StackGenerics;
