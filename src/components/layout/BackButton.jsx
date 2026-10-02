import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./BackButton.css";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            className="backButton"
            onClick={() => navigate("/")}
            aria-label="Voltar para o início"
        >
            <ArrowLeft
                size={19}
                strokeWidth={2.3}
            />

            <span>Início</span>
        </button>
    );
}

export default BackButton;