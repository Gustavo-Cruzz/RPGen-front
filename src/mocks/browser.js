import { setupWorker } from 'msw/browser';
import { userHandlers } from './userHandlers';
import { characterHandlers } from './characterHandlers';

const worker = setupWorker(...userHandlers, ...characterHandlers);

export { worker };
