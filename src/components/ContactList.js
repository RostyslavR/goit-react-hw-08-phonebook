import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/filter/selectors';
import { deleteContact } from 'redux/contacts/operations';

import { IconButton, HStack, Stack, Text, Box } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <Box p={4}>
      <Stack maxH="340px" maxW="600px" p="1" overflowY="auto">
        {contacts.map(contact => (
          <Contact key={contact.id} {...contact}></Contact>
        ))}
      </Stack>
    </Box>
  );
};

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(deleteContact(id));

  return (
    <HStack spacing={3}>
      <Text fontSize="2xl" w="300px">
        {name}
      </Text>
      <Text fontSize="xl" w="150px">
        {number}
      </Text>
      <IconButton
        aria-label="delete contact"
        icon={<DeleteIcon />}
        colorScheme="teal"
        onClick={handleDelete}
      >
        Delete
      </IconButton>
    </HStack>
  );
};
