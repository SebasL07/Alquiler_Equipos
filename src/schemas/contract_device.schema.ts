import { object, string, number, z } from "zod";

export const ContractDeviceSchema = object({
    id_contract: number({ required_error: "Contract ID is required" }).int().positive(),
    deviceName: string({required_error: 'Device name is required'}).min(3).max(255),
    rented_quantity: number({ required_error: "Quantity is required" })
        .int()
        .positive({ message: "Quantity must be greater than 0" }),
    total_price: number({ required_error: "Total price is required" })
        .positive({ message: "Total price must be greater than 0" }),
    delivery_status: z.enum(["Pending", "Delivered", "Returned", "Damaged"], {
        errorMap: () => ({ message: "Invalid delivery status" }),
    }),
});