import { getServerEnv } from "@/config/env";


export const emailKeys = {
	apiKey: getServerEnv("EMAIL_KEY")
};

