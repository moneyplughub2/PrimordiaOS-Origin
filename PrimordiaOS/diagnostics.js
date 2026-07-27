import { Router } from "express";
export const diagnosticsRoute = Router();
diagnosticsRoute.post("/log", (req, res) => {
    console.log("[Diagnostics] Event:", req.body);
    res.json({ status: "logged" });
});
