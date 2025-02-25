import React, { useState } from "react";
import Button from "../../components/Button";

interface Props {
    zone: { id: number; name: string; lat: number; lng: number };
    onUpdateZone: (zone: { id: number; name: string; lat: number; lng: number }) => void;
    onClose: () => void;
}

const EditDangerZoneForm: React.FC<Props> = ({ zone, onUpdateZone, onClose }) => {
    const [name, setName] = useState(zone.name);
    const [lat, setLat] = useState<number | "">(zone.lat);
    const [lng, setLng] = useState<number | "">(zone.lng);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || lat === "" || lng === "") return;

        onUpdateZone({ id: zone.id, name, lat: Number(lat), lng: Number(lng) });
    };

    return (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Edit Danger Zone</h2>
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
                        <Button type="submit" className="text-white px-4 py-2 rounded-md">
                            Update
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

export default EditDangerZoneForm;
