import express, { Request, Response, NextFunction } from "express";
import AlertController from "../controller/AlertController";
import AlertService from "../services/AlertService";
import { alertValidator } from "../validators/alertValidator";
import { AlertRequest, PaginationRequest } from "../types";

const alertRouter = express.Router();

const alertService = new AlertService();
const alertController = new AlertController(alertService);

// Create Alert
alertRouter.post("/", alertValidator, (req: Request, res: Response, next: NextFunction) =>
    alertController.create(req as AlertRequest, res, next)
);

// Get All Alerts
alertRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
    alertController.getAll(req as PaginationRequest, res, next)
);

// Get Alert By ID
alertRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    alertController.getById(req, res, next)
);

// Update Alert
alertRouter.put("/:id", alertValidator, (req: Request, res: Response, next: NextFunction) =>
    alertController.update(req as AlertRequest, res, next)
);

// Delete Alert
alertRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    alertController.delete(req, res, next)
);

export default alertRouter;
