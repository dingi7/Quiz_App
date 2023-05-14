import {
  Box,
  Button,
  Center,
  Divider,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import {  useParams } from 'react-router-dom';

//services
import { getQuestionsByCategory } from '../services/requests';
import { Results } from '../components/Results';

export const QuizBox = () => {
  const { id } = useParams();

  const [ userInfo, setUserInfo] = useState({});

  const [isTestFinished, setIsTestFinished] = useState(false);

  const [questions, setQuestions] = useState([
    {
      question: '',
      answers: [],
      correctAnswer: [],
    },
  ]);

  const [value, setValue] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    setCorrectAnswers(0);

    getQuestionsByCategory(id).then(data => {
      setQuestions(data);
      if (data.length < 1 || data[0].question === '') {
        alert('Empty quiz!');
      }
    });
  }, [id, setCorrectAnswers]);

  const handleNextQuestions = () => {
    if (currentQuestion === questions.length - 1) {
      handleTestFinish();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers(state => [...state, parseInt(currentAnswer)]);
      setValue('');
    }
  };

  const handleTestFinish = () => {
    const numCorrectAnswers = questions.filter(
      (q, i) => parseInt(q.correctAnswer) === answers[i]
    ).length;
    setCorrectAnswers(numCorrectAnswers);
    setIncorrectAnswers(questions.length - numCorrectAnswers);
    setIsTestFinished(true);
  };

  const onAnswerChange = e => {
    setCurrentAnswer(e.target.value);
    console.log(e.target.value);
  };

  const currentQuestionData = questions[currentQuestion];

  if (currentQuestionData === undefined) {
    return;
  }

  return (
    <>
      {isTestFinished ? (
        <Results
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          totalAnswers={questions.length}
        />
      ) : (
        <Center h="70vh">
          <Box
            justifySelf="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w={['90%', '70%', '50%', '30%']}
            textAlign="center"
          >
            <Progress value={(currentQuestion / questions.length) * 100} />
            <Stack justifySelf="center" direction="column">
              <Text marginTop="2" justifySelf="center">
                {currentQuestionData.question}
              </Text>
              <Divider />
              <RadioGroup onChange={setValue} value={value} name="quiz-answer">
                <Stack marginLeft="5" justifyContent="center">
                  {currentQuestionData.answers.map((answer, index) => (
                    <Radio
                      key={answer.id}
                      value={`${index}`}
                      onChange={onAnswerChange}
                    >
                      {answer.text}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              <Divider />
              <Stack marginLeft="5" direction="row">
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleNextQuestions}
                    marginLeft="5"
                    marginRight="5"
                    marginBottom="2"
                    w="100%"
                  >
                    Завърши теста
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextQuestions}
                    marginLeft="5"
                    marginRight="5"
                    marginBottom="2"
                    w="100%"
                  >
                    Нататък
                  </Button>
                )}
              </Stack>
            </Stack>
          </Box>
        </Center>
      )}
    </>
  );
};
