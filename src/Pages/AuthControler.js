import { Box, Center, Heading, Switch, useToast } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { login, register } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


export const AuthControler = () => {
  const { isAuth, setAccessData } = useContext(AuthContext);
  const [ loading, setLoading] = useState(false)

  const toast = useToast();

  const errorNotification = text => {
    toast({
      title: 'Грешка!',
      description: text,
      status: 'error',
      duration: 3000,
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  const [credentials, setCredentials] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    grade: '',
    classValue: 'А',
    rePassword: '',
  });

  const [isLogin, setIslogin] = useState(true);

  const handleSwitchToggle = () => {
    setIslogin(!isLogin);
  };

  const handleRegister = async () => {
    setLoading(true)
    try {
      const data = await register(credentials)
      setAccessData(data);
      localStorage.setItem('access_info', JSON.stringify(data));
      navigate('/')
    } catch (err) {
      errorNotification(err.message)
    }
    setLoading(false)
  }


  const handleLogin = async () => {
    setLoading(true)
    try {
      const data = await login({email: credentials.email, password: credentials.password})
      setAccessData(data);
      localStorage.setItem('access_info', JSON.stringify(data));
      navigate('/')
    } catch (err) {
      errorNotification(err.message)
    }
    setLoading(false)
  }

  return (
    <Box px={[4, 8, 12]} py={[8, 12, 16]}>
      <Center>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          w={['100%', '80%', '50%', '30%']}
          textAlign="center"
        >
          <Heading margin="5">{isLogin ? 'Вход' : 'Регистрация'}</Heading>
          <Switch
            onChange={handleSwitchToggle}
            colorScheme="teal"
            size="md"
            marginBottom={2}
          />
          {isLogin ? (
            <Login
              credentials={credentials}
              setCredentials={setCredentials}
              handleLogin={handleLogin}
              loading={loading}
            ></Login>
          ) : (
            <Register
              credentials={credentials}
              setCredentials={setCredentials}
              handleRegister={handleRegister}
              loading={loading}
            ></Register>
          )}
        </Box>
      </Center>
    </Box>
  );
};
