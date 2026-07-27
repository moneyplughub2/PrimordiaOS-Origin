import { autopostRouter } from "../../autopost/autopost.ts";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "POST" && path === "/autopost") {
      try {
        const payload = await request.json();
        const caption = await autopostRouter(payload);
        return json({ caption });
      } catch (err: any) {
        return json({ error: err?.message ?? "autopost failed" }, 500);
      }
    }

    return json({ primordia: "automation-online" });
  },
};
