import { Database } from "@cloudflare/d1";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      sample1: Database;
    }
  }
}

export interface Env {
  sample1: Database;
}
