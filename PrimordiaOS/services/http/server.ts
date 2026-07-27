import { createApi } from "./api";

const PORT = process.env.PORT || 3000;

async function main() {
  const app = createApi();

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PrimordiaOS API listening on port ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Server failed to start:", err);
  process.exit(1);
});
