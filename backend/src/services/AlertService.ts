import Alert from "../model/Alert";
import { IAlert } from "../types";

class AlertService {
    // Create a new alert
    async create(alertData: IAlert): Promise<Alert> {
        return await Alert.create(alertData);
    }

    // Get all alerts with pagination
    async getAll(userId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? "ASC" : "DESC";

        const { rows: alerts, count: totalAlerts } = await Alert.findAndCountAll({
            where: { clerkId: userId },
            order: [[sortBy, sortOrder]],
            offset,
            limit,
        });

        return {
            alerts,
            pagination: {
                totalAlerts,
                currentPage: page,
                totalPages: Math.ceil(totalAlerts / limit),
            },
        };
    }

    // Get alert by ID
    async getById(alertId: number): Promise<Alert | null> {
        return await Alert.findByPk(alertId);
    }

    // Update alert details
    async update(alertId: number, updateData: Partial<IAlert>): Promise<[number, Alert[]]> {
        return await Alert.update(updateData, { where: { id: alertId }, returning: true });
    }

    // Delete an alert
    async delete(alertId: number): Promise<number> {
        return await Alert.destroy({ where: { id: alertId } });
    }
}

export default AlertService;
