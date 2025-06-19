import { Response } from "@/types/response"


export const errResponse: Response<null> = {
    status: 500,
    success: 'fail',
    message: 'An error occurred',
}