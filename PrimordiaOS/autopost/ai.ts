export async function generateCaption(payload: unknown): Promise<string> {
  // V1: simple caption generator
  const base = typeof payload === "object" && payload !== null
    ? JSON.stringify(payload)
    : String(payload ?? "");

  return `PrimordiaOS Autopost: ${base}`;
}
