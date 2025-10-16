import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.union([z.undefined(), z.enum(["development", "production"])]),
    CRON_UPDATE_TIME: z.union([z.undefined(), z.string()]),
    POSTGRES_HOST: z.union([z.undefined(), z.string()]),
    POSTGRES_PORT: z
        .string()
        .regex(/^[0-9]+$/)
        .transform((value) => parseInt(value)),
    POSTGRES_DB: z.string(),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    GOOGLE_CREDENTIALS_PATH: z.union([z.undefined(), z.string()]),
    GOOGLE_SHEET_NAME: z.union([z.undefined(), z.string()]),
    WB_API_URL: z.string(),
    WB_API_TOKEN: z.string(),
});

const env = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    CRON_UPDATE_TIME: process.env.CRON_UPDATE_TIME,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    GOOGLE_CREDENTIALS_PATH: process.env.GOOGLE_CREDENTIALS_PATH,
    GOOGLE_SHEET_NAME: process.env.GOOGLE_SHEET_NAME,
    WB_API_URL: process.env.WB_API_URL,
    WB_API_TOKEN: process.env.WB_API_TOKEN,
});

export default env;
