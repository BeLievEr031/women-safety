import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

interface IDangerZone {
    id?: number;
    lat: number;
    lng: number;
    clerkId: string;
    zoneName: string;
    createdAt?: Date;
}

class DangerZone extends Model<IDangerZone> {
    lat: number | undefined;
    lng: number | undefined;
    clerkId: string | undefined;
    zoneName: string | undefined;
}

DangerZone.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        clerkId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zoneName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "DangerZone",
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

export default DangerZone;
