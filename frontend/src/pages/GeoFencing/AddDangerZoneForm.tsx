import React, { useState } from "react";
import Button from "../../components/Button";

interface Props {
    onAddZone: (zone: { name: string; lat: number; lng: number }) => void;
    onClose: () => void;
}

const AddDangerZoneForm: React.FC<Props> = ({ onAddZone, onClose }) => {
    const [name, setName] = useState("");
    const [lat, setLat] = useState<number | "">("");
    const [lng, setLng] = useState<number | "">("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || lat === "" || lng === "") return;

        onAddZone({ name, lat: Number(lat), lng: Number(lng) });
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Danger Zone</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Zone Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Latitude"
                        value={lat}
                        onChange={(e) => setLat(e.target.value ? Number(e.target.value) : "")}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Longitude"
                        value={lng}
                        onChange={(e) => setLng(e.target.value ? Number(e.target.value) : "")}
                        className="w-full border px-3 py-2 rounded-md"
                        required
                    />
                    <div className="flex justify-between">
                        <Button type="submit" className="px-4 py-2 text-white rounded-md">
                            Add
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

export default AddDangerZoneForm;
