import axios from 'axios';
import {
    fetchContactRequest,
    fetchContactSuccess,
    fetchContactError,
    addContactRequest,
    addContactSuccess,
    addContactError,
    removeContactRequest,
    removeContactSuccess,
    removeContactError
} from './phoneBook-actions';

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => dispatch => {
    dispatch(fetchContactRequest());

    axios
        .get('/contacts')
        .then(({ data }) => dispatch(fetchContactSuccess(data)))
        .catch (error => dispatch(fetchContactError(error)));
};

const addContact = (name, number) => dispatch => {
    const contact = {
        name,
        number,
    };

    dispatch(addContactRequest());

    axios
        .post('/contacts', contact)
        .then(({ data }) => dispatch(addContactSuccess(data)))
        .catch(error => dispatch(addContactError(error)));
};

const removeContact = (contactId) => dispatch => {
    dispatch(removeContactRequest());

    axios
        .delete(`/contacts/${contactId}`)
        .then(() => dispatch(removeContactSuccess(contactId)))
        .catch(error => dispatch(removeContactError(error)));
};

const operations = {
    fetchContacts,
    addContact,
    removeContact
};

export default operations;