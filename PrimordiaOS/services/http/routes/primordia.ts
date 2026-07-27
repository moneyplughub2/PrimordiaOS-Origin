import { Router } from "express";

export const primordiaRoute = Router();

primordiaRoute.post("/command", (req, res) => {
  const { action, payload } = req.body;

  console.log("[PrimordiaOS Command]", action, payload);

  res.json({
    status: "ok",
    received: { action, payload }
  });
});
