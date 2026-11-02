import {
    ArrowRight,
    BookOpen,
    Braces,
    Code2,
    Play
} from "lucide-react";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/layout/BackButton";

import "./LinkedLists.css";

function LinkedLists() {
    const navigate = useNavigate();

    const topics = [
        {
            icon: BookOpen,
            title: "Aprender",
            description:
                "Revise conceitos, nós, referências e diferenças entre as listas.",
            className: "theory",
            path: "/teoria"
        },
        {
            icon: Play,
            title: "Visualizar",
            description:
                "Execute operações e veja a estrutura mudar passo a passo.",
            className: "simulator",
            path: "/simulador"
        },
        {
            icon: Code2,
            title: "Entender o código",
            description:
                "Explore o Java e veja o efeito de cada linha na lista.",
            className: "code",
            path: "/codigo"
        },
        {
            icon: Braces,
            title: "Generics <T>",
            description:
                "Entenda tipos genéricos e sua utilização nas estruturas.",
            className: "bonus",
            path: "/generics"
        }
    ];

    return (
        <main className="linkedListsPage">
            <BackButton />

            <section className="linkedListsContainer">
                <motion.div
                    className="linkedListsHeader"
                    initial={{
                        opacity: 0,
                        y: 15
                    }}
                    animate={{
                        opacity: 1,
                        y: 0
                    }}
                >
                    <span className="moduleBadge">
                        Módulo 01
                    </span>

                    <h1>
                        Listas
                        <span> Encadeadas</span>
                    </h1>

                    <p>
                        Entenda como nós e referências trabalham juntos
                        em listas simplesmente e duplamente encadeadas.
                    </p>
                </motion.div>

                <section className="linkedListsTopics">
                    {topics.map((topic, index) => {
                        const Icon = topic.icon;

                        return (
                            <motion.button
                                key={topic.title}
                                type="button"
                                className={`linkedTopicCard ${topic.className}`}
                                onClick={() => navigate(topic.path)}
                                initial={{
                                    opacity: 0,
                                    y: 22
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}
                                transition={{
                                    delay: 0.15 + index * 0.07
                                }}
                                whileHover={{
                                    y: -5,
                                    scale: 1.012
                                }}
                                whileTap={{
                                    scale: 0.98
                                }}
                            >
                                <span className="linkedTopicIcon">
                                    <Icon
                                        size={29}
                                        strokeWidth={2}
                                    />
                                </span>

                                <div>
                                    <strong>
                                        {topic.title}
                                    </strong>

                                    <p>
                                        {topic.description}
                                    </p>
                                </div>

                                <span className="linkedTopicArrow">
                                    <ArrowRight
                                        size={20}
                                        strokeWidth={2.3}
                                    />
                                </span>
                            </motion.button>
                        );
                    })}
                </section>
            </section>
        </main>
    );
}

export default LinkedLists;