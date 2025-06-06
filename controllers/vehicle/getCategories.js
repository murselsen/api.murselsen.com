import fs from "fs";
import path from "path";

export const getCategories = async () => {
  try {
    const fileData = await fs.readFileSync(
      path.join(process.cwd(), "db", "vehicle", "categories.json"),
      "utf-8"
    );
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading categories file:", error);
    throw new Error("Failed to read vehicle categories");
  }
};
