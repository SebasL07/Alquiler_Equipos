import { object, string, number } from "zod";

export const contractSchema = object({
    user_Document: string({ required_error: "User document is required" }).min(3).max(255),
    
    date_Start: string({ required_error: "Date request is required" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in format YYYY-MM-DD" }),

    date_Finish: string({ required_error: "Date finish is required" })
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date must be in format YYYY-MM-DD" }),

    monthly_Value: number({ required_error: "Request id is required" }).min(1),
    
    contract: string({ required_error: "Contract is required" }).min(3).max(255),
})
.refine((data) => new Date(data.date_Finish) > new Date(data.date_Start), {
    message: "Date finish must be after date start",
    path: ["date_Finish"],
});

