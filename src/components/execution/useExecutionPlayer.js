import { useEffect, useState } from 'react';
import useExecutionSpeed from './useExecutionSpeed';
import { createExecutionClock } from './executionClock';
// Timers are cancelled on navigation, reset, pause, and scenario changes.
export default function useExecutionPlayer() {
    const stepDelay = useExecutionSpeed();
    const [frames, setFrames] = useState([]);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    useEffect(() => {
        if (!playing) return;
        const clock = createExecutionClock({ getDelay: () => stepDelay });
        clock.wait().then(completed => {
            if (!completed) return;
            if (index < frames.length - 1) {
                setIndex(index + 1);
                if (index + 1 === frames.length - 1) setPlaying(false);
            } else setPlaying(false);
        });
        return clock.cancel;
    }, [playing, index, frames.length, stepDelay]);
    return {
        frames, index, playing, frame: frames[index],
        load(next, autoplay = false, start = 0) { setFrames(next); setIndex(start); setPlaying(autoplay); },
        seek(next) { setPlaying(false); setIndex(Math.max(0, Math.min(next, Math.max(0, frames.length - 1)))); },
        toggle() { if (!frames.length) return; if (index === frames.length - 1) setIndex(0); setPlaying(!playing); },
        clear() { setFrames([]); setIndex(0); setPlaying(false); }
    };
}
