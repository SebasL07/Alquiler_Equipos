import {number, object, string} from 'zod';

export const deviceSchema = object({
    name: string({required_error: "Name is required"}).min(3).max(255),
    type: string({required_error: "Type is required"}).min(3).max(255),
    state: string({required_error: "State is required"}).min(3).max(255),
    description: string({required_error: "Description is required"}).min(3).max(255),
    stock: number({required_error: "Stock is required"}).min(1),
    image: string({required_error: "Image is required"}).min(3).max(255),
});

