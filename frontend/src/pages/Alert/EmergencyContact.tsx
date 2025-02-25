import React, { useState } from "react";
import AddContactForm from "./AddContactForm";
import EditContactForm from "./EditContactForm";
import { useAlertMutation, useContactAddMutation, useContactDeleteMutation, useContactFetchQuery } from "../../hooks/useContact";
import { useUser } from "@clerk/clerk-react";
import { IContact, IPagination } from "../../types";

interface Contact {
    id: number;
    name: string;
    phone: string;
}

const EmergencyContacts: React.FC = () => {
    const { mutate } = useContactAddMutation();
    const { mutate: deleteMutation } = useContactDeleteMutation();
    const { mutate: alertMutation } = useAlertMutation();
    const { user } = useUser();

    const [pagination] = useState<IPagination>({
        limit: 20,
        order: "desc",
        page: 1,
        sortBy: "createdAt",
        userId: user!.id
    })

    const { isPending, isError, error, data } = useContactFetchQuery(pagination);
    const [contacts, setContacts] = useState<Contact[]>([
        { id: 1, name: "John Doe", phone: "+91234567890" },
        { id: 2, name: "Jane Smith", phone: "+91234567891" },
    ]);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddContact = (newContact: Contact) => {
        mutate({ ...newContact, clerkId: user!.id });
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
        deleteMutation(id);
    };

    if (isPending) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    console.log(data);

    const handleSendAlert = () => {

        const numbers = data?.data?.data?.contacts.map((item: IContact) => {
            return item.phone
        })

        console.log(numbers);

        alertMutation({ numbers });
    }

    return (
        <div className="max-w-3xl mx-auto mt-10 text-center">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md mb-6" onClick={handleSendAlert}>
                Alert Now
            </button>

            <div className="space-y-4">
                {data?.data?.data?.contacts?.map((contact: IContact) => (
                    <div key={contact.id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold text-left">{contact.name}</p>
                            <p className="text-gray-600 text-left">{contact.phone}</p>
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
