import { Box, Center, Heading, Switch } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';
import { login, register } from '../services/requests';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';


export const AuthControler = () => {
  const { isAuth, setAccessData } = useContext(AuthContext);

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
    try {
      const data = await register(credentials)
      setAccessData(data);
      localStorage.setItem('access_info', JSON.stringify(data));
      navigate('/')
      console.log(data);
    } catch (err) {
      console.log(err);
      //handle error
    }
  }


  const handleLogin = async () => {
    console.log(credentials.password);
    try {
      const data = await login(credentials.email, credentials.password)
      setAccessData(data);
      localStorage.setItem('access_info', JSON.stringify(data));
      navigate('/')
      console.log(data);
    } catch (err) {
      console.log(err);
      //handle error
    }
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
            ></Login>
          ) : (
            <Register
              credentials={credentials}
              setCredentials={setCredentials}
              handleRegister={handleRegister}
            ></Register>
          )}
        </Box>
      </Center>
    </Box>
  );
};
