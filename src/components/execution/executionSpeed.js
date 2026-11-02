const storageKey = 'data-structures-step-delay';
export const defaultStepDelay = 2000;
const listeners = new Set();

function normalize(value) {
    const number = Number(value);
    return Number.isFinite(number) && number >= 500 && number <= 6000
        ? Math.round(number / 500) * 500
        : defaultStepDelay;
}
function readSavedDelay() {
    try {
        return typeof window === 'undefined'
            ? defaultStepDelay
            : normalize(window.localStorage.getItem(storageKey));
    } catch {
        return defaultStepDelay;
    }
}
let delay = readSavedDelay();
export const getStepDelay = () => delay;
export const getServerStepDelay = () => defaultStepDelay;

function notify() {
    listeners.forEach(listener => listener());
}
function onStorage(event) {
    if (event.key !== storageKey && event.key !== null) return;
    delay = readSavedDelay();
    notify();
}
export function subscribeStepDelay(listener) {
    if (listeners.size === 0 && typeof window !== 'undefined') {
        window.addEventListener('storage', onStorage);
    }
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
        if (listeners.size === 0 && typeof window !== 'undefined') {
            window.removeEventListener('storage', onStorage);
        }
    };
}
export function setStepDelay(value) {
    delay = normalize(value);
    try {
        window.localStorage.setItem(storageKey, String(delay));
    } catch {
        // The control still works when browser storage is unavailable.
    }
    notify();
}
