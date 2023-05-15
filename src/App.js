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
import { AddCategory } from './Pages/AddCategories';
import { SelectCategory } from './Pages/SelectCategory';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';

//Contexts
// import { QuestionsContext } from './contexts/QuestionsContext';

function App() {
  const navigate = useNavigate();

  // const [category, setQuestions] = useState();
  // const questionsContextValues = {
  //   category,
  //   setQuestions,
  // };

  return (
    <>
      <ChakraProvider>
        <Flex direction="column" h="100vh" w="100%">
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
          {/* <QuestionsContext.Provider value={questionsContextValues}> */}
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          {/* </QuestionsContext.Provider> */}
          <footer style={{ position: 'absolute', bottom: 5, right: 10 }}>
            <p>
              &copy; 2023 - K.Kanev, M.Draganov, S.Todorov - All rights reserved
            </p>
          </footer>
        </Flex>
      </ChakraProvider>

      <style>
        {`
        @media (max-width: 768px) {
          footer {
            position: static;
            text-align: center;
            margin-top: 2rem;
          }
        }
      `}
      </style>
    </>
  );
}

export default App;
