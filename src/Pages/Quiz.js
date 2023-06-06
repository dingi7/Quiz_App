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
import { useState, useEffect, useContext } from 'react';

import { useParams } from 'react-router-dom';

//services
import { getQuestionsByCategory, postResults } from '../services/requests';
import { Results } from '../components/Results';
import { UserInfo } from '../components/UserInfo';
import { AuthContext } from '../contexts/AuthContext';

export const QuizBox = () => {
  const { accessData  } = useContext(AuthContext);
  const { id } = useParams();

  const [isUserInfoGiven, setIsUserInfoGiven] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    grade: "",
    class: "А"
  });

  const [isTestFinished, setIsTestFinished] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [value, setValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
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

    if (accessData) {
      setUserInfo({
        name: accessData.name,
        grade: accessData.grade,
        class: accessData.class
      })
      setIsUserInfoGiven(true)
    }
  }, [id, setCorrectAnswers, accessData]);

  /*const handleNextQuestions = () => {
    if (currentQuestion === questions.length - 1) {
      handleTestFinish();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers(state => [...state, parseInt(currentAnswer)]);
      setValue('');
    }
  };
  */

  const handleNextQuestions = () => {
    if (currentQuestion === questions.length - 1) {
      handleTestFinish();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setAnswers(state => {
        const updatedAnswers = [...state];
        updatedAnswers[currentQuestion] = parseInt(currentAnswer);
        return updatedAnswers;
      });
      setValue('');
    }
  };
  


  /*      KAMENS VERSION DONT DELETE
  const handleTestFinish = async() => {
    const numCorrectAnswers = questions.filter(
      (q, i) => parseInt(q.correctAnswer) === answers[i]
    ).length;
    setCorrectAnswers(numCorrectAnswers);
    setIncorrectAnswers(questions.length - numCorrectAnswers);


    //MITYOS WORK -- delete if mad
    const fetchedResult = await postResults(id, correctAnswers, questions)
    console.log(fetchedResult)

    setIsTestFinished(true);
  };
  */

  //MITYOS VERSION 


  const handleTestFinish = async () => {
    const numCorrectAnswers = questions.filter(
      (q, i) => parseInt(q.correctAnswer) === answers[i]
    ).length;
    setCorrectAnswers(numCorrectAnswers);
    setIncorrectAnswers(questions.length - numCorrectAnswers);
  
    const newQuizResults = questions.map((question, i) => {
      const answer = question.answers[answers[i]] ? question.answers[answers[i]].text : '';
      return {
        question: question._id,
        answer,
      };
    });
  
    const submission = {
      categoryId: id,
      correctAnswers: numCorrectAnswers,
      questions: newQuizResults, // Use the updated quizResults state
      guestCredentials: {
        "firstName": userInfo.name ? userInfo.name.split(' ')[0] : '',
        "lastName": userInfo.name ? userInfo.name.split(' ')[1] : ''
      }
    };
  
    // Make the API request with the submission body
    try {
      const response = await postResults(submission);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  
    setIsTestFinished(true);
  };
  
  
  
  
  

  const onAnswerChange = e => {
    setCurrentAnswer(e.target.value);
  };

  const currentQuestionData = questions[currentQuestion];

  if (!currentQuestionData) {
    return null;
  }

  return (
    <>
      {!isUserInfoGiven ? (<UserInfo userInfo={userInfo} setUserInfo={setUserInfo} setIsUserInfoGiven={setIsUserInfoGiven}></UserInfo>) : (<>
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
      </>)}

    </>
  );
};
