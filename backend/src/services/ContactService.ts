import Contact from "../model/Contact";
import { IContact } from "../types";

class ContactService {
    // Create a new contact
    async create(contactData: IContact): Promise<Contact> {
        return await Contact.create(contactData);
    }

    // Get all contacts with pagination
    async getAll(userId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? "ASC" : "DESC";

        const { rows: contacts, count: totalContacts } = await Contact.findAndCountAll({
            where: { clerkId: userId },
            order: [[sortBy, sortOrder]],
            offset,
            limit,
        });

        return {
            contacts,
            pagination: {
                totalContacts,
                currentPage: page,
                totalPages: Math.ceil(totalContacts / limit),
            },
        };
    }

    // Get contact by ID
    async getById(contactId: number): Promise<Contact | null> {
        return await Contact.findByPk(contactId);
    }

    // Update contact details
    async update(contactId: number, updateData: Partial<IContact>): Promise<[number, Contact[]]> {
        return await Contact.update(updateData, { where: { id: contactId }, returning: true });
    }

    // Delete a contact
    async delete(contactId: number): Promise<number> {
        return await Contact.destroy({ where: { id: contactId } });
    }
}

export default ContactService;
