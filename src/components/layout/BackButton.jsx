import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./BackButton.css";

function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            className="backButton"
            onClick={() => navigate(-1)}
            aria-label="Voltar para a página anterior"
        >
            <ArrowLeft
                size={19}
                strokeWidth={2.3}
            />

            <span>Voltar</span>
        </button>
    );
}

export default BackButton;
