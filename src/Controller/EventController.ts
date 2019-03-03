import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import ServiceIdentifier from "../Constant/ServiceIdentifier";
import { IEventService } from "../Service/IEventService";
import { EventDtoToEventConverter } from "../Converter/EventDtoToEventConverter";
import { IConverter } from "../Converter/IConverter";
import { EventDto } from "../Dto/EventDto";
import { Event } from "../Model/Event";

@injectable()
export class EventController {
    converter: IConverter<EventDto, Event>;
    
    constructor (
        @inject(ServiceIdentifier.IEventService) private eventService: IEventService
    ){
        this.converter = new EventDtoToEventConverter();
    }

    async postEvent(request: Request, response: Response) {
        await this.eventService.createEvent(this.converter.convert(request.body));
        response.status(201);
        response.send({});
    }
}