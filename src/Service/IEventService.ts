import { Event } from "../Model/Event";

export interface IEventService {
    createEvent(event:Event): Promise<Event>;
}
