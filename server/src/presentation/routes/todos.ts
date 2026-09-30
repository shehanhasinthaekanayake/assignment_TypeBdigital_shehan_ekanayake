import { Router } from "express";
import { createTodo } from "../../application/createTodo";
import { deleteTodo } from "../../application/deleteTodo";
import { listTodos } from "../../application/listTodos";
import { toggleDone } from "../../application/toggleDone";
import { updateTodo } from "../../application/updateTodo";
import { TodoRepository } from "../../interfaces/todoRepository";

export function todoRoutes(repo: TodoRepository) {
  const router = Router();

  router.get("/", async (_req, res) => {
    res.json(await listTodos(repo));
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
      res.status(400).json({ error: (err as Error).message });
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
      res.status(400).json({ error: (err as Error).message });
    }
  });

  router.patch("/:id/done", async (req, res) => {
    const todo = await toggleDone(repo, req.params.id);
    if (!todo) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.json(todo);
  });

  router.delete("/:id", async (req, res) => {
    const ok = await deleteTodo(repo, req.params.id);
    if (!ok) {
      res.status(404).json({ error: "not found" });
      return;
    }
    res.status(204).send();
  });

  return router;
}
