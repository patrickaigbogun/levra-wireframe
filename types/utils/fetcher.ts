import { Response } from "@/types/response";


export type Fetcher<T> = () => Promise<Response<T> | Response<null>>;

export type SafeFetchOptions = {
	filter?: boolean;
	coerce?: boolean;
};

export type SafeFetchResult<T> = {
	data: T | null;
	error?: string;
};