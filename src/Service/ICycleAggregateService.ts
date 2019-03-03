import { AverageCycleLength } from "../Domain/AverageCycleLength";

export interface ICycleAggregateService {
    getAverageCycle(): Promise<AverageCycleLength> ;
}