import {
    ArrowRight,
    GitBranch,
    Layers3,
    Network,
    Rows3
} from "lucide-react";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const structures = [
        {
            icon: GitBranch,
            title: "Listas Encadeadas",
            description:
                "Nós, referências, listas simples e duplamente encadeadas.",
            className: "linkedLists",
            path: "/listas",
            available: true
        },
        {
            icon: Layers3,
            title: "Pilhas",
            description:
                "Entenda LIFO, topo, push, pop e peek de forma visual.",
            className: "stack",
            available: false
        },
        {
            icon: Rows3,
            title: "Filas",
            description:
                "Visualize FIFO, início, fim, enqueue e dequeue.",
            className: "queue",
            available: false
        },
        {
            icon: Network,
            title: "Árvores",
            description:
                "Explore raízes, filhos, folhas e percursos em árvores.",
            className: "tree",
            available: false
        }
    ];

    function handleStructure(structure) {
        if (!structure.available) {
            return;
        }

        navigate(structure.path);
    }

    return (
        <main className="home">
            <section className="hero">
                <motion.span
                    className="heroBadge"
                    initial={{
                        opacity: 0,
                        y: -10
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >
                    Estruturas de Dados • Java
                </motion.span>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 15
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.1
                    }}
                >
                    Data Structures
                    <span> Lab</span>
                </motion.h1>

                <motion.p
                    className="heroDescription"
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.2
                    }}
                >
                    Aprenda Estruturas de Dados visualmente através
                    de teoria, simulações e código Java interativo.
                </motion.p>

                <motion.div
                    className="sectionHeading"
                    initial={{
                        opacity: 0,
                        y: 15
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                    transition={{
                        delay: 0.25
                    }}
                >
                    <span className="sectionLabel">
                        Explore os módulos
                    </span>

                    <div>
                        <strong>
                            Escolha uma estrutura para começar
                        </strong>

                        <p>
                            Revise conceitos, visualize operações e acompanhe
                            a implementação em Java passo a passo.
                        </p>
                    </div>
                </motion.div>

                <section className="structures">
                    {structures.map((structure, index) => {
                        const Icon = structure.icon;

                        return (
                            <motion.button
                                key={structure.title}
                                type="button"
                                className={`
                                    structureCard
                                    ${structure.className}
                                    ${!structure.available ? "unavailable" : ""}
                                `}
                                onClick={() => handleStructure(structure)}
                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: 0.3 + index * 0.08
                                }}
                                whileHover={
                                    structure.available
                                        ? {
                                            y: -5,
                                            scale: 1.01
                                        }
                                        : {}
                                }
                                whileTap={
                                    structure.available
                                        ? {
                                            scale: 0.98
                                        }
                                        : {}
                                }
                            >
                                <div className="structureCardTop">
                                    <span className="structureIcon">
                                        <Icon
                                            size={28}
                                            strokeWidth={2}
                                        />
                                    </span>
                                </div>

                                <div className="structureContent">
                                    <strong>
                                        {structure.title}
                                    </strong>

                                    <p>
                                        {structure.description}
                                    </p>
                                </div>

                                {!structure.available && (
                                    <span className="comingSoon">
                                        Em construção
                                    </span>
                                )}

                                {structure.available && (
                                    <span className="structureArrow">
                                        <ArrowRight
                                            size={20}
                                            strokeWidth={2.3}
                                        />
                                    </span>
                                )}
                            </motion.button>
                        );
                    })}
                </section>

                <footer className="homeFooter">
                    <span>
                        Material de apoio à monitoria
                    </span>

                    <span>•</span>

                    <span>
                        Java
                    </span>

                    <span>•</span>

                    <span>
                        Estruturas de Dados
                    </span>
                </footer>
            </section>
        </main>
    );
}

export default Home;