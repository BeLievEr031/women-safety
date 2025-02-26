import ReportIncident from "../model/ReportIncident";
import { IReportIncident } from "../types";

class ReportIncidentService {
    // Create a new incident report
    async create(incidentData: IReportIncident): Promise<ReportIncident> {
        return await ReportIncident.create(incidentData);
    }

    // Get all incident reports with pagination
    async getAll(page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? "ASC" : "DESC";

        const { rows: incidents, count: totalIncidents } = await ReportIncident.findAndCountAll({
            order: [[sortBy, sortOrder]],
            offset,
            limit,
        });

        return {
            incidents,
            pagination: {
                totalIncidents,
                currentPage: page,
                totalPages: Math.ceil(totalIncidents / limit),
            },
        };
    }

    // Get incident report by ID
    async getById(incidentId: number): Promise<ReportIncident | null> {
        return await ReportIncident.findByPk(incidentId);
    }

    // Update incident report details
    async update(incidentId: number, updateData: Partial<IReportIncident>): Promise<[number, ReportIncident[]]> {
        return await ReportIncident.update(updateData, { where: { id: incidentId }, returning: true });
    }

    // Delete an incident report
    async delete(incidentId: number): Promise<number> {
        return await ReportIncident.destroy({ where: { id: incidentId } });
    }
}

export default ReportIncidentService;
