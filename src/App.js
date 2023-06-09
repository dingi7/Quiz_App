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
import { AuthControler } from './Pages/AuthControler';
import { ShowResults } from './Pages/ShowResults';


function App() {
  const navigate = useNavigate();

  return (
    <>
      <ChakraProvider>
        <Flex direction="column" minHeight="100vh">
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
            <Route path="/auth" element={<AuthControler />} />
            <Route path="/results" element={<ShowResults />} />
          </Routes>
          <footer
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              padding: '10px',
              width: '100%',
              textAlign: 'right',
            }}
          >
            <p>
              &copy; 2023 - K.Kanev, M.Draganov, S.Todorov - All rights reserved
            </p>
          </footer>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default App;
