import "reflect-metadata";
import { EventService } from "./EventService";
import {Event} from "../Model/Event";
import { ICycleAggregateRepository } from "../Repository/ICycleAggregateRepository";
import { IEventRepository } from "../Repository/IEventRepository";


class CycleAggregateRepositoryMock implements ICycleAggregateRepository {
    findCycleAggregateByMaxTimestamp = jest.fn().mockReturnValue({
        totalCycleLength: 8,
        totalCycles: 4
    });
    insertCycleAggregate = jest.fn();
}

class EventRepositoryMock implements IEventRepository {
    createEvent = jest.fn().mockImplementation((input) => {
        input.id = 1;
        return input;
    });
    findEventByUserIdAndCycleStartAndMaxTimestamp = jest.fn();
    findEventByUserIdAndMaxTimestamp = jest.fn();
}

const cycleAggregateRepositoryMock = new CycleAggregateRepositoryMock()
const eventRepositoryMock = new EventRepositoryMock()

describe('EventService', () => {
    describe('createEvent()', () => {
        test('should create an event', async () => {
            const eventService = new EventService(eventRepositoryMock, cycleAggregateRepositoryMock);
            const event: Event = {
                symptom: 2,
                timestamp: new Date(),
                userId: 1,
            };

            const createdEvent = await eventService.createEvent(event);

            expect(createdEvent).toMatchObject(event);
            expect(createdEvent).toHaveProperty('id', expect.any(Number));
            expect(eventRepositoryMock.createEvent).toHaveBeenCalled();
        });
    });
});