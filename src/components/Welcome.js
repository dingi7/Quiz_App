import { Button, Center, Flex, Box, Heading } from '@chakra-ui/react';
import { useNavigate  } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate()
  const handleQuizStart = e => {
    e.preventDefault();
    navigate('/quiz')
  };

  const handleAddQuestions = e => {
    e.preventDefault()
    navigate('/add')
  }

  return (
    <Center h="80vh">
      <Flex flexDirection="column" alignItems="center" gap={6}>
        <Heading>Welcome!</Heading>
        <Box>
          <Button onClick={handleQuizStart} w="200px" justifySelf="center">
            Start Quiz
          </Button>
        </Box>
        <Box>
          <Button onClick={handleAddQuestions} w="200px" justifySelf="center">
            Add Quiz Questions
          </Button>
        </Box>
      </Flex>
    </Center>
  );
};
