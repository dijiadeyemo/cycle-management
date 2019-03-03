
import { CycleAggregate } from "../Model/CycleAggregate";

export interface ICycleAggregateRepository {
    findCycleAggregateByMaxTimestamp(): Promise<CycleAggregate>;
    insertCycleAggregate(cycleAggregate: CycleAggregate): Promise<CycleAggregate>
}