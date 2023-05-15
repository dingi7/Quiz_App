import {
  Button,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';

export const Login = ({credentials, setCredentials}) => {

  return (
    <>
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
    </>
  );
};
