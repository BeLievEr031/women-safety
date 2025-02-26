import { checkSchema } from "express-validator";

export const reportIncidentValidator = checkSchema({
    incidentType: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Incident type is required.",
        },
        isString: {
            errorMessage: "Incident type must be a string.",
        },
    },
    lat: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Latitude is required.",
        },
        isFloat: {
            options: { min: -90, max: 90 },
            errorMessage: "Latitude must be a valid number between -90 and 90.",
        },
    },
    lng: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Longitude is required.",
        },
        isFloat: {
            options: { min: -180, max: 180 },
            errorMessage: "Longitude must be a valid number between -180 and 180.",
        },
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Description is required.",
        },
        isString: {
            errorMessage: "Description must be a string.",
        },
        isLength: {
            options: { max: 500 },
            errorMessage: "Description must not exceed 500 characters.",
        },
    },
});
