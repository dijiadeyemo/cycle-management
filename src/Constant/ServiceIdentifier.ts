const ServiceIdentifier = {
    IEventRepository: Symbol("IEventRepository"),
    ICycleAggregateRepository: Symbol("ICycleAggregateRepository"),

    IEventService: Symbol("IEventService"),
    ICycleAggregateService: Symbol("ICycleAggregateService"),

    EventController: Symbol("EventController"),
    CycleController: Symbol("CycleController")
};

export default ServiceIdentifier;