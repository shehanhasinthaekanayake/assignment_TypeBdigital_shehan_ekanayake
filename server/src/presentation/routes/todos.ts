import { Router, type Response } from "express";
import { createTodo } from "../../application/createTodo";
import { deleteTodo } from "../../application/deleteTodo";
import { listTodos } from "../../application/listTodos";
import { toggleDone } from "../../application/toggleDone";
import { updateTodo } from "../../application/updateTodo";
import { TodoRepository } from "../../interfaces/todoRepository";

function fail(res: Response, status: number, err: unknown) {
  const msg =
    status >= 500 ? "something went wrong" : (err as Error).message;
  if (status >= 500) console.error(err);
  res.status(status).json({ error: msg });
}

function isBadInput(err: unknown) {
  return (err as Error).message === "title is required";
}

export function todoRoutes(repo: TodoRepository) {
  const router = Router();

  router.get("/", async (_req, res) => {
    try {
      res.json(await listTodos(repo));
    } catch (err) {
      fail(res, 500, err);
    }
  });

  router.post("/", async (req, res) => {
    try {
      const todo = await createTodo(
        repo,
        req.body?.title ?? "",
        req.body?.description
      );
      res.status(201).json(todo);
    } catch (err) {
      fail(res, isBadInput(err) ? 400 : 500, err);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const todo = await updateTodo(repo, req.params.id, {
        title: req.body?.title,
        description: req.body?.description,
      });
      if (!todo) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(todo);
    } catch (err) {
      fail(res, isBadInput(err) ? 400 : 500, err);
    }
  });

  router.patch("/:id/done", async (req, res) => {
    try {
      const todo = await toggleDone(repo, req.params.id);
      if (!todo) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(todo);
    } catch (err) {
      fail(res, 500, err);
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const ok = await deleteTodo(repo, req.params.id);
      if (!ok) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.status(204).send();
    } catch (err) {
      fail(res, 500, err);
    }
  });

  return router;
}
