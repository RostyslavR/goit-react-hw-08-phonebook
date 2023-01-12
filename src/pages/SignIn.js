import { Box, Container, Heading } from '@chakra-ui/react';
import { SignInForm } from 'components/Forms/SignInForm';

export const SignIn = () => {
  return (
    <Container maxW="container.lg">
      <Box as="main">
        <Heading size="2xl">Sign in page </Heading>
        <SignInForm />
      </Box>
    </Container>
  );
};
