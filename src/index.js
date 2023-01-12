import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { App } from 'components/App';
import { store, persistor } from 'redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'components/theme';
import { Talker } from 'components/Talker';
// import 'modern-normalize';
// import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Provider store={store}>
            <Talker duration="2000" isClosable="true" position="top" />
            <App />
          </Provider>
        </BrowserRouter>
      </PersistGate>{' '}
    </ChakraProvider>
  </React.StrictMode>
);
