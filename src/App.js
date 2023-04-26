import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  ChakraProvider,
  CloseButton,
  Flex,
  Heading,
  Tooltip,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { WelcomePage } from './Pages/Welcome';
import { QuizBox } from './Pages/Quiz';
import { AddQuestion } from './Pages/AddQuestions';
import { ToastContainer } from 'react-toastify';
import { AddCategory } from './Pages/AddCategories';

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
      <ChakraProvider>
        <Flex direction="column" h="100vh">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p={3}
            margin={2}
            borderBottom="0.5px solid"
            borderColor="gray.200"
          >
            <Tooltip label="Върни се назад" aria-label="A tooltip">
              <CloseButton onClick={() => navigate('/')} />
            </Tooltip>
            <ColorModeSwitcher/>
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
            <Route path="/addCategory" element={<AddCategory />} />
          </Routes>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
