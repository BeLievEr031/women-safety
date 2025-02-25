import api from ".";
import { IContact, IPagination, IPhone } from "../types";

export const createContact = (data: IContact) => api.post("/contact", data)

export const fetchContact = (pagination: IPagination) => api.get(`/contact?page=${pagination.page}&limit=${pagination.limit}&sortBy=${pagination.sortBy}&order=${pagination.order}&userId=${pagination.userId!}`)

export const deleteContact = (id: number) => api.delete(`/contact/${id}`)


export const sendAlert = (data: IPhone) => api.post("/contact/alert", data)