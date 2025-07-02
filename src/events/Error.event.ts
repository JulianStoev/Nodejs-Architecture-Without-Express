import { eventEmitter } from './EventEmitter';

export function ErrorEvents(): void {

    eventEmitter.on('error', (e: string): void => {
        // some action with the error
        console.error('emitted error', e);
    });

    eventEmitter.on('unauthorized', (e: string): void => {
        // some action with the error
        console.error('emitted error', e);
    });

}
