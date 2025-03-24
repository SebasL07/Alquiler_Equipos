import { object, string, number } from 'zod';

export const userSchema = object({
    name: string({required_error: "Name is required"}).min(3).max(255),
    user_Document: string({required_error: "user_Document is required"}).min(4).max(255),
    email: string({required_error: "email is required"}).email("Not a valid email address"),
    password: string({required_error: "password is required"}).min(8,"Password  must be at least 8 characteres long").max(255),
});