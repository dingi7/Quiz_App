import React, { useState } from 'react';
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
import { SelectCategory } from './Pages/SelectCategory';
import { Results } from './components/Results';

//Contexts
import { QuestionsContext } from './contexts/QuestionsContext';

function App() {
  const navigate = useNavigate();

  const [category, setQuestions] = useState();
  const questionsContextValues = {
    category,
    setQuestions,
  };

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
            <ColorModeSwitcher />
          </Flex>
          <QuestionsContext.Provider value={questionsContextValues}>
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
              <Route path="/add" element={<AddQuestion />} />
              <Route path="/addCategory" element={<AddCategory />} />
              <Route path="/selectCategory" element={<SelectCategory />} />
              <Route path="/quiz/:id" element={<QuizBox />} />
            </Routes>
          </QuestionsContext.Provider>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
