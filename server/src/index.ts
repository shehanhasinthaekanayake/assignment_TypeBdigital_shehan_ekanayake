import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connect } from "./infrastructure/mongoose/connect";
import { MongooseTodoRepository } from "./infrastructure/mongoose/todoRepository";
import { todoRoutes } from "./presentation/routes/todos";
import { swaggerSpec } from "./swagger";

async function main() {
  const uri = process.env.MONGODB_URI;
  await connect(uri ?? "");

  const app = express();
  app.use(express.json());

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // wire the mongo repo into the routes
  const repo = new MongooseTodoRepository();
  app.use("/api/todos", todoRoutes(repo));

  app.use(
    (
      err: unknown,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    }
  );

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
