import React, { useState } from "react";
import AddDangerZoneForm from "./AddDangerZoneForm";
// import EditDangerZoneForm from "./EditDangerZoneForm";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import Button from "../../components/Button";
import { useDangerZoneAddMutation } from "../../hooks/useDangerZone";
import { useUser } from "@clerk/clerk-react";
export interface DangerZone {
    zoneName: string;
    id: number;
    name: string;
    lat: number;
    lng: number;
}


interface Iprop {
    zones: DangerZone[] | []
}

const DangerZones: React.FC<Iprop> = ({ zones = [] }) => {
    const { user } = useUser();
    const { mutate } = useDangerZoneAddMutation();

    // const [editingZone, setEditingZone] = useState<DangerZone | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Function to add a new danger zone
    const handleAddZone = (newZone: DangerZone) => {
        mutate({
            zoneName: newZone.name,
            lat: newZone.lat,
            lng: newZone.lng,
            clerkId: user!.id
        });
        setIsAdding(false);
    };

    // Function to update an existing danger zone
    // const handleUpdateZone = (updatedZone: DangerZone) => {
    //     setEditingZone(null);
    // };

    // Function to delete a danger zone
    const handleDeleteZone = (id: number) => {
        console.log(id);
    };

    return (
        <div className="mx-auto mt-6 text-center">
            <div className="w-full flex justify-end my-4">
                <Button
                    iconLeft={MdOutlineAddLocationAlt}
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md mt-6"
                >
                    Add Danger Zone
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {zones && zones.map((zone) => (
                    <div key={zone.id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold  text-left">{zone.zoneName}</p>
                            <p className="text-gray-600">
                                Lat: {zone.lat.toFixed(6)}, Lng: {zone.lng.toFixed(6)}
                            </p>
                        </div>
                        <div className="space-x-4">
                            {/* <button
                                onClick={() => setEditingZone(zone)}
                                className="text-blue-600"
                            >
                                Edit
                            </button> */}
                            <button
                                onClick={() => handleDeleteZone(zone.id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Danger Zone Form */}
            {isAdding && (
                <AddDangerZoneForm
                    onAddZone={(data) => handleAddZone(data as DangerZone)}
                    onClose={() => setIsAdding(false)}
                />
            )}

            {/* Edit Danger Zone Form */}
            {/* {editingZone && (
                // <EditDangerZoneForm
                //     zone={editingZone}
                //     onUpdateZone={handleUpdateZone}
                //     onClose={() => setEditingZone(null)}
                // />
            )} */}
        </div>
    );
};

export default DangerZones;
