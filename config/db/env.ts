import { getServerEnv } from "@/config/env";




export const dbKeys = {
    url: getServerEnv('DB_URL_RELATIVE')
};

