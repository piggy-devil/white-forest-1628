import { defineSchema } from "convex/server";
import { authTables } from "./authTables";
export default defineSchema({
  ...authTables,
});
