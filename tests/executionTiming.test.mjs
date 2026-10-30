import test from 'node:test';
import assert from 'node:assert/strict';
import { createExecutionClock } from '../src/components/execution/executionClock.js';
import { getStepDelay, setStepDelay, subscribeStepDelay } from '../src/components/execution/executionSpeed.js';

function fixture() {
    let time = 0;
    let delay = 2000;
    let id = 0;
    const timers = new Map();
    const clock = createExecutionClock({
        getDelay: () => delay,
        now: () => time,
        schedule: (callback, ms) => { timers.set(++id, { callback, at: time + ms }); return id; },
        unschedule: key => timers.delete(key)
    });
    function advance(ms) {
        time += ms;
        for (const [key, timer] of timers) {
            if (timer.at <= time) { timers.delete(key); timer.callback(); }
        }
    }
    return { clock, advance, timers, speed(ms) { delay = ms; clock.restartStep(); } };
}

test('a step waits for the configured reading time', async () => {
    const f = fixture();
    let finished = false;
    const waiting = f.clock.wait().then(value => { finished = value; });
    f.advance(1999);
    await Promise.resolve();
    assert.equal(finished, false);
    f.advance(1);
    await waiting;
    assert.equal(finished, true);
    assert.equal(f.timers.size, 0);
});

test('speed changes reschedule the current step, including faster changes', async () => {
    const f = fixture();
    let finished = false;
    const waiting = f.clock.wait().then(value => { finished = value; });
    f.advance(1000);
    f.speed(6000);
    f.advance(3000);
    await Promise.resolve();
    assert.equal(finished, false);
    f.speed(500);
    f.advance(499);
    await Promise.resolve();
    assert.equal(finished, false);
    f.advance(1);
    await waiting;
    assert.equal(finished, true);
});

test('pause preserves remaining time and resume continues once', async () => {
    const f = fixture();
    const waiting = f.clock.wait();
    f.advance(750);
    f.clock.pause();
    assert.equal(f.timers.size, 0);
    f.advance(10000);
    f.clock.resume();
    f.clock.resume();
    assert.equal(f.timers.size, 1);
    f.advance(1249);
    assert.equal(f.timers.size, 1);
    f.advance(1);
    assert.equal(await waiting, true);
});

test('changing speed while paused does not advance until resumed', async () => {
    const f = fixture();
    const waiting = f.clock.wait();
    f.clock.pause();
    f.speed(500);
    f.advance(10000);
    assert.equal(f.timers.size, 0);
    f.clock.resume();
    f.advance(500);
    assert.equal(await waiting, true);
});

test('cancellation releases a pending execution without advancing it', async () => {
    const f = fixture();
    const waiting = f.clock.wait();
    f.clock.cancel();
    assert.equal(await waiting, false);
    assert.equal(f.timers.size, 0);
    const next = f.clock.wait();
    f.advance(2000);
    assert.equal(await next, true);
});

test('speed is shared and remains usable without browser storage', () => {
    let changes = 0;
    const unsubscribe = subscribeStepDelay(() => changes++);
    setStepDelay(5000);
    assert.equal(getStepDelay(), 5000);
    setStepDelay(500);
    assert.equal(getStepDelay(), 500);
    setStepDelay('invalid');
    assert.equal(getStepDelay(), 2000);
    assert.equal(changes, 3);
    unsubscribe();
    setStepDelay(2000);
    assert.equal(changes, 3);
});

test('the chosen delay is saved and restored on a fresh page', async () => {
    const storage = new Map();
    const previousWindow = globalThis.window;
    globalThis.window = {
        localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
        addEventListener() {}, removeEventListener() {}
    };
    try {
        setStepDelay(4500);
        const freshStore = await import('../src/components/execution/executionSpeed.js?reload-test');
        assert.equal(freshStore.getStepDelay(), 4500);
    } finally {
        globalThis.window = previousWindow;
        setStepDelay(2000);
    }
});
