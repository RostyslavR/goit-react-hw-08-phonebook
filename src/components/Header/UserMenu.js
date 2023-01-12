import { HStack, Text } from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';
import { NavLink } from 'react-router-dom';
import { signOut } from 'redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsSingedIn } from 'redux/user/selectors';

export const UserMenu = () => {
  const user = useSelector(selectUser);
  const isSignedIn = useSelector(selectIsSingedIn);
  const dispatch = useDispatch();

  return (
    <HStack spacing={4}>
      {isSignedIn ? (
        <Text color="teal.400" fontSize="2xl">
          {user.name}
        </Text>
      ) : (
        <NavLink to="/signup">SignUp</NavLink>
      )}
      {isSignedIn ? (
        <NavLink onClick={() => dispatch(signOut())}>Sign Out</NavLink>
      ) : (
        <NavLink to="/signin">SignIn</NavLink>
      )}
      <ColorModeSwitcher />
    </HStack>
  );
};
