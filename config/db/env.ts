import { getEnv } from "@/config/env";




export const dbKeys = {
    url: getEnv("DB_URL_REL") as string
};

