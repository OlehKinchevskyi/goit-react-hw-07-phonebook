import { createSelector } from '@reduxjs/toolkit';

const getLoading = state => state.phoneBook.loading;

const getFilter = state => state.phoneBook.filter;

const getAllContacts = state => state.phoneBook.contacts;

const getError = state => state.phoneBook.error;

const getVisibleContacts = createSelector(
    [getAllContacts, getFilter],
    (contacts, filter) => { 
         const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalizedFilter),
    );
    },
);

const selectors = {
    getLoading,
    getFilter,
    getVisibleContacts,
    getAllContacts,
    getError
};

export default selectors;