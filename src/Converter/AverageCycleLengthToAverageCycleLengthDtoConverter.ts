import { IConverter } from "./IConverter";
import { AverageCycleLengthDto } from "../Dto/AvergeCycleLengthDto";
import { AverageCycleLength } from "../Domain/AverageCycleLength";

export class AverageCycleLengthToAverageCycleLengthDtoConverter implements IConverter<AverageCycleLength, AverageCycleLengthDto>{
    convert(source: AverageCycleLength): AverageCycleLengthDto {
        return {
            average_cycle: {
                length: source.averageCycleLength
            }
        }
    }

}