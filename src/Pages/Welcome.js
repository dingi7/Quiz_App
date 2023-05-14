import { Button, Center, Flex, Box, Heading } from '@chakra-ui/react';
import { useNavigate  } from 'react-router-dom';

export const WelcomePage = () => {
  const navigate = useNavigate()
  const handleQuizStart = e => {
    e.preventDefault();
    navigate('/selectCategory')
  };

  const handleAddQuestions = e => {
    e.preventDefault()
    navigate('/add')
  }

  const handleAddCategory = e =>{
    e.preventDefault()
    navigate("/addCategory")
  }

  const handleProfile = e =>{
    e.preventDefault()
    if(true){
      navigate("/login")
    }else{
      navigate("/register")
    }
  }

  return (
    <Center h="80vh">
      <Flex flexDirection="column" alignItems="center" gap={6}>
        <Heading>Здравейте!</Heading>
        <Box>
          <Button onClick={handleQuizStart} w="200px" justifySelf="center">
            Започнете Игра
          </Button>
        </Box>
        <Box>
          <Button onClick={handleAddQuestions} w="200px" justifySelf="center">
            Добавете Въпроси
          </Button>
        </Box>
        <Box>
          <Button onClick={handleAddCategory} w="200px" justifySelf="center">
            Добавете Категория
          </Button>
        </Box>
        <Box>
          <Button onClick={handleProfile} w="200px" justifySelf="center">
            Вход/Регистрация
          </Button>
        </Box>
      </Flex>
    </Center>
  );
};
