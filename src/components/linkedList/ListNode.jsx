import { motion } from "motion/react";

import "./ListNode.css";

function ListNode({
    value,
    index,
    active = false,
    isNew = false,
    isHead = false,
    tone = "yellow"
}) {
    return (
        <motion.div
            className={`listNode ${active ? "active" : ""} ${isNew ? "newNode" : ""}`}
            layout
            initial={{
                opacity: 0,
                scale: 0.85,
                y: 12
            }}
            animate={{
                opacity: 1,
                scale: 1,
                y: 0
            }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
        >
            {isHead && (
                <div className="headPointer">
                    <strong>head</strong>
                    <span>↓</span>
                </div>
            )}

            <span className="nodeIndex">
                posição {index}
            </span>

            <div className={`nodeBody ${tone}`}>
                <span className="nodeValue">
                    {value}
                </span>

                <span className="referenceDot" />
            </div>
        </motion.div>
    );
}

export default ListNode;