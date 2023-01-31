import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraBaseProvider,ColorModeScript,extendTheme} from '@chakra-ui/react';
import {AppContext} from "./context/contextApi";

const config= {
  initialColorMode:"light",
  useSystemColorMode:false,
};
const theme=extendTheme({config,});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <AppContext>
        <ChakraBaseProvider theme={theme}>
           <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
          
        </ChakraBaseProvider>
      </AppContext>
);