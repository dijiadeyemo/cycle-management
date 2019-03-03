import { ICycleAggregateRepository } from "./ICycleAggregateRepository";
import { CycleAggregate } from "../Model/CycleAggregate";
import { getRepository } from "typeorm";
import { injectable } from "inversify";

@injectable()
export class CycleAggregateRepository implements ICycleAggregateRepository {
    async findCycleAggregateByMaxTimestamp(): Promise<CycleAggregate> {
        return getRepository(CycleAggregate).findOne({
            order: {
                timestamp: 'DESC'
            }
        });
    }

    async insertCycleAggregate(cycleAggregate: CycleAggregate): Promise<CycleAggregate> {
        await getRepository(CycleAggregate).insert(cycleAggregate);
        return cycleAggregate;
    }
}