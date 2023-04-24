import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Grid, Heading, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { WelcomePage } from './components/Welcome';
import { QuizBox } from './components/QuizBoxT';
import { AddQuestion } from './components/AddQuestion';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Grid w="100%">
          <ColorModeSwitcher justifySelf="flex-end" />
          <Routes>
            <Route path="*" element={<Heading justifySelf="center"> PAGE NOT FOUND</Heading>} />
            <Route path="/" element={<WelcomePage/>} />
            <Route path="/quiz" element={<QuizBox/>}/>
            <Route path="/add" element={<AddQuestion/>}/>
          </Routes>
        </Grid>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
