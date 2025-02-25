import { checkSchema } from "express-validator";

export const alertValidator = checkSchema({
    lat: {
        in: ["body"],
        isFloat: {
            errorMessage: "Latitude must be a valid number",
        },
        notEmpty: {
            errorMessage: "Latitude is required",
        },
    },
    lng: {
        in: ["body"],
        isFloat: {
            errorMessage: "Longitude must be a valid number",
        },
        notEmpty: {
            errorMessage: "Longitude is required",
        },
    },
    clerkId: {
        in: ["body"],
        isString: {
            errorMessage: "Clerk ID must be a string",
        },
        notEmpty: {
            errorMessage: "Clerk ID is required",
        },
    },
});

