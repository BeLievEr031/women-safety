import api from ".";
import { IAlert, IContact, IPagination, IPhone, IReportIncident } from "../types";

export const createContact = (data: IContact) => api.post("/contact", data)

export const fetchContact = (pagination: IPagination) => api.get(`/contact?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&userId=${pagination.userId!}`)

export const deleteContact = (id: number) => api.delete(`/contact/${id}`)


// CRUD for Alert.
export const sendAlert = (data: IPhone) => api.post("/contact/alert", data)

export const createAlert = (data: IAlert) => api.post("/alert", data)

export const fetchAlert = (pagination: IPagination) => api.get(`/alert?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&userId=${pagination.userId!}`)


// CRUD For Incident Report

export const createIncident = (data: IReportIncident) => api.post("/report-incident", data)

export const fetchIncident = (pagination: IPagination) => api.get(`/report-incident?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}`)