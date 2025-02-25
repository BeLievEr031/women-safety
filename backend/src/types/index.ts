import { Request } from "express";

export interface IContact {
    clerkId: string;
    name: string;
    phone: string;
}


export interface ContactRequest extends Request {
    body: IContact
}


export interface IPhone {
    numbers: string[]
}

export interface SendAlertRequest {
    body: IPhone
}

export interface PaginationRequest extends Request {
    query: {
        page: string;
        limit: string;
        sortBy: string;
        order: "asc" | "desc";
        parentId?: string;
        belong?: string;
        chapterId?: string;
        examId?: string;
        userId?: string;

    }
}