import React, { useState } from "react";
import AddDangerZoneForm from "./AddDangerZoneForm";
// import EditDangerZoneForm from "./EditDangerZoneForm";
import { MdOutlineAddLocationAlt } from "react-icons/md";
import Button from "../../components/Button";
import { useDangerZoneAddMutation } from "../../hooks/useDangerZone";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
export interface DangerZone {
    zoneName: string;
    id: number;
    name: string;
    lat: number;
    lng: number;
    setLat: React.Dispatch<React.SetStateAction<number>>,
    setLng: React.Dispatch<React.SetStateAction<number>>
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
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
    const handleAddZone = async (newZone: DangerZone) => {
        newZone.setLoading(true)
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newZone.name}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`)

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
            newZone.setLat(location.lat)
            newZone.setLng(location.lng)

            setTimeout(() => {
                mutate({
                    zoneName: newZone.name,
                    lat: location.lat,
                    lng: location.lng,
                    clerkId: user!.id
                });
                setIsAdding(false);
                toast.success("Safer zone added.")
                newZone.setLoading(false)

            }, 1500)
        } else {
            newZone.setLoading(false)
            console.error("Error: ", response.data.status);
        }


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
                    Add Safe Zone
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
