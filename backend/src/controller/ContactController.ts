import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ContactService from "../services/ContactService";
import { HTTP_STATUS } from "../utils/constant";
import { ContactRequest, PaginationRequest, SendAlertRequest } from "../types";
import sendOTPs from "../utils/sendAlertMsg";

class ContactController {
    constructor(private contactService: ContactService) {
        this.contactService = contactService;
    }

    // Send Notification

    async sendAlert(req: SendAlertRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const { numbers, url } = req.body;
            await sendOTPs(numbers, url)

            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Alert has been sent."
            })
        } catch (error) {
            next(error)
        }
    }

    // Create Contact
    async create(req: ContactRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const contact = await this.contactService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: contact,
                message: "Contact created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get All Contacts
    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return
            }

            const userId = req.query.userId as string;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.contactService.getAll(userId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Contacts fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get Contact By ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const contactId = Number(req.params.id);
            if (isNaN(contactId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid contact ID" });
                return;
            }

            const contact = await this.contactService.getById(contactId);
            if (!contact) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Contact not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: contact });
        } catch (error) {
            next(error);
        }
    }

    // Update Contact
    async update(req: ContactRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const contactId = Number(req.params.id);
            if (isNaN(contactId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid contact ID" });
                return
            }

            const [affectedRows, updatedContact] = await this.contactService.update(contactId, req.body);
            if (affectedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Contact not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedContact[0], // Sequelize returns an array, so we take the first element
                message: "Contact updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete Contact
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const contactId = Number(req.params.id);
            if (isNaN(contactId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid contact ID" });
                return;
            }

            const deletedRows = await this.contactService.delete(contactId);
            if (deletedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Contact not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Contact deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ContactController;
