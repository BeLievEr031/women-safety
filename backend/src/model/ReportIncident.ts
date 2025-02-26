import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

interface IReportIncident {
    id?: number;
    incidentType: string;
    lat: number;
    lng: number;
    description: string;
    createdAt?: Date;
}

class ReportIncident extends Model<IReportIncident> {
    incidentType!: string;
    lat!: number;
    lng!: number;
    description!: string;
}

ReportIncident.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        incidentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lat: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        lng: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true, // Can be optional if required
        },
    },
    {
        sequelize,
        modelName: "ReportIncident",
        timestamps: true, // Handles createdAt and updatedAt automatically
    }
);

export default ReportIncident;
