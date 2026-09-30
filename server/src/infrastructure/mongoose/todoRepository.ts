import { Todo } from "../../domain/todo";
import { TodoRepository } from "../../interfaces/todoRepository";
import { TodoModel } from "./todoModel";

type TodoDoc = {
  _id: string;
  title: string;
  description?: string;
  done: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function toTodo(doc: TodoDoc): Todo {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description ?? "",
    done: doc.done,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export class MongooseTodoRepository implements TodoRepository {
  async save(todo: Todo) {
    const doc = await TodoModel.create({
      _id: todo.id,
      title: todo.title,
      description: todo.description,
      done: todo.done,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt,
    });
    return toTodo(doc.toObject() as TodoDoc);
  }

  async list() {
    const docs = await TodoModel.find().sort({ createdAt: -1 }).lean<TodoDoc[]>();
    return docs.map(toTodo);
  }

  async findById(id: string) {
    const doc = await TodoModel.findById(id).lean<TodoDoc | null>();
    return doc ? toTodo(doc) : null;
  }

  async update(todo: Todo) {
    const doc = await TodoModel.findByIdAndUpdate(
      todo.id,
      {
        title: todo.title,
        description: todo.description,
        done: todo.done,
        updatedAt: todo.updatedAt,
      },
      { returnDocument: "after" }
    ).lean<TodoDoc | null>();

    if (!doc) throw new Error("todo missing after update");
    return toTodo(doc);
  }

  async remove(id: string) {
    const res = await TodoModel.findByIdAndDelete(id);
    return res != null;
  }
}
