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
import { useState } from 'react';
import { Answer } from './Answer';

export const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([{ text: '', id: 0 }]);
  const [correctAnswer, setCorrectAnswer] = useState([])

  const handleAddCorrect = (index) => {
    setCorrectAnswer(prevCorrect => [
        ...prevCorrect,
        index,
      ]);
    console.log(correctAnswer);
  }

  const handleAddAnswer = () => {
    setAnswers(prevAnswers => [
      ...prevAnswers,
      { text: '', id: prevAnswers.length },
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
