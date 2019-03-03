import { AverageCycleLengthToAverageCycleLengthDtoConverter } from "./AverageCycleLengthToAverageCycleLengthDtoConverter";
import { AverageCycleLength } from "../Domain/AverageCycleLength";

describe('AverageCycleLengthToAverageCycleLengthDtoConverter', () => {
    describe('convert()', () => {
        test('', () => {
            const converter = new AverageCycleLengthToAverageCycleLengthDtoConverter();
            const source:AverageCycleLength = { averageCycleLength: 10}

            const output = converter.convert(source);

            expect(output).toEqual({
                average_cycle: {
                    length: 10
                }
            });
        });
        
    });
});