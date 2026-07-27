import express from "express";
import bodyParser from "body-parser";
import { diagnosticsRoute } from "./routes/diagnostics";
import { primordiaRoute } from "./routes/primordia";

export class PrimordiaAPI {
  public app = express();

  constructor() {
    this.app.use(bodyParser.json());

    // Register routes that actually exist
    this.app.use("/primordia", primordiaRoute);
    this.app.use("/diagnostics", diagnosticsRoute);
  }
}

export function createApi() {
  const api = new PrimordiaAPI();
  return api.app;
}
