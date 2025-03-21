import fs from "fs";
import path from "path";

const getTodos = async () => {
  let dbTodos = fs.readFileSync(
    path.join(process.cwd(), "db", "todos.json"),
    "utf8"
  );
  dbTodos = JSON.parse(dbTodos);

  let dbCompletedTodoCount = dbTodos.filter(
    (todo) => todo.completed === true
  ).length;
  let dbTotalTodoCount = dbTodos.length;

  const data = {
    completedTodoCount: dbCompletedTodoCount,
    totalTodoCount: dbTotalTodoCount,
    todos: dbTodos,
  };

  return data;
};
export default getTodos;
