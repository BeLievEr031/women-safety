import express, { Request, Response, NextFunction } from "express";
import ContactController from "../controller/ContactController";
import ContactService from "../services/ContactService";
import { contactValidator } from "../validators/contactValidator";
import { ContactRequest, PaginationRequest } from "../types";
const router = express.Router();
const contactController = new ContactController(new ContactService());

// Create Contact
router.post("/", contactValidator, (req: Request, res: Response, next: NextFunction) => contactController.create(req as ContactRequest, res, next));

// Get All Contacts
router.get("/", (req: Request, res: Response, next: NextFunction) => contactController.getAll(req as PaginationRequest, res, next));

// Get Contact By ID
router.get("/:id", (req: Request, res: Response, next: NextFunction) => contactController.getById(req, res, next));

// Update Contact
router.put("/:id", contactValidator, (req: Request, res: Response, next: NextFunction) => contactController.update(req as ContactRequest, res, next));

// Delete Contact
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => contactController.delete(req, res, next));

export default router;
