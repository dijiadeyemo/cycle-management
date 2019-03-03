import "reflect-metadata";
import { Container } from "inversify";
import ServiceIdentifier from "../Constant/ServiceIdentifier";
import { CycleController } from "../Controller/CycleController";
import { EventController } from "../Controller/EventController";
import { CycleAggregateService } from "../Service/CycleAggregateService";
import { EventService } from "../Service/EventService";
import { CycleAggregateRepository } from "../Repository/CycleAggregateRepository";
import { EventRepository } from "../Repository/EventRepository";

const container = new Container();

container.bind(ServiceIdentifier.CycleController).to(CycleController);
container.bind(ServiceIdentifier.EventController).to(EventController);
container.bind(ServiceIdentifier.ICycleAggregateService).to(CycleAggregateService);
container.bind(ServiceIdentifier.IEventService).to(EventService);
container.bind(ServiceIdentifier.ICycleAggregateRepository).to(CycleAggregateRepository);
container.bind(ServiceIdentifier.IEventRepository).to(EventRepository);

export default container;