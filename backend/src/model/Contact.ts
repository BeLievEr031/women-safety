import { Schema, model } from "mongoose"
import { IContact } from "../types"

const contactSchema = new Schema<IContact>({
    clerkId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    }

}, {
    timestamps: true
})

const Contact = model<IContact>("Contact", contactSchema)
export default Contact;