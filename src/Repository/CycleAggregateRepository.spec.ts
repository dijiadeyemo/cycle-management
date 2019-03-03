import { CycleAggregateRepository } from "./CycleAggregateRepository";
import { CycleAggregate } from "../Model/CycleAggregate";
import { createConnection, getRepository } from "typeorm";

describe('CycleAggregateRepository', () => {
    beforeAll(async () => {
        await (await createConnection()).synchronize();
        await getRepository(CycleAggregate).delete({totalCycles: 1})
    });

    afterEach(async () => {
        await getRepository(CycleAggregate).delete({totalCycles: 1})
    });

    describe('insertCycleAggregate()', () => {
        test('should insert new cycle aggregate', async () => {
            const repository = new CycleAggregateRepository();
            const cycleAggregate: CycleAggregate = {
                timestamp: new Date(),
                totalCycleLength: 1,
                totalCycles: 1
            };


            const created = await repository.insertCycleAggregate(cycleAggregate);

            expect(created).toMatchObject(cycleAggregate);
            expect(created).toHaveProperty('id', expect.any(Number));
        });
    });
    describe('findCycleAggregateByMaxTimestamp()', () => {
        test('should find cycle aggregate by max timestamb', async () => {
            const repository = new CycleAggregateRepository();
            const cycleAggregates: CycleAggregate[] = [{
                timestamp: new Date('2000-01-02T00:00:03+00:00'),
                totalCycleLength: 1,
                totalCycles: 1
            }, {
                timestamp: new Date('2000-01-01T00:00:03+00:00'),
                totalCycleLength: 1,
                totalCycles: 1
            }];

            await Promise.all(cycleAggregates.map(repository.insertCycleAggregate));

            const latestCycleAggregate = await repository.findCycleAggregateByMaxTimestamp();
            expect(latestCycleAggregate).toMatchObject(cycleAggregates[0]);

        });
    });
});