import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Progress } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectIsSingedIn } from 'redux/user/selectors';
import { rememberUser } from 'redux/user/operations';
import { Header } from 'components/Header/Header';
import { Suspense } from 'react';

const Home = lazy(() =>
  import('pages/Home').then(module => {
    return { ...module, default: module.Home };
  })
);

const SignUp = lazy(() =>
  import('pages/SignUp').then(module => {
    return { ...module, default: module.SignUp };
  })
);
const SignIn = lazy(() =>
  import('pages/SignIn').then(module => {
    return { ...module, default: module.SignIn };
  })
);
const PhoneBook = lazy(() =>
  import('pages/PhoneBook').then(module => {
    return { ...module, default: module.PhoneBook };
  })
);

export const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSingedIn);

  console.log(isSignedIn);

  useEffect(() => {
    dispatch(rememberUser());
  }, [dispatch]);

  return (
    <Box>
      <Header />
      <Suspense fallback={<Progress size="xs" isIndeterminate />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={isSignedIn ? <Navigate to={'/phonebook'} /> : <SignUp />}
          />
          <Route
            path="/signin"
            element={isSignedIn ? <Navigate to={'/phonebook'} /> : <SignIn />}
          />
          <Route
            path="/phonebook"
            element={isSignedIn ? <PhoneBook /> : <Navigate to={'/'} />}
          />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Box>
  );
};
