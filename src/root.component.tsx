import React, { useEffect, useState } from "react";
import { addContact, deleteContactById, fetchContacts } from "./api/contacts";

// @ts-ignore
import { IRootProps, IContact } from "@cd/models";

const Root = (props: IRootProps) => {
  const [contacts, setContacts] = useState(fetchContacts);

  useEffect(() => {
    const subscription = props.eventer.subscribe(
      "CONTACT_ADDED",
      (msg, data) => {
        if (data) {
          addContact(data);

          setContacts(fetchContacts());
        }
      }
    );

    return () => {
      props.eventer.unsubscribe(subscription);
    };
  }, [props.eventer]);

  const deleteContact = (id) => {
    deleteContactById(id);

    setContacts(fetchContacts());
  };

  const contactList = contacts.map((contact) => (
    <tr key={contact.id}>
      <td className="border px-8 py-4">{contact.name}</td>
      <td className="border px-8 py-4">{contact.email}</td>
      <td className="border px-8 py-4">{contact.phone}</td>
      <td className="border px-8 py-4">
        <button
          className="bg-danger px-8 py-2 rounded-md text-white"
          onClick={() => deleteContact(contact.id)}
        >
          delete
        </button>
      </td>
    </tr>
  ));

  return (
    <section className="px-2 ">
      <table className="shadow-lg bg-white text-black w-full">
        <thead>
          <tr>
            <th className="bg-blue-100 border text-left px-8 py-4">Name</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Email</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Phone</th>
            <th className="bg-blue-100 border text-left px-8 py-4">Actions</th>
          </tr>
        </thead>
        <tbody>{contactList}</tbody>
      </table>
    </section>
  );
};

export default React.memo(Root);
