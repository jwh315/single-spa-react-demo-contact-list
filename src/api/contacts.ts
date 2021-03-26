// @ts-ignore
import { IContact } from "@cd/models";
import { v4 as uuidv4 } from "uuid";

const persistToStorage = (contacts: IContact[]) => {
  localStorage.setItem("CONTACTS", JSON.stringify(contacts));
};

const seedContacts = () => {
  const contacts = [
    {
      id: uuidv4(),
      name: "John Doe",
      email: "john.doe@gmail.com",
      phone: "555 555-5555",
    } as IContact,
    {
      id: uuidv4(),
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      phone: "555 555-1111",
    } as IContact,
  ];

  persistToStorage(contacts);

  return contacts;
};

const loadFromStorage = () => {
  let contacts = localStorage.getItem("CONTACTS");

  if (contacts != null) {
    return JSON.parse(contacts);
  } else {
    return seedContacts();
  }
};

export function fetchContacts() {
  return loadFromStorage();
}

export function addContact(contact: IContact) {
  if (!contact.name.length) return;

  contact.id = uuidv4();

  const existingContacts = loadFromStorage();

  existingContacts.push(contact);

  persistToStorage(existingContacts);
}

export function deleteContactById(id: string) {
  const contacts = loadFromStorage();

  const newList = contacts.filter((contact) => contact.id !== id);

  persistToStorage(newList);
}
