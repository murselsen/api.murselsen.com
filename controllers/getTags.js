import fs from "fs";
import path from "path";
const getTags = async () => {
  let dbTodos = await fs.readFileSync(
    path.join(process.cwd(), "db", "todos.json"),
    "utf8"
  );
  dbTodos = JSON.parse(dbTodos);
  let dbTags = dbTodos.map((todo) => todo.tags).flat();

  const tags = [];
  dbTags.forEach((tag) => {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  });

  const data = {
    dbTags: tags,
    totalTagsCount: tags.length,
  };

  return data;
};

export default getTags;
