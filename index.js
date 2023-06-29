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
			console.table(allContacts);
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

invokeAction(argv);
