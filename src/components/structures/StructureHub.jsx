import {
    ArrowRight,
    BookOpen,
    Braces,
    Code2,
    Play
} from "lucide-react";

import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import BackButton from "../layout/BackButton";


import "../../pages/LinkedLists/LinkedLists.css";
import "./ModuleVisuals.css";

function StructureHub({
    moduleNumber,
    titleBase,
    titleAccent,
    description,
    variant,
    basePath
}) {
    const navigate = useNavigate();

    const topics = [
        {
            icon: BookOpen,
            title: "Aprender",
            description: "Revise os conceitos e acompanhe as ideias na mesma ordem usada em aula.",
            className: "theory",
            path: `${basePath}/teoria`
        },
        {
            icon: Play,
            title: "Visualizar",
            description: "Execute operações e acompanhe a estrutura mudando passo a passo.",
            className: "simulator",
            path: `${basePath}/simulador`
        },
        {
            icon: Code2,
            title: "Entender o código",
            description: "Explore a implementação em Java e relacione cada linha ao estado da estrutura.",
            className: "code",
            path: `${basePath}/codigo`
        },
        {
            icon: Braces,
            title: "Generics <T>",
            description: "Veja como aplicar tipos genéricos diretamente nesta estrutura e nos exercícios.",
            className: "bonus",
            path: `${basePath}/generics`
        }
    ];

    return (
        <main className={`linkedListsPage moduleHub moduleHub--${variant}`}>
            <BackButton />

            <section className="linkedListsContainer">
                <motion.div
                    className="linkedListsHeader"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className="moduleBadge moduleBadgeSoft">
                        Módulo {moduleNumber}
                    </span>

                    <h1>
                        {titleBase}
                        <span className="moduleTitleAccent"> {titleAccent}</span>
                    </h1>

                    <p>{description}</p>
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
                                initial={{ opacity: 0, y: 22 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + index * 0.07 }}
                                whileHover={{ y: -5, scale: 1.012 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="linkedTopicIcon">
                                    <Icon size={29} strokeWidth={2} />
                                </span>

                                <div>
                                    <strong>{topic.title}</strong>
                                    <p>{topic.description}</p>
                                </div>

                                <span className="linkedTopicArrow">
                                    <ArrowRight size={20} strokeWidth={2.3} />
                                </span>
                            </motion.button>
                        );
                    })}
                </section>
            </section>
        </main>
    );
}

export default StructureHub;
