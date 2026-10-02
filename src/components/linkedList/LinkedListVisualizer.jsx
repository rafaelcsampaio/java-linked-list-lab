import { AnimatePresence, motion } from "motion/react";
import {
    ArrowLeft,
    ArrowLeftRight,
    ArrowRight
} from "lucide-react";

import "./LinkedListVisualizer.css";

const tones = [
    "yellow",
    "green",
    "blue",
    "pink",
    "purple"
];

function LinkedListVisualizer({
    values,
    listType = "simple",
    activeIndexes = [],
    newIndex = null
}) {
    const isDouble = listType === "double";

    if (values.length === 0) {
        return (
            <div className="linkedListEmpty">
                <div className="emptyListPointer">
                    inicio
                    <span>↓</span>
                </div>

                <span className="emptyNull">
                    null
                </span>

                <p>
                    A lista está vazia.
                </p>
            </div>
        );
    }

    return (
        <div className="linkedListVisualizer">
            <div className="linkedListFlow">
                {isDouble && (
                    <>
                        <span className="visualNull">
                            null
                        </span>

                        <ArrowLeft
                            className="edgeArrow"
                            size={42}
                            strokeWidth={2}
                        />
                    </>
                )}

                <AnimatePresence initial={false}>
                    {values.map((value, index) => {
                        const isFirst = index === 0;
                        const isLast = index === values.length - 1;
                        const isOnly = values.length === 1;

                        const isActive =
                            activeIndexes.includes(index);

                        const isNew =
                            newIndex === index;

                        return (
                            <motion.div
                                layout
                                key={`${value}-${index}`}
                                className="visualListItem"
                                initial={{
                                    opacity: 0,
                                    scale: 0.8,
                                    y: 12
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.75,
                                    y: 20
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 270,
                                    damping: 22
                                }}
                            >
                                <div className="visualNodeWrapper">
                                    {(isFirst || isLast) && (
                                        <div
                                            className={`visualPointerLabels ${
                                                isOnly
                                                    ? "both"
                                                    : ""
                                            }`}
                                        >
                                            {isFirst && (
                                                <span>
                                                    inicio
                                                    <small>↓</small>
                                                </span>
                                            )}

                                            {isLast && (
                                                <span>
                                                    fim
                                                    <small>↓</small>
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    <motion.div
                                        className={`visualNode ${
                                            tones[index % tones.length]
                                        } ${
                                            isActive
                                                ? "active"
                                                : ""
                                        } ${
                                            isNew
                                                ? "new"
                                                : ""
                                        } ${
                                            isDouble
                                                ? "double"
                                                : ""
                                        }`}
                                        animate={
                                            isActive
                                                ? {
                                                    y: -4
                                                }
                                                : {
                                                    y: 0
                                                }
                                        }
                                    >
                                        {isDouble && (
                                            <span className="visualReference left" />
                                        )}

                                        <strong>
                                            {value}
                                        </strong>

                                        <span className="visualReference right" />
                                    </motion.div>

                                    <span className="visualPosition">
                                        posição {index}
                                    </span>
                                </div>

                                {!isLast && (
                                    <div className="nodeConnection">
                                        {isDouble ? (
                                            <ArrowLeftRight
                                                size={54}
                                                strokeWidth={2}
                                            />
                                        ) : (
                                            <ArrowRight
                                                size={54}
                                                strokeWidth={2}
                                            />
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                <ArrowRight
                    className="edgeArrow"
                    size={42}
                    strokeWidth={2}
                />

                <span className="visualNull">
                    null
                </span>
            </div>
        </div>
    );
}

export default LinkedListVisualizer;