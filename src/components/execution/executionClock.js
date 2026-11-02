// A cancellable, pausable wait for the existing async Listas executions.
export function createExecutionClock({ getDelay, schedule = setTimeout, unschedule = clearTimeout, now = () => performance.now() }) {
    let timer = null;
    let pending = null;
    let paused = false;
    let remaining = 0;
    let started = 0;

    function stopTimer() {
        if (timer !== null) unschedule(timer);
        timer = null;
    }
    function startTimer() {
        if (!pending || paused) return;
        started = now();
        timer = schedule(() => {
            timer = null;
            const resolve = pending;
            pending = null;
            resolve(true);
        }, remaining);
    }
    function cancel() {
        stopTimer();
        const resolve = pending;
        pending = null;
        paused = false;
        resolve?.(false);
    }
    return {
        wait() {
            // There is at most one step in flight for each execution.
            stopTimer();
            pending?.(false);
            remaining = getDelay();
            return new Promise(resolve => { pending = resolve; startTimer(); });
        },
        pause() {
            if (paused) return;
            if (timer !== null) remaining = Math.max(0, remaining - (now() - started));
            paused = true;
            stopTimer();
        },
        resume() { if (!paused) return; paused = false; startTimer(); },
        restartStep() {
            // Changing speed grants the current step the full new reading time.
            stopTimer();
            remaining = getDelay();
            startTimer();
        },
        cancel
    };
}
