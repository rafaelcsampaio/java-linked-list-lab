import { useCallback, useRef, useState } from "react";

export const executionSpeeds = [0.25, 0.5, 1, 1.5, 2];

const storageKey = "linkedListLabExecutionSpeed";

function getInitialSpeed() {
    try {
        const savedSpeed = Number(window.localStorage.getItem(storageKey));

        return executionSpeeds.includes(savedSpeed)
            ? savedSpeed
            : 0.5;
    } catch {
        return 0.5;
    }
}

export default function useExecutionSpeed() {
    const [speed, setSpeed] = useState(getInitialSpeed);
    const speedRef = useRef(speed);

    const changeSpeed = useCallback((nextSpeed) => {
        if (!executionSpeeds.includes(nextSpeed)) {
            return;
        }

        speedRef.current = nextSpeed;
        setSpeed(nextSpeed);

        try {
            window.localStorage.setItem(storageKey, String(nextSpeed));
        } catch {
            // A preferência continua funcionando na sessão atual.
        }
    }, []);

    const waitForExecution = useCallback(async (baseDuration) => {
        let elapsed = 0;
        let lastTime = performance.now();

        while (elapsed < baseDuration) {
            await new Promise((resolve) => window.setTimeout(resolve, 50));

            const now = performance.now();

            // Consultar o ref permite ajustar a velocidade mesmo durante a espera.
            elapsed += (now - lastTime) * speedRef.current;
            lastTime = now;
        }
    }, []);

    return {
        speed,
        changeSpeed,
        waitForExecution
    };
}
