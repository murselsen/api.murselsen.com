import fs from "fs";
import path from "path";

const getTodosByTag = async (tagTitle) => {
  console.time("getTodosByTag");
  const data = { dbTodos: [], totalTodosCount: 0, completedTodosCount: 0 };

  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), "db", "todos.json"),
    "utf8"
  );

  dbTodos = JSON.parse(dbTodos);

  dbTodos.forEach((todo, index) => {
    console.log(index, todo.tags);
    let result = todo.tags.includes(tagTitle);
    if (result) {
      console.log("Found", todo);
      data.dbTodos.push(todo);
      data.totalTodosCount++;
    }
  });
  data.completedTodosCount = data.dbTodos.filter(
    (todo) => todo.completed === true
  ).length;

  console.log(data);
  console.timeEnd("getTodosByTag");
  return data;
};

export default getTodosByTag;
