import { checkSchema } from "express-validator";

export const contactValidator = checkSchema({
    clerkId: {
        in: ["body"],
        exists: {
            errorMessage: "Clerk ID is required",
        },
        isString: {
            errorMessage: "Clerk ID must be a string",
        },
        trim: true
    },
    name: {
        in: ["body"],
        exists: {
            errorMessage: "Name is required",
        },
        isString: {
            errorMessage: "Name must be a string",
        },
        trim: true
    },
    phone: {
        in: ["body"],
        exists: {
            errorMessage: "Phone number is required",
        },
        isString: {
            errorMessage: "Phone number must be a string",
        },
        trim: true,
        matches: {
            options: [/^\+?[1-9]\d{1,14}$/],  // E.164 format (e.g., +1234567890)
            errorMessage: "Phone number must be a valid international format",
        }
    }
});
