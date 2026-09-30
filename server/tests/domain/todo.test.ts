import { makeTodo, flipDone } from "../../src/domain/todo";

describe("todo", () => {
  it("makes a todo", () => {
    const t = makeTodo("buy milk");
    expect(t.title).toBe("buy milk");
    expect(t.done).toBe(false);
    expect(t.id).toBeTruthy();
  });

  it("needs a title", () => {
    expect(() => makeTodo("")).toThrow();
  });

  it("flips done", () => {
    let t = makeTodo("x");
    t = flipDone(t);
    expect(t.done).toBe(true);
    t = flipDone(t);
    expect(t.done).toBe(false);
  });
});
