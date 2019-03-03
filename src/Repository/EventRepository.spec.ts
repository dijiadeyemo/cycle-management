import { EventRepository } from "./EventRepository";
import { Event } from "../Model/Event";
import dotenv from "dotenv";
import "reflect-metadata";
import { createConnection, getRepository } from "typeorm";

dotenv.config();
describe('EventRepository', async () => {

    beforeAll(async () => {
        await (await createConnection()).synchronize();
        await getRepository(Event).delete({symptom: 1})
    });

    afterEach(async () => {
        await getRepository(Event).delete({symptom: 1})
    });

    describe('createEvent()', () => {
        test("should successfully create an event", async () => {
            
            const eventRepository = new EventRepository();
            const event: Event = {
                symptom: 1,
                timestamp: new Date(),
                isCycleStart: true,
                userId: 2,
            }
            const createdEvent = await eventRepository.createEvent(event);
            expect(createdEvent).toMatchObject(event);
            expect(createdEvent).toHaveProperty('id', expect.any(Number));
        });
    });

    describe('findEventByUserIdAndMaxTimestamp()', () => {
        test('should find event by user id and max timestamp', async () => {
            const eventRepository = new EventRepository();
            const events: Event[] = [
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:00+00:00'),
                    isCycleStart: true,
                    userId: 3,
                },
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:03+00:00'),
                    isCycleStart: true,
                    userId: 3,
                },
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:02+00:00'),
                    isCycleStart: true,
                    userId: 3,
                }
            ];
            
            await Promise.all(events.map(eventRepository.createEvent));

            const event = await eventRepository.findEventByUserIdAndMaxTimestamp(3);
            expect(event).toMatchObject(events[1]);
        });
    });


    describe('findEventByUserIdAndMaxTimestamp()', () => {
        test('should find event by user id, cycle time and max timestamp', async () => {
            const eventRepository = new EventRepository();
            const events: Event[] = [
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:00+00:00'),
                    isCycleStart: true,
                    userId: 3,
                },
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:03+00:00'),
                    isCycleStart: false,
                    userId: 3,
                },
                {
                    symptom: 1,
                    timestamp: new Date('2000-01-01T00:00:02+00:00'),
                    isCycleStart: true,
                    userId: 3,
                }
            ];
            
            await Promise.all(events.map(eventRepository.createEvent));

            const event = await eventRepository.findEventByUserIdAndCycleStartAndMaxTimestamp(3, true);
            expect(event).toMatchObject(events[2]);
        });
    });
});