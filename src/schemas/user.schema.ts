import { object, string, number } from 'zod';

export const userSchema = object({
    name: string({required_error: "Name is required"}).min(3).max(255),
    email: string({required_error: "Name is required"})
    .email("Not a valid email address"),
    password: string({required_error: "Name is required"})
    .min(8,"Password  must be at least 8 characteres long").max(255),
});