const idContactList = document.getElementById('idContactList');
idContactList.innerHTML = 'Contact list will be displayed here...';

const basePath = "http://localhost:8080";
// const basePath = "https://contact-list-api.herokuapp.com";

const getContacts = async () => {
    const response = await fetch(`${basePath}/api/contact/all`);
    const contacts = await response.json();
    return contacts;
}

const showContacts = async () => {
    const contacts = await getContacts();
    // Create a table

    let table = '<table border="1" class="table table-striped">';
    table += '<tr>';
    table += '<th>Name</th>';
    table += '<th>Email</th>';
    table += '<th>Mobile</th>';
    table += '<th>Address</th>';
    table += '<th>Edit</th>';
    table += '<th>Delete</th>';
    table += '</tr>';

    contacts.forEach(contact => {
        table += '<tr>';
        table += `<td>${contact.name}</td>`;
        table += `<td>${contact.email}</td>`;
        table += `<td>${contact.mobile}</td>`;
        table += `<td>${addressToStr(contact.address)}</td>`;
        table += `<td><a href="edit-contact.html?id=${contact.id}">Edit</a></td>`;  
        table += `<td><a href="delete-contact.html?id=${contact.id}">Delete</a></td>`;  
        table += '</tr>';
    });

    table += '</table>';
    idContactList.innerHTML = table;
}

const addressToStr = (address) => {
    let addressStr = '';
    addressStr += address.city + ', ';
    addressStr += address.state + ', ';
    addressStr += address.zipCode;
    addressStr += ', ' + address.country;
    return addressStr;
}
showContacts();