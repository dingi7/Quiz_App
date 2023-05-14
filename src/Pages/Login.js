import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  return (
    <Center h="70vh">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={['100%', '80%', '50%', '30%']}
        textAlign="center"
      >
        <Heading margin="5">Вход</Heading>
        <Divider />
        <Stack gap="4" margin="5" alignItems="left">
          <Heading size="md">Email</Heading>
          <Input placeholder="Въведете email" value={credentials.email} onChange={e => setCredentials(prevState => ({ ...prevState, email: e.target.value }))} />
          <Heading size="md">Password</Heading>
          <Input type='password' placeholder="Въведете парола" value={credentials.password} onChange={e => setCredentials(prevState => ({ ...prevState, password: e.target.value }))} />
          <Divider />
          <Button justifySelf="flex-start" onClick={() => {}}>
            Влез
          </Button>
          <Text>
            Нямаш профил?{' '}
            <Link color="teal.500" href="/register">
              Регистрирай се тук.
            </Link>
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};
