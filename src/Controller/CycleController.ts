import { injectable, inject } from "inversify";
import ServiceIdentifier from "../Constant/ServiceIdentifier";
import { ICycleAggregateService } from "../Service/ICycleAggregateService";
import { Request, Response } from "express";

import { OK } from 'http-status-codes';
import { AverageCycleLengthToAverageCycleLengthDtoConverter } from "../Converter/AverageCycleLengthToAverageCycleLengthDtoConverter";

@injectable()
export class CycleController {
    converter: AverageCycleLengthToAverageCycleLengthDtoConverter;
    constructor(
        @inject(ServiceIdentifier.ICycleAggregateService) private cycleAggregateService: ICycleAggregateService
    ){
        this.converter = new AverageCycleLengthToAverageCycleLengthDtoConverter()
    }

    async getAverageCycleTime(request: Request, response: Response) {
        const averageCycleTime = await this.cycleAggregateService.getAverageCycle();
        response.status(OK);
        response.send(this.converter.convert(averageCycleTime))
    }
}