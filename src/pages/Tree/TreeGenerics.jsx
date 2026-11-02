import StructureGenericsPage from "../../components/structures/StructureGenericsPage";

function TreeGenerics() {
    return (
        <StructureGenericsPage
            variant="tree"
            title={<>Generics em <span className="moduleTitleAccent">Árvores</span></>}
            description="Generalize os nós e, quando a árvore for ordenada, preserve também uma regra de comparação entre os valores."
            structureName="ArvoreBusca"
            fixedTypeName="ArvoreInteger"
            genericTypeName="ArvoreBusca<T>"
            declaration={`ArvoreBusca<{{TYPE}}> arvore\n    = new ArvoreBusca<>();\narvore.inserir({{SAMPLE}});`}
            typeFlow={[
                { title: "Árvore", code: "ArvoreBusca<Integer>" },
                { title: "Nó", code: "No<Integer>" },
                { title: "Comparação", code: "compareTo(...)" }
            ]}
            coreCode={{
                fixed: `class ArvoreInteger {\n    NoInteger raiz;\n\n    void inserir(Integer valor) { ... }\n}`,
                duplicate: `class ArvoreString {\n    NoString raiz;\n\n    void inserir(String valor) { ... }\n}`,
                generic: `class ArvoreBusca<\n    T extends Comparable<T>\n> {\n    No<T> raiz;\n\n    void inserir(T valor) { ... }\n}\n\nclass No<T> {\n    T valor;\n    No<T> esquerda, direita;\n}`
            }}
            notes={[
                "Generics permitem reaproveitar a estrutura; a regra de comparação precisa acompanhar o tipo escolhido.",
                "Uma BST genérica precisa saber comparar T; uma opção é T extends Comparable<T>.",
                "No<T> mantém o mesmo tipo nos filhos esquerdo e direito.",
                "A regra de percurso não muda quando o tipo armazenado muda."
            ]}
            previewMode="tree"
        />
    );
}

export default TreeGenerics;
