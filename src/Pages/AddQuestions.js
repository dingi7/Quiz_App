import {
  Box,
  Flex,
  Input,
  Button,
  Divider,
  Heading,
  Stack,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Answer } from '../components/Answer';

export const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ text: '', id: 0, correct: false }]);

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

  useEffect(() => {
    console.log(answers);
  }, [answers]);

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

  const handleAnswerChange = (index, newText) => {
    setAnswers(prevAnswers =>
      prevAnswers.map(answer => {
        if (answer.id === index) {
          return { ...answer, text: newText };
        } else {
          return answer;
        }
      })
    );
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <Center>
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
            onChange={e => setQuestion(e.target.value)}
          />
          <Divider />
          {answers.map((answer, index) => (
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
          <Flex alignItems="center" justifyContent="space-between">
            <Button justifySelf="flex-start" onClick={handleAddAnswer}>
              Добави въпрос
            </Button>
            <Button justifySelf="flex-end" onClick={handleSubmit}>
              Добави
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};
