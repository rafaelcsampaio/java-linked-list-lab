import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {
    const navigate = useNavigate();

    const topics = [
        {
            icon: "📚",
            title: "Aprender",
            description: "Revise conceitos, nós, referências e diferenças entre as listas.",
            className: "theory",
            path: "/teoria"
        },
        {
            icon: "🧩",
            title: "Visualizar",
            description: "Execute operações e veja a estrutura mudar passo a passo.",
            className: "simulator",
            path: "/simulador"
        },
        {
            icon: "💻",
            title: "Entender o código",
            description: "Explore o Java e veja o efeito de cada linha na lista.",
            className: "code",
            path: "/codigo"
        },
        {
            icon: "✨",
            title: "Bônus: <T>",
            description: "Entenda Generics e por que nossas listas utilizam tipos genéricos.",
            className: "bonus",
            path: "/generics"
        }
    ];

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
                    Estrutura de Dados
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
                    Listas
                    <span> Encadeadas</span>
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
                    Revise listas simplesmente e duplamente encadeadas
                    através de teoria visual, simulações e código Java interativo.
                </motion.p>

                <section className="topics">
                    {topics.map((topic, index) => (
                        <motion.button
                            key={topic.title}
                            className={`topicCard ${topic.className}`}
                            onClick={() => navigate(topic.path)}
                            initial={{
                                opacity: 0,
                                y: 25
                            }}
                            animate={{
                                opacity: 1,
                                y: 0
                            }}
                            transition={{
                                delay: 0.25 + index * 0.08
                            }}
                            whileHover={{
                                y: -6,
                                scale: 1.015
                            }}
                            whileTap={{
                                scale: 0.98
                            }}
                        >
                            <span className="topicIcon">
                                {topic.icon}
                            </span>

                            <div>
                                <strong>
                                    {topic.title}
                                </strong>

                                <p>
                                    {topic.description}
                                </p>
                            </div>

                            <span className="arrow">
                                →
                            </span>
                        </motion.button>
                    ))}
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
                        Listas encadeadas
                    </span>
                </footer>
            </section>
        </main>
    );
}

export default Home;