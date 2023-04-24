import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  CloseButton,
  Flex,
  Grid,
  Heading,
  Tooltip,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { WelcomePage } from './Pages/Welcome';
import { QuizBox } from './Pages/Quiz';
import { AddQuestion } from './Pages/AddQuestions';
import { ToastContainer } from 'react-toastify';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ChakraProvider theme={theme}>
        <Grid w="100%">
          <Flex justifyContent="space-between">
            <Tooltip label="Върни се назад" aria-label="A tooltip">
              <CloseButton onClick={() => navigate('/')} />
            </Tooltip>
            <ColorModeSwitcher />
          </Flex>
          <Routes>
            <Route
              path="*"
              element={
                <Heading justifySelf="center">
                  {' '}
                  Страницата не е намерена
                </Heading>
              }
            />
            <Route path="/" element={<WelcomePage />} />
            <Route path="/quiz" element={<QuizBox />} />
            <Route path="/add" element={<AddQuestion />} />
          </Routes>
        </Grid>
      </ChakraProvider>
    </>
  );
}

export default App;
