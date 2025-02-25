import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

interface IAlert {
    id?: number;
    lat: number;
    lng: number;
    clerkId: string;
    createdAt?: Date;
}

class Alert extends Model<IAlert> {
    lat: number | undefined;
    lng: number | undefined;
    clerkId: string | undefined;
}

Alert.init(
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
    },
    {
        sequelize,
        modelName: "Alert",
        timestamps: true, // Since we're handling createdAt manually
    }
);

export default Alert;
