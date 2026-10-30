import test from 'node:test';
import assert from 'node:assert/strict';
import { buildLinkedListFrames } from '../src/components/execution/buildLinkedListFrames.js';

test('seeking backwards restores full list snapshots, including sparse loop events', () => {
    const scenario = {
        initialValues: ['Ana', 'Bruno'],
        events: [
            { needle: 'insert', frames: [{ values: ['Ana', 'Bruno', 'Carlos'], newIndex: 2 }] },
            { needle: 'walk', frames: [
                { activeIndexes: [0], variables: { atual: 'Ana' } },
                { activeIndexes: [1], variables: { atual: 'Bruno' } },
                { activeIndexes: [2], variables: { atual: 'Carlos' } }
            ] },
            { needle: 'remove', frames: [{ values: ['Ana', 'Carlos'], activeIndexes: [0, 1] }] }
        ]
    };
    const original = structuredClone(scenario);
    const frames = buildLinkedListFrames(scenario, event => ({ insert: 4, walk: 8, remove: 12 })[event.needle]);
    assert.equal(frames.length, 6);
    assert.deepEqual(frames[5].values, ['Ana', 'Carlos']);
    assert.deepEqual(frames[3].values, ['Ana', 'Bruno', 'Carlos']);
    assert.deepEqual(frames[3].activeIndexes, [1]);
    assert.equal(frames[3].variables.atual, 'Bruno');
    assert.equal(frames[3].line, 8);
    assert.deepEqual(frames[0].values, ['Ana', 'Bruno']);
    assert.equal(frames[2].newIndex, null);
    frames[5].values.pop();
    frames[3].variables.atual = 'alterado';
    assert.deepEqual(frames[2].values, ['Ana', 'Bruno', 'Carlos']);
    assert.deepEqual(scenario, original);
});

test('empty and single-frame examples still have a stable starting point', () => {
    const frames = buildLinkedListFrames({ initialValues: [], events: [] }, () => -1);
    assert.equal(frames.length, 1);
    assert.deepEqual(frames[0].values, []);
    assert.equal(frames[0].line, null);
});
