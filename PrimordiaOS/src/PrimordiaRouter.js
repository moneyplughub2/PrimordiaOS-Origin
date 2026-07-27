function PrimordiaRouter(req, res) {
    const route = req.body?.route;
    switch (route) {
        case "webhook.register":
            return res.json({ ok: true, route: "webhook.register" });
        case "cad.build":
            return res.json({ ok: true, route: "cad.build" });
        case "cad.params":
            return res.json({ ok: true, route: "cad.params" });
        case "cad.files":
            return res.json({ ok: true, route: "cad.files" });
        case "cad.simulate":
            return res.json({ ok: true, route: "cad.simulate" });
        default:
            return res.status(404).json({ error: "Unknown route" });
    }
}
export default PrimordiaRouter;
