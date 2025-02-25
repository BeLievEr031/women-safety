import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import AlertService from "../services/AlertService";
import { HTTP_STATUS } from "../utils/constant";
import { AlertRequest, PaginationRequest } from "../types";

class AlertController {
    constructor(private alertService: AlertService) {
        this.alertService = alertService;
    }

    // Create Alert
    async create(req: AlertRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const alert = await this.alertService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: alert,
                message: "Alert created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get All Alerts
    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const userId = req.query.userId as string;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.alertService.getAll(userId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Alerts fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get Alert By ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const alertId = Number(req.params.id);
            if (isNaN(alertId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid alert ID" });
                return;
            }

            const alert = await this.alertService.getById(alertId);
            if (!alert) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Alert not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: alert });
        } catch (error) {
            next(error);
        }
    }

    async update(req: AlertRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const alertId = Number(req.params!.id);
            if (isNaN(alertId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid alert ID" });
                return;
            }

            const [affectedRows, updatedAlert] = await this.alertService.update(alertId, req.body);
            if (affectedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Alert not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedAlert[0], // Sequelize returns an array, so we take the first element
                message: "Alert updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }


    // Delete Alert
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const alertId = Number(req.params.id);
            if (isNaN(alertId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid alert ID" });
                return;
            }

            const deletedRows = await this.alertService.delete(alertId);
            if (deletedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Alert not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Alert deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default AlertController;
