import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/database";

interface IContact {
    id?: number;
    clerkId: string;
    name: string;
    phone: string;
}

class Contact extends Model<IContact> {
    name: string | undefined;
    phone: string | undefined;
}

Contact.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        clerkId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Contact",
        timestamps: true,
        hooks: {
            beforeCreate: (contact: Contact) => {
                contact.name = contact.name!.trim();
                contact.phone = contact.phone!.trim();
            },
            beforeUpdate: (contact: Contact) => {
                contact.name = contact.name!.trim();
                contact.phone = contact.phone!.trim();
            },
        },
    }
);

export default Contact;
