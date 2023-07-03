const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const contacts = require("./contacts");

const invokeAction = async ({ action, contactId, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(contactId);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const deleteContact = await contacts.removeContact(contactId);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction({
  action: argv.action,
  contactId: argv.id,
  name: argv.name,
  email: argv.email,
  phone: argv.phone,
});
