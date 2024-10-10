import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
    NODE_ENV: z.enum(["production", "development", "test"]).default("development"),
    PORT: z.string().default("3333").transform((el) => parseInt(el)),
    GEMINI_KEY: z.string(),
    MONGO_DB_CONNECTION: z.string(),
    AWS_ACCESS_KEY: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    AWS_REGION: z.string().default("us-east-1")
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw new Error("Failed on parsing env variables: \n" + _env.error);
}

export const env = _env.data;