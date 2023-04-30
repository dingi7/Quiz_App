import { Box, Button, Center, Divider, Progress, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { useState, useContext, useEffect } from "react"

import { useNavigate } from "react-router-dom"

//Contexts
import { QuestionsContext } from "../contexts/QuestionsContext"
import { ResultContext } from "../contexts/ResultContext"


//services
import { getQuestionsByCategory } from "../services/requests"


export const QuizBox = () => {

    const navigate = useNavigate()
    
    const [questions, setQuestions] = useState([{
            question: '',
            answers: [],
            correctAnswer: [],
    }])

    const [value, setValue] = useState('1')

    const [currentQuestion, setCurrentQuestion] = useState(0)

    const [currentAnswer, setCurrentAnswer] = useState()

    const {category} = useContext(QuestionsContext)
    const {correctAnswers,setCorrectAnswers, totalAnswers, setTotalAnswers } = useContext(ResultContext)

    useEffect(() =>{
        // reset the result states when the component mounts
        setCorrectAnswers(0)
        setTotalAnswers(0)

        getQuestionsByCategory(category)
        .then(data => {
            setQuestions(data)
            console.log(data)
        })
    }, [])

    const handleNextQuestions = () =>{
        setCurrentQuestion((currentQuestion + 1))
    }

    const handleTestFinish = () =>{
        alert("Завършихте теста")

        // reset the result states when the user finishes the quiz
        setCorrectAnswers(0)
        setTotalAnswers(0)

        navigate("/")
    }

    const handleCurrentQuestion = () =>{
      if (questions[currentQuestion] === undefined) {
        return
      }

      // check if the answer is correct and update the result states
      const selectedAnswerIndex = parseInt(currentAnswer) - 1
      const isAnswerCorrect = questions[currentQuestion].answers[selectedAnswerIndex].correct
      if (isAnswerCorrect) {
        setCorrectAnswers(correctAnswers + 1)
      }
      setTotalAnswers(totalAnswers + 1)

      handleNextQuestions()
    }

    const onAnswerChange = (e) =>{
      setCurrentAnswer(e.target.value)
    }

    if(questions[currentQuestion] == undefined){
       navigate("/")
    }

    const currentQuestionData = questions[currentQuestion]

    if(currentQuestionData == undefined){
        return
    }

    return (
        <Center h="70vh">
          <Box
            justifySelf="center"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            w={["90%", "70%", "50%", "30%"]}
            textAlign="center"
          >
            <Progress value={currentQuestion / questions.length * 100} />
            <Stack justifySelf="center" direction="column">
              <Text marginTop="2" justifySelf="center">{currentQuestionData.question}</Text>
              <Divider />
              <RadioGroup onChange={setValue} value={value} name="quiz-answer">

                <Stack marginLeft="5" justifyContent="center">
                    {currentQuestionData.answers.map((answer, index) => (
                    <Radio key={answer.id} value={`${index + 1}`} onChange={onAnswerChange}>
                        {answer.text}
                    </Radio>
                    ))}
                </Stack>
              </RadioGroup>
              <Divider />
              <Stack marginLeft="5" direction="row">
                  {currentQuestion === questions.length - 1 ?
                    (<Button onClick={handleTestFinish} marginLeft="5" marginRight="5" marginBottom="2" w="100%">Край</Button>)
                   : 
                   (<Button onClick={handleNextQuestions} marginLeft="5" marginRight="5" marginBottom="2" w="100%">Нататък</Button>)
                   }
              </Stack>
            </Stack>
          </Box>
        </Center>
      )
}
