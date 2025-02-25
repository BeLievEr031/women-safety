import React from "react";

interface Alert {
    id: number;
    createdAt: string;
    time: string;
    lat: number;
    lng: number;
}

// const alerts: Alert[] = [
//     { id: 1, date: "2023-10-15", time: "14:30" },
//     { id: 2, date: "2023-10-14", time: "09:00" },
//     { id: 3, date: "2023-10-13", time: "18:45" },
// ];

interface IProp {
    alerts: Alert[];
}

const PastAlerts: React.FC<IProp> = ({ alerts }) => {
    const extractDateAndTime = (timestamp: string) => {
        const dateObj = new Date(timestamp);
        const formattedDate = dateObj.toLocaleDateString("en-GB");
        const formattedTime = dateObj.toLocaleTimeString("en-GB");
        return { formattedDate, formattedTime }
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Title Section */}
            <h2 className="text-2xl font-semibold text-center">Past Alerts History</h2>
            <p className="text-gray-500 text-center mt-2">
                This is list of past locations you've shared or alerts you've sent.
            </p>

            {/* Alerts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {alerts.map((alert) => (
                    <div key={alert.id} className="bg-white shadow-md rounded-lg p-4 border">
                        <h3 className="text-lg font-semibold">Alert Details</h3>
                        <p className="text-gray-600">Date: {extractDateAndTime(alert.createdAt).formattedDate}</p>
                        <p className="text-gray-600">Time: {extractDateAndTime(alert.createdAt).formattedTime}</p>
                        <button
                            className="mt-4 w-full text-blue-600 border border-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                            View Alert
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PastAlerts;
