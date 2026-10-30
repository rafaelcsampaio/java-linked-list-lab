// Resolve optional frame values now, so seeking never depends on playback history.
export function buildLinkedListFrames(scenario, resolveLine) {
    let values = [...scenario.initialValues];
    const result = [{
        values: [...values], activeIndexes: [], newIndex: null, line: null,
        explanation: 'Estado inicial. Reproduza ou avance para acompanhar o código.',
        variables: {}, condition: null
    }];
    for (const event of scenario.events) {
        const line = resolveLine(event);
        for (const frame of event.frames) {
            if (frame.values) values = [...frame.values];
            result.push({ ...structuredClone(frame), values: [...values],
                activeIndexes: [...(frame.activeIndexes ?? [])], newIndex: frame.newIndex ?? null, line });
        }
    }
    return result;
}
