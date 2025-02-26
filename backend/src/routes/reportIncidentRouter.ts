import express, { Request, Response, NextFunction } from "express";
import ReportIncidentController from "../controller/ReportIncidentController";
import ReportIncidentService from "../services/ReportIncidentService";
import { reportIncidentValidator } from "../validators/reportIncidentValidator";
import { ReportIncidentRequest, PaginationRequest } from "../types";

const reportIncidentRouter = express.Router();

const reportIncidentService = new ReportIncidentService();
const reportIncidentController = new ReportIncidentController(reportIncidentService);

// Create Incident Report
reportIncidentRouter.post("/", reportIncidentValidator, (req: Request, res: Response, next: NextFunction) =>
    reportIncidentController.create(req as ReportIncidentRequest, res, next)
);

// Get All Incident Reports
reportIncidentRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
    reportIncidentController.getAll(req as PaginationRequest, res, next)
);

// Get Incident Report By ID
reportIncidentRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    reportIncidentController.getById(req, res, next)
);

// Update Incident Report
reportIncidentRouter.put("/:id", reportIncidentValidator, (req: Request, res: Response, next: NextFunction) =>
    reportIncidentController.update(req as ReportIncidentRequest, res, next)
);

// Delete Incident Report
reportIncidentRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    reportIncidentController.delete(req, res, next)
);

export default reportIncidentRouter;
