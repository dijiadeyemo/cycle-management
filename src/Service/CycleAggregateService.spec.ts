import { CycleAggregateService } from "./CycleAggregateService";
import { ICycleAggregateRepository } from "../Repository/ICycleAggregateRepository";

class CycleAggregateRepositoryMock implements ICycleAggregateRepository {
    findCycleAggregateByMaxTimestamp = jest.fn().mockReturnValue({
        totalCycleLength: 8,
        totalCycles: 4
    });
    insertCycleAggregate = jest.fn();
}

describe('CycleAggregateService', () => {
    describe('getAverageCycle()', () => {
        test('should create an event', async () => {
            const cycleAggregateRepositoryMock = new CycleAggregateRepositoryMock();
            const service = new CycleAggregateService(cycleAggregateRepositoryMock);

            const averageCycleLength = await service.getAverageCycle();

            expect(averageCycleLength).toMatchObject({
                averageCycleLength: 2
            });

        });
    });
});