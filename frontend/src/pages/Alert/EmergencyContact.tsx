import React, { useState } from "react";
import AddContactForm from "./AddContactForm";
import EditContactForm from "./EditContactForm";

interface Contact {
    id: number;
    name: string;
    phone: string;
}

const EmergencyContacts: React.FC = () => {
    const [contacts, setContacts] = useState<Contact[]>([
        { id: 1, name: "John Doe", phone: "+1 234 567 890" },
        { id: 2, name: "Jane Smith", phone: "+1 234 567 891" },
    ]);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddContact = (newContact: Contact) => {
        setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
        setIsAdding(false);
    };

    const handleUpdateContact = (updatedContact: Contact) => {
        setContacts(
            contacts.map((contact) =>
                contact.id === updatedContact.id ? updatedContact : contact
            )
        );
        setEditingContact(null);
    };

    const handleDeleteContact = (id: number) => {
        setContacts(contacts.filter((contact) => contact.id !== id));
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md mb-6">
                Alert Now
            </button>

            <div className="space-y-4">
                {contacts.map((contact) => (
                    <div key={contact.id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold">{contact.name}</p>
                            <p className="text-gray-600">{contact.phone}</p>
                        </div>
                        <div className="space-x-4">
                            <button
                                onClick={() => setEditingContact(contact)}
                                className="text-blue-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteContact(contact.id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => setIsAdding(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md mt-6"
            >
                Add Emergency Contact
            </button>

            {isAdding && <AddContactForm onAddContact={(data) => handleAddContact(data as Contact)} onClose={() => setIsAdding(false)} />}
            {editingContact && (
                <EditContactForm contact={editingContact} onUpdateContact={handleUpdateContact} onClose={() => setEditingContact(null)} />
            )}
        </div>
    );
};

export default EmergencyContacts;
