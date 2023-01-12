import { NavLink, useNavigate } from 'react-router-dom';
import { HStack, Image } from '@chakra-ui/react';
import Logo from 'data/logo.svg';
import { useSelector } from 'react-redux';
import { selectIsSingedIn } from 'redux/user/selectors';

export const Navigation = () => {
  const navigate = useNavigate();
  const isSignedIn = useSelector(selectIsSingedIn);

  return (
    <HStack as="nav" spacing="4">
      <Image
        src={Logo}
        alt="logo"
        boxSize="50px"
        objectFit="cover"
        mr={4}
        cursor="pointer"
        onClick={() => {
          navigate('/');
        }}
      />
      <NavLink to="/">Home</NavLink>
      {isSignedIn && <NavLink to="/phonebook">Phone book</NavLink>}
    </HStack>
  );
};
