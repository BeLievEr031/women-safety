import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import ReportIncidentService from "../services/ReportIncidentService";
import { HTTP_STATUS } from "../utils/constant";
import { ReportIncidentRequest, PaginationRequest } from "../types";

class ReportIncidentController {
    constructor(private reportIncidentService: ReportIncidentService) {
        this.reportIncidentService = reportIncidentService;
    }

    // Create Incident Report
    async create(req: ReportIncidentRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const report = await this.reportIncidentService.create(req.body);
            res.status(HTTP_STATUS.CREATED).json({
                success: true,
                data: report,
                message: "Incident reported successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Get All Incident Reports
    async getAll(req: PaginationRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sortBy = (req.query.sortBy as string) || "createdAt";
            const order = (req.query.order as string) || "desc";

            const result = await this.reportIncidentService.getAll(page, limit, sortBy, order);
            res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "Incident reports fetched successfully.",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    // Get Incident Report By ID
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const reportId = Number(req.params.id);
            if (isNaN(reportId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid report ID" });
                return;
            }

            const report = await this.reportIncidentService.getById(reportId);
            if (!report) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Incident report not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, data: report });
        } catch (error) {
            next(error);
        }
    }

    // Update Incident Report
    async update(req: ReportIncidentRequest, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const reportId = Number(req.params!.id);
            if (isNaN(reportId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid report ID" });
                return;
            }

            const [affectedRows, updatedReport] = await this.reportIncidentService.update(reportId, req.body);
            if (affectedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Incident report not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({
                success: true,
                data: updatedReport[0], // Sequelize returns an array, so we take the first element
                message: "Incident report updated successfully.",
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete Incident Report
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: errors.array() });
                return;
            }

            const reportId = Number(req.params.id);
            if (isNaN(reportId)) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Invalid report ID" });
                return;
            }

            const deletedRows = await this.reportIncidentService.delete(reportId);
            if (deletedRows === 0) {
                res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Incident report not found" });
                return;
            }

            res.status(HTTP_STATUS.OK).json({ success: true, message: "Incident report deleted successfully." });
        } catch (error) {
            next(error);
        }
    }
}

export default ReportIncidentController;
