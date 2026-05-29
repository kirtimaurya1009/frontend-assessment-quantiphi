import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Vitest only — production uses the real /api routes
export const server = setupServer(...handlers);
