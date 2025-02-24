import React from "react";

interface FeatureCardProps {
    icon: React.ElementType;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
    return (
        <div className="p-4 rounded-lg text-center cursor-pointer border-gray-200 hover:shadow-xl transition">
            <Icon size={30} className="mx-auto text-blue-600" />
            <p className="font-semibold mt-2">{title}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default FeatureCard;
