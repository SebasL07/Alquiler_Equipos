import {object, string} from 'zod';

export const requestSchema = object({
    user_Document: string({required_error: 'User document is required'}).min(3).max(255),
    date_Request: string({required_error: 'Date request is required'}).min(3).max(255),
});
