import React, { useState } from "react";

interface Props {
    onAddContact: (contact: { name: string; phone: string }) => void;
    onClose: () => void;
}

const AddContactForm: React.FC<Props> = ({ onAddContact, onClose }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) return;
        onAddContact({ name, phone });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">Add Emergency Contact</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md"
                    />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md">
                            Add
                        </button>
                        <button type="button" onClick={onClose} className="text-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContactForm;
