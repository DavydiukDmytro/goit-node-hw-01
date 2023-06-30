const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		return JSON.parse(data);
	} catch (error) {
		return error;
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		if (contacts.message) return contacts;
		const result = contacts.find((item) => item.id === contactId);
		return result || null;
	} catch (error) {
		return error;
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		if (contacts.message) return contacts;
		const index = contacts.findIndex((item) => item.id == contactId);
		if (index === -1) return null;
		const [result] = contacts.splice(index, 1);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return result;
	} catch (error) {
		return error;
	}
}

async function addContact(name, email, phone) {
	try {
		const contacts = await listContacts();
		if (contacts.message) return contacts;
		const newContacts = {
			id: nanoid(),
			name,
			email,
			phone,
		};
		contacts.push(newContacts);
		fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContacts;
	} catch (error) {
		return error;
	}
}

module.exports = { listContacts, getContactById, removeContact, addContact };
