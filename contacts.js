const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  try {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath);
    const parsedAllContacts = JSON.parse(allContacts);

    const id = parsedAllContacts.find(contact => {
      if (contactId === contact.id) {
        return contact;
      }
    });

    if (id) {
      return id;
    }

    return console.log('There is no such id');
  } catch (error) {
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await fs.readFile(contactsPath);
    const parsedAllContacts = JSON.parse(allContacts);

    const id = parsedAllContacts.find(contact => {
      if (contact.id === contactId) {
        return contact;
      }
    });

    if (!id) {
      return console.log('There is no such id');
    }

    const index = parsedAllContacts.indexOf(id);
    parsedAllContacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(parsedAllContacts));
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(allContacts);

    const newId = parsedContacts.length + 1;

    const newContact = { id: newId, name: name, email: email, phone: phone };

    parsedContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
