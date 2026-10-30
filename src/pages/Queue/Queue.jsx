import StructureHub from "../../components/structures/StructureHub";

function Queue() {
    return (
        <StructureHub
            moduleNumber="03"
            titleBase="Estrutura de"
            titleAccent="Filas"
            description="Entenda a regra FIFO e o gerenciamento circular das referências início e fim no vetor."
            variant="queue"
            basePath="/filas"
        />
    );
}

export default Queue;
