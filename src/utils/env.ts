import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
    PORT: z.string().default("3333").transform((el) => parseInt(el)),
    GEMINI_KEY: z.string(),
    MONGO_DB_CONNECTION: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error("Failed on parsing env variables: \n" + _env.error);
}

export const env = _env.data;