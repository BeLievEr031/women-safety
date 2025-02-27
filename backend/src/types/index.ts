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

export interface IAlert {
    lat: number;
    lng: number;
    clerkId: string;
}

export interface AlertRequest extends Request {
    body: IAlert
}

export interface IReportIncident {
    id?: number;
    incidentType: string;
    lat: number;
    lng: number;
    description: string;
    createdAt?: Date;
}

export interface ReportIncidentRequest extends Request {
    body: IReportIncident
}

export interface IDangerZone {
    lat: number;
    lng: number;
    clerkId: string;
    zoneName: string;
}

export interface DangerZoneRequest extends Request {
    body: IDangerZone
}