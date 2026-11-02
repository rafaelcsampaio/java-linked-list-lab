import StructureGenericsPage from "../../components/structures/StructureGenericsPage";

function QueueGenerics() {
    return (
        <StructureGenericsPage
            variant="queue"
            title={<>Generics em <span className="moduleTitleAccent">Filas</span></>}
            description="T controla o tipo dos dados; inicio, fim e tamanho continuam controlando o gerenciamento circular."
            structureName="FilaEstatica"
            fixedTypeName="FilaString"
            genericTypeName="FilaEstatica<T>"
            declaration={`FilaEstatica<{{TYPE}}> fila\n    = new FilaEstatica<>(7);\nfila.inserir({{SAMPLE}});`}
            typeFlow={[
                { title: "Fila", code: "FilaEstatica<String>" },
                { title: "Vetor", code: "String[] elementos" },
                { title: "Operação", code: "inserir(String elem)" }
            ]}
            coreCode={{
                fixed: `class FilaString {\n    String[] elementos;\n    int inicio, fim, tamanho;\n\n    void inserir(String elem) { ... }\n}`,
                duplicate: `class FilaInteger {\n    Integer[] elementos;\n    int inicio, fim, tamanho;\n\n    void inserir(Integer elem) { ... }\n}`,
                generic: `class FilaEstatica<T> {\n    T[] elementos;\n    int inicio, fim, tamanho;\n\n    void inserir(T elem) { ... }\n    T getInicio() { ... }\n}`
            }}
            notes={[
                "T altera o tipo armazenado, mas não altera as fórmulas circulares de inicio e fim.",
                "inserir recebe T e getInicio/getFim retornam T.",
                "O mesmo código circular pode trabalhar com String, Integer, Aluno ou outros objetos.",
                "A estrutura continua FIFO independentemente do tipo escolhido."
            ]}
            previewMode="queue"
        />
    );
}

export default QueueGenerics;
