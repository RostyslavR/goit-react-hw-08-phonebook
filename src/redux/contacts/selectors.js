export const selectContacts = state => state.contacts.contactList;

export const selectContactsStatus = state => state.contacts.status;

export const selectContactsIsLoading = state => state.contacts.isLoading;

export const selectFilter = state => state.filter;

export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};
