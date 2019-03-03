import { EventDtoToEventConverter } from "./EventDtoToEventConverter";
import { EventDto } from "../Dto/EventDto";

describe('AverageCycleLengthToAverageCycleLengthDtoConverter', () => {
    describe('convert()', () => {
        test('', () => {
            const converter = new EventDtoToEventConverter();
            const source:EventDto = { user_id: 1, symptom: 1, timestamp: '2000-01-01T00:00:00' }

            const output = converter.convert(source);

            expect(output).toMatchObject({ userId: 1, symptom: 1, timestamp: expect.any(Date) });
        });
        
    });
});