import { Todo } from "../../domain/todo";
import { TodoRepository } from "../../interfaces/todoRepository";
import { TodoModel } from "./todoModel";

function toTodo(doc: { _id: string; title: string; description?: string; done: boolean }): Todo {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description ?? "",
    done: doc.done,
  };
}

export class MongooseTodoRepository implements TodoRepository {
  async save(todo: Todo) {
    const doc = await TodoModel.create({
      _id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done,
    });
    return toTodo(doc);
  }

  async list() {
    const docs = await TodoModel.find().lean();
    return docs.map(toTodo);
  }

  async findById(id: string) {
    const doc = await TodoModel.findById(id).lean();
    return doc ? toTodo(doc) : null;
  }

  async update(todo: Todo) {
    const doc = await TodoModel.findByIdAndUpdate(
      todo.id,
      {
        title: todo.title,
        description: todo.description,
        done: todo.done,
      },
      { new: true }
    ).lean();

    if (!doc) throw new Error("todo missing after update");
    return toTodo(doc);
  }

  async remove(id: string) {
    const res = await TodoModel.findByIdAndDelete(id);
    return res != null;
  }
}
