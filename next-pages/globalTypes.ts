import { Database } from "@cloudflare/d1";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB: Database;
    }
  }
}

export interface Env {
  DB: Database;
}
