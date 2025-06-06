import fs from "fs";
import path from "path";

export const getVehicles = async () => {
  try {
    const fileData = await fs.readFileSync(
      path.join(process.cwd(), "db", "vehicle", "vehicles.json")
      );
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading vehicles file:", error);
    throw new Error("Failed to read vehicle data");
  }
};
