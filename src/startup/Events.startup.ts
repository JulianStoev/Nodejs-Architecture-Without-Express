import { ErrorEvents } from '../events/Error.event';

export default function EventsStartup(): void {

    // handle error events
    ErrorEvents();

}