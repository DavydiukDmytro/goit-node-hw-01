const { Command } = require('commander');
const { listContacts, getContactById, addContact, removeContact } = require('./contacts');

const program = new Command();
program
	.option('-a, --action <type>', 'chose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'getAll':
			const allContacts = await listContacts();
			allContacts.message ? console.log(allContacts.message) : console.table(allContacts);
			break;
		case 'getById':
			const oneContact = await getContactById(id);
			oneContact.message ? console.log(oneContact.message) : console.log(oneContact);
			break;
		case 'removeById':
			const removeContactById = await removeContact(id);
			removeContactById.message
				? console.log(removeContactById.message)
				: console.log(removeContactById);
			break;
		case 'add':
			const newContact = await addContact(name, email, phone);
			newContact.message ? console.log(newContact.message) : console.log(newContact);
			break;
		default:
			console.log('Unknown action ');
	}
};

invokeAction(argv);
