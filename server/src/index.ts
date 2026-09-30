import "dotenv/config";
import express from "express";
import { connect } from "./infrastructure/mongoose/connect";
import { MongooseTodoRepository } from "./infrastructure/mongoose/todoRepository";
import { todoRoutes } from "./presentation/routes/todos";

async function main() {
  const uri = process.env.MONGODB_URI;
  await connect(uri ?? "");

  const app = express();
  app.use(express.json());

  // wire the mongo repo into the routes
  const repo = new MongooseTodoRepository();
  app.use("/api/todos", todoRoutes(repo));

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
