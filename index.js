const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'getAll':
			const allContacts = await listContacts();
			console.log(allContacts);
			break;
		case 'getById':
			const oneContact = await getContactById(id);
			console.log(oneContact);
			break;
		case 'removeById':
			const removeContactById = await removeContact(id);
			console.log(removeContactById);
			break;
		case 'add':
			const newContact = await addContact(name, email, phone);
			console.log(newContact);
			break;
		default:
			console.log('Unknown action ');
	}
};

// invokeAction({ action: 'getAll' }); +
// invokeAction({ action: 'getById', id: 'rsKkOQUi80UsgVPCcLZZW' }); +
// invokeAction({ action: 'removeById', id: 'rsKkOQUi80UsgVPCcLZZW' }); +
// invokeAction({
// 	action: 'add',
// 	name: 'Dmytro Ivanov',
// 	email: 'ivanov@gmail.com',
// 	phone: '+380999999999',
// });
