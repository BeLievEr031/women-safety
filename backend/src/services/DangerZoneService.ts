import DangerZone from "../model/DangerZone";
import { IDangerZone } from "../types";

class DangerZoneService {
    // Create a new danger zone
    async create(zoneData: IDangerZone): Promise<DangerZone> {
        return await DangerZone.create(zoneData);
    }

    // Get all danger zones with pagination
    async getAll(userId: string, page: number, limit: number, sortBy: string, order: string) {
        const offset = (page - 1) * limit;
        const sortOrder = order === "asc" ? "ASC" : "DESC";

        const { rows: zones, count: totalZones } = await DangerZone.findAndCountAll({
            where: { clerkId: userId },
            order: [[sortBy, sortOrder]],
            offset,
            limit,
        });

        return {
            zones,
            pagination: {
                totalZones,
                currentPage: page,
                totalPages: Math.ceil(totalZones / limit),
            },
        };
    }

    // Get danger zone by ID
    async getById(zoneId: number): Promise<DangerZone | null> {
        return await DangerZone.findByPk(zoneId);
    }

    // Update danger zone details
    async update(zoneId: number, updateData: Partial<IDangerZone>): Promise<[number, DangerZone[]]> {
        return await DangerZone.update(updateData, { where: { id: zoneId }, returning: true });
    }

    // Delete a danger zone
    async delete(zoneId: number): Promise<number> {
        return await DangerZone.destroy({ where: { id: zoneId } });
    }
}

export default DangerZoneService;
