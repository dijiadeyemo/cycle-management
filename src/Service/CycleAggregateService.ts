import { ICycleAggregateService } from "./ICycleAggregateService";
import { CycleAggregate } from "../Model/CycleAggregate";
import { inject, injectable } from "inversify";
import { CycleAggregateRepository } from "../Repository/CycleAggregateRepository";
import ServiceIdentifier from "../Constant/ServiceIdentifier";
import { AverageCycleLength } from "../Domain/AverageCycleLength";

@injectable()
export class CycleAggregateService implements ICycleAggregateService {
    constructor(
        @inject(ServiceIdentifier.ICycleAggregateRepository) private cycleAggregateRepository: CycleAggregateRepository
    ) { }

    async getAverageCycle(): Promise<AverageCycleLength> {
        const cycleAggregate = await this.cycleAggregateRepository.findCycleAggregateByMaxTimestamp();
        const averageCycleLength = cycleAggregate.totalCycleLength / cycleAggregate.totalCycles;
        return { averageCycleLength }
    }
}