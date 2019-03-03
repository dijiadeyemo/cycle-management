import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import container from "./Config/installer";
import ServiceIdentifier from "./Constant/ServiceIdentifier";
import bodyParser = require("body-parser");
import { EventController } from "./Controller/EventController";
import { createConnection } from "typeorm";
import { CycleController } from "./Controller/CycleController";

const eventController: EventController = container.get(ServiceIdentifier.EventController);
const cycleController: CycleController = container.get(ServiceIdentifier.CycleController);


const app = express();
app.set("port", process.env.PORT || 3000);
createConnection().then(connection => {
  connection.synchronize();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  
  
  app.post("/events", (request: Request, response: Response) => {
    eventController.postEvent(request, response);
  });
  
  app.get("/cycles/average", (request: Request, response: Response) => {
    cycleController.getAverageCycleTime(request, response);
  });
  
  app.use((err: any, request: Request, response: Response, next: NextFunction) => {
    console.error("Internal error occured", err);
    response.status(500);
    response.json({ error: "Error has occured" });
  });
  
});


export default app;