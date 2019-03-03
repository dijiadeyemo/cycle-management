import { IEventService } from "./IEventService";
import { Event } from "../Model/Event";
import { inject, injectable } from "inversify";
import { IEventRepository } from "../Repository/IEventRepository";
import ServiceIdentifier from "../Constant/ServiceIdentifier";
import { CycleAggregate } from "../Model/CycleAggregate";
import { ICycleAggregateRepository } from "../Repository/ICycleAggregateRepository";
import { MEDIUM_BLEEDING, LIGHT_BLEEDING, HEAVY_BLEEDING } from "../Constant/Symtom";
import { DAY_IN_MILLISECONDS } from "../Constant/Time";

@injectable()
export class EventService implements IEventService {
    constructor(
        @inject(ServiceIdentifier.IEventRepository) private eventRepository: IEventRepository,
        @inject(ServiceIdentifier.ICycleAggregateRepository) private cycleAggregateRepository: ICycleAggregateRepository
    ) {

    }
    async createEvent(event: Event): Promise<Event> {
        event.isCycleStart = await this.isStartOfCycle(event)
        if (event.isCycleStart)
            this.updateCycleAggregateWithEvent(event);
        await this.eventRepository.createEvent(event);
        return event;
    }

    private async isStartOfCycle(event: Event): Promise<boolean> {
        const { userId } = event;

        if (!this.isBleedingEvent(event))
            return false;

        const lastUserEvent = await this.eventRepository.findEventByUserIdAndMaxTimestamp(userId);

        if (!lastUserEvent)
            return true;
        return !this.isBleedingEvent(lastUserEvent);
    }

    private isBleedingEvent(event: Event): boolean {
        const bleedingEventSymtoms = [
            HEAVY_BLEEDING,
            LIGHT_BLEEDING,
            MEDIUM_BLEEDING
        ];
        return bleedingEventSymtoms.includes(event.symptom);
    }

    private async updateCycleAggregateWithEvent(event: Event): Promise<void> {
        try {

            let currentCycleAggregate = await this.cycleAggregateRepository.findCycleAggregateByMaxTimestamp();
            if (!currentCycleAggregate)
                currentCycleAggregate = { totalCycles: 0, totalCycleLength: 0 };

            const cycleLength = await this.getCycleLength(event);
            const newCycleAggregate: CycleAggregate = this.getUpdatedAggregate(currentCycleAggregate, cycleLength);
            await this.cycleAggregateRepository.insertCycleAggregate(newCycleAggregate);
        } catch (error) {
            console.error(error)
        }
    }

    private getUpdatedAggregate(currentCycleAggregate: CycleAggregate, cycleLength: number): CycleAggregate {
        return {
            timestamp: new Date(),
            totalCycles: currentCycleAggregate.totalCycles + 1,
            totalCycleLength: currentCycleAggregate.totalCycleLength + cycleLength,
        }
    }

    private async getCycleLength(event: Event): Promise<number> {
        const lastCycleStartEvent = await this.eventRepository.findEventByUserIdAndCycleStartAndMaxTimestamp(event.userId, true);
        if (!lastCycleStartEvent)
            throw new Error("A previous cycle was never started");
        const lastCycleStartEventTimestamp = lastCycleStartEvent ? lastCycleStartEvent.timestamp.getTime() : 0;
        return (event.timestamp.getTime() - lastCycleStartEventTimestamp) / DAY_IN_MILLISECONDS;
    }
}
