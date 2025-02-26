/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { IReportIncident } from "../../types";

interface Props {
    onReportIncident: (incident: IReportIncident) => void;
    onClose: () => void;
}

const incidentTypes = ["Harassment", "Robbery", "Assault", "Vandalism", "Other"];

const ReportIncidentForm: React.FC<Props> = ({ onReportIncident, onClose }) => {
    const [incidentType, setIncidentType] = useState("");
    const [description, setDescription] = useState("");
    const [lat, setLat] = useState<number | "">("");
    const [lng, setLng] = useState<number | "">("");

    const [location, setLocation] = useState<[number, number] | [null, null]>([null, null]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation([position.coords.latitude, position.coords.longitude]);
                setError(null);
                setLoading(false);
            },
            (error) => {
                console.log("Error ", error);
                setError(error.message);
                setLoading(false);
            }
        );
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!incidentType || !description || location[0] === null || location[1] === null) return;

        onReportIncident({
            description,
            incidentType,
            lat: location[0],
            lng: location[1]
        });
    };


    if (error) {
        return <div>{error}</div>
    }


    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Report Incident</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Incident Type Dropdown */}
                    <select
                        value={incidentType}
                        onChange={(e) => setIncidentType(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    >
                        <option value="" disabled>Select Incident Type</option>
                        {incidentTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    {/* Location Inputs */}
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={location[0]!}
                        onChange={(e) => setLat(e.target.value ? Number(e.target.value) : "")}
                        className="w-full border px-3 py-2 rounded-md"
                        readOnly
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={location[1]!}
                        onChange={(e) => setLng(e.target.value ? Number(e.target.value) : "")}
                        className="w-full border px-3 py-2 rounded-md"
                        // required
                        readOnly
                    />

                    {/* Description */}
                    <textarea
                        placeholder="Describe the incident"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md h-24 resize-none"
                        required
                    ></textarea>

                    {/* Buttons */}
                    <div className="flex justify-between">
                        <Button type="submit" className="px-4 py-2 text-white rounded-md" disabled={loading}>
                            {!loading ? "Report" :
                                <p className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></p>
                            }
                        </Button>
                        <Button variant="outline" type="button" onClick={onClose} className="text-gray-600">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportIncidentForm;
