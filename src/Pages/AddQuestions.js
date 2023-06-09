import {
  Box,
  Flex,
  Input,
  Button,
  Divider,
  Heading,
  Stack,
  Center,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Answer } from '../components/Answer';
import { createQuestion, getCategories } from '../services/requests';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
export const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ text: '', id: 0, correct: false }]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState('');
  const { isAuth } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate()

  useEffect(() => {
    const setInitialCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setChosenCategory(fetchedCategories[0]._id);
      }
    };
    if(isAuth){
    setInitialCategories()
    }
    else{
      navigate('/auth')
      toast({
        title: 'Грешка!',
        description: "За да достъпите страницата трябва да сте влезли в профила си!",
        status: 'error',
        duration: 3000,
      });
    }
  }, [toast, isAuth, navigate]);

  const handleCategoryChoice = ({ target: { value } }) => {
    setChosenCategory(value);
  };

  const handleAddCorrect = index => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer => {
        if (answer.id === index) {
          return { ...answer, correct: true };
        } else {
          return answer;
        }
      })
    );
  };

  const handleRemoveCorrect = index => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer => {
        if (answer.id === index) {
          return { ...answer, correct: false };
        } else {
          return answer;
        }
      })
    );
  };

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [
      ...prevAnswers,
      { text: '', id: prevAnswers.length, correct: false },
    ]);
  };

  const handleDeleteAnswer = index => {
    setAnswers(prevAnswers =>
      prevAnswers.filter(answer => answer.id !== index)
    );
  };

  const handleAnswerChange = useCallback((index, newText) => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer => {
        if (answer.id === index) {
          return { ...answer, text: newText };
        } else {
          return answer;
        }
      })
    );
  }, []);

  const findCorrectIndex = () => {
    return answers
      .map((answer, index) => ({ ...answer, index }))
      .filter(answer => answer.correct)
      .map(answer => answer.index);
  };

  const errorNotification = text => {
    toast({
      title: 'Грешка!',
      description: text,
      status: 'error',
      duration: 3000,
    });
  };

  const successNotification = text => {
    toast({
      title: 'Успех!',
      description: text,
      status: 'success',
      duration: 3000,
    });
  };

  const clearInputs = () => {
    setQuestion('');
    setAnswers([{ text: '', id: 0, correct: false }]);
  };

  const handleSubmit = async () => {
    const correctIndexes = findCorrectIndex();
    if (!question || question.trim === '') {
      return errorNotification('Въведете въпрос!');
    }
    if (answers.length === 0 || answers[0].text.trim() === '') {
      return errorNotification('Въведете поне един отговор!');
    }
    if (correctIndexes.length === 0) {
      return errorNotification('Изберете поне един верен отговор!');
    }
    if (chosenCategory.trim() === '') {
      return errorNotification('Изберете категория!');
    }
    await createQuestion(question, answers, correctIndexes, chosenCategory);
    successNotification('Въпросът беше успешно добавен!');
    clearInputs();
  };

  return (
    isAuth ? (
      <Center h="70vh">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w={['100%', '80%', '50%', '30%']}
          textAlign="center"
        >
          <Heading margin="5">Добави нов въпрос</Heading>
          <Divider />
          <Stack gap="4" margin="5" alignItems="left">
            <Input
              placeholder="Въведете въпроса"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <Divider />
            {answers.map((answer) => (
              <Answer
                key={answer.id}
                answer={answer}
                index={answer.id}
                onAnswerChange={handleAnswerChange}
                onDeleteAnswer={handleDeleteAnswer}
                handleAddCorrect={handleAddCorrect}
                handleRemoveCorrect={handleRemoveCorrect}
              />
            ))}
            <Divider />
            <Heading size="md">Изберете категория</Heading>
            <Select variant="filled" onChange={handleCategoryChoice}>
              {categories.map((c) => (
                <option value={c._id} key={c._id}>
                  {c.tag} | {c.questionCount} Въпрос/а
                </option>
              ))}
            </Select>
            <Divider />
            <Flex alignItems="center" justifyContent="space-between">
              <Button justifySelf="flex-start" onClick={handleAddAnswer}>
                Добави въпрос
              </Button>
              <Button justifySelf="flex-end" onClick={handleSubmit}>
                Запази
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Center>
    ) : null

  );
};
