import React from "react";
import { useNavigate } from "react-router-dom";

interface Incident {
    id: number;
    createdAt: string;
    incidentType: string;
    lat: number;
    lng: number;
    description: string;
}

interface IProp {
    title: string;
    incidents: Incident[];
}

const PastIncidents: React.FC<IProp> = ({ title, incidents }) => {
    const navigate = useNavigate();

    const extractDateAndTime = (timestamp: string) => {
        const dateObj = new Date(timestamp);
        const formattedDate = dateObj.toLocaleDateString("en-GB");
        const formattedTime = dateObj.toLocaleTimeString("en-GB");
        return { formattedDate, formattedTime };
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Title Section */}
            <h2 className="text-2xl font-semibold text-center">Past {title} History</h2>
            <p className="text-gray-500 text-center mt-2">
                This is a list of past incidents you've reported.
            </p>

            {/* Incidents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {incidents.map((incident) => (
                    <div key={incident.id} className="bg-white shadow-md rounded-lg p-4 border">
                        <h3 className="text-lg font-semibold">{incident.incidentType}</h3>
                        <p className="text-gray-600">Date: {extractDateAndTime(incident.createdAt).formattedDate}</p>
                        <p className="text-gray-600">Time: {extractDateAndTime(incident.createdAt).formattedTime}</p>
                        <p className="text-gray-600 mt-2">Latitude: {incident.lat}</p>
                        <p className="text-gray-600 mt-2">Longitude: {incident.lng}</p>
                        <p className="text-gray-600 mt-2">Description: {incident.description}</p>
                        <button
                            className="mt-4 w-full text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                            onClick={() => {
                                return navigate(`/track-user?id=${incident.id}&lat=${incident.lat}&lng=${incident.lng}`, { replace: true });
                            }}
                        >
                            View Incident
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastIncidents;
