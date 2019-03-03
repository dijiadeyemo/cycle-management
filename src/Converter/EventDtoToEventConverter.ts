import { IConverter } from "./IConverter";
import { EventDto } from "../Dto/EventDto";
import { Event } from "../Model/Event";

export class EventDtoToEventConverter implements IConverter<EventDto, Event> {
    convert(source: EventDto): Event {
        return {
            timestamp: new Date(source.timestamp),
            symptom: source.symptom,
            userId: source.user_id
        }
    }

}