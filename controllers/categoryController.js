import fs from "fs";
import path from "path";

export const getCategories = async () => {
  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), "db", "todos.json"),
    "utf8"
  );

  let dbCategories = await fs.readFileSync(
    path.join(process.cwd(), "db", "categories.json"),
    "utf8"
  );

  dbTodos = JSON.parse(dbTodos);
  dbCategories = JSON.parse(dbCategories);
  const categories = [];

  dbCategories.forEach((category, index) => {
    console.log(
      "Category:",
      category.title,
      dbTodos.filter((todo) => todo.category === category.title).length
    );
    categories.push({
      ...category,
      count: dbTodos.filter((todo) => todo.category === category.title).length,
    });
  });

  const data = {
    dbCategories: categories,
    totalCategoriesCount: categories.length,
  };
  return data;
};
export const getCategory = async (category) => {
  let dbCategories = await fs.readFileSync(
    path.join(process.cwd(), "db", "categories.json"),
    "utf8"
  );
  dbCategories = JSON.parse(dbCategories);
  const foundCategory = dbCategories.find(
    (cat) => cat.title.toLowerCase() === category
  );
  return foundCategory; // return undefined if not found
};
