import { Box, Center, Heading, Switch } from '@chakra-ui/react';
import { useState } from 'react';
import { Login } from './Login';
import { Register } from './Register';

export const AuthControler = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    grade: '',
    class: '',
    // rePassword: '',
  });

  const [isLogin, setIslogin] = useState(true);

  const handleSwitchToggle = () => {
    setIslogin(!isLogin);
  };

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
            ></Login>
          ) : (
            <Register
              credentials={credentials}
              setCredentials={setCredentials}
            ></Register>
          )}
        </Box>
      </Center>
    </Box>
  );
};
