import { useSyncExternalStore } from 'react';
import { getStepDelay, getServerStepDelay, subscribeStepDelay } from './executionSpeed';

export default function useExecutionSpeed() {
    return useSyncExternalStore(subscribeStepDelay, getStepDelay, getServerStepDelay);
}
