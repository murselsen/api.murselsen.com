import fs from "fs";
import path from "path";

const getTodosByCategoryId = async (categoryId) => {
  console.time("getTodosByCategoryId");

  // // dbTodos = dbTodos.filter((todo) => todo.category === categoryId);

  // console.log("Params:", categoryId);

  let dbCategories = await fs.readFileSync(
    path.join(process.cwd(), "db", "categories.json")
  );

  dbCategories = JSON.parse(dbCategories);

  let dbCategory = dbCategories.find(
    (category) => category.id === Number(categoryId)
  );

  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), "db", "todos.json"),
    "utf8"
  );
  dbTodos = JSON.parse(dbTodos);

  dbTodos = dbTodos.filter((todo) => todo.category === dbCategory.title);

  const data = {
    dbTodos,
    dbCompletedTodoCount: dbTodos.filter((todo) => todo.completed === true)
      .length,
    dbTotalTodoCount: dbTodos.length,
  };

  console.timeEnd("getTodosByCategoryId");
  return data;
};
export default getTodosByCategoryId;
