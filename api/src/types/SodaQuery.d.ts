import events = require("events");
import SodaConsumer from "./SodaConsumer";

export class SodaQuery {

    constructor(consumer: SodaConsumer);

    withDataset: (datasetId: string) => this;

    select: (...args: any) => this;

    where: (...args: any) => this;

    having: (...args: any) => this;

    group: (...args: any) => this;

    order: (...args: any) => this;

    limit: (...args: any) => this;

    getRows: () => events.EventEmitter;

}