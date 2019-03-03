import {Event} from '../Model/Event';

export interface IEventRepository {
    createEvent(event: Event): Promise<Event>;
    findEventByUserIdAndCycleStartAndMaxTimestamp(userId: number, isCycleStart: boolean): Promise<Event>;
    findEventByUserIdAndMaxTimestamp(userId: number): Promise<Event>;
}