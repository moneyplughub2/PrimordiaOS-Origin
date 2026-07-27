// ────────────────────────────────────────────────────────────
//  server.ts
//  PrimordiaOS Backend Entry Point
//  HTTP → PrimordiaRouter → Skills → Channels
// ────────────────────────────────────────────────────────────

import express, { Request, Response } from "express";
import PrimordiaRouter from "./PrimordiaRouter.js";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "PrimordiaOS Online" });
});

// Main PrimordiaOS endpoint
app.post("/primordia", (req: Request, res: Response) => {
  try {
    PrimordiaRouter(req, res);
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message || "PrimordiaOS Backend Error",
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`PrimordiaOS backend running on port ${PORT}`);
});
