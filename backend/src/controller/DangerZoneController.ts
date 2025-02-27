import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import DangerZoneService from "../services/DangerZoneService";
import { HTTP_STATUS } from "../utils/constant";
import { DangerZoneRequest, PaginationRequest } from "../types";

class DangerZoneController {
    constructor(private dangerZoneService: DangerZoneService) {
        this.dangerZoneService = dangerZoneService;
    }

    // Create Danger Zone
    async create(req: DangerZoneRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const zone = await this.dangerZoneService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: zone,
                message: "Danger zone created successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get All Danger Zones
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

            const result = await this.dangerZoneService.getAll(userId, page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Danger zones fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get Danger Zone By ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const zoneId = Number(req.params.id);
            if (isNaN(zoneId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid danger zone ID" });
                return;
            }

            const zone = await this.dangerZoneService.getById(zoneId);
            if (!zone) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Danger zone not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: zone });
        } catch (error) {
            next(error);
        }
    }

    // Update Danger Zone
    async update(req: DangerZoneRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const zoneId = Number(req.params!.id);
            if (isNaN(zoneId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid danger zone ID" });
                return;
            }

            const [affectedRows, updatedZone] = await this.dangerZoneService.update(zoneId, req.body);
            if (affectedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Danger zone not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedZone[0], // Sequelize returns an array, so we take the first element
                message: "Danger zone updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete Danger Zone
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const zoneId = Number(req.params.id);
            if (isNaN(zoneId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid danger zone ID" });
                return;
            }

            const deletedRows = await this.dangerZoneService.delete(zoneId);
            if (deletedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Danger zone not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Danger zone deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default DangerZoneController;
