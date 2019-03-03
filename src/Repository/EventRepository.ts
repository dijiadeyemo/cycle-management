import { IEventRepository } from "./IEventRepository";
import { Event } from "../Model/Event";
import { getRepository, getConnection } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class EventRepository implements IEventRepository {
    findEventByUserIdAndMaxTimestamp(userId: number): Promise<Event> {
        return getRepository(Event).findOne({
            where: { userId },
            order: {
                timestamp: 'DESC'
            }
        });
    }

    async findEventByUserIdAndCycleStartAndMaxTimestamp(userId: number, isCycleStart: boolean): Promise<Event> {
        return getRepository(Event).findOne({
            where: { userId, isCycleStart },
            order: {
                timestamp: 'DESC'
            }
        });
    }

    async createEvent(event: Event): Promise<Event> {
        await getConnection().getRepository(Event).insert(event);
        return event;
    }
}