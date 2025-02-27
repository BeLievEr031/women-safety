import { dangerZoneValidator } from './../validators/dangerZoneValidator';
import express, { Request, Response, NextFunction } from "express";
import DangerZoneController from "../controller/DangerZoneController";
import DangerZoneService from "../services/DangerZoneService";
import { DangerZoneRequest, PaginationRequest } from "../types";

const dangerZoneRouter = express.Router();

const dangerZoneService = new DangerZoneService();
const dangerZoneController = new DangerZoneController(dangerZoneService);

// Create Danger Zone
dangerZoneRouter.post("/", dangerZoneValidator, (req: Request, res: Response, next: NextFunction) =>
    dangerZoneController.create(req as DangerZoneRequest, res, next)
);

// Get All Danger Zones
dangerZoneRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
    dangerZoneController.getAll(req as PaginationRequest, res, next)
);

// Get Danger Zone By ID
dangerZoneRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
    dangerZoneController.getById(req, res, next)
);

// Update Danger Zone
dangerZoneRouter.put("/:id", dangerZoneValidator, (req: Request, res: Response, next: NextFunction) =>
    dangerZoneController.update(req as DangerZoneRequest, res, next)
);

// Delete Danger Zone
dangerZoneRouter.delete("/:id", (req: Request, res: Response, next: NextFunction) =>
    dangerZoneController.delete(req, res, next)
);

export default dangerZoneRouter;
