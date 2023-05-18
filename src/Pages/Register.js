import {
  Button,
  Divider,
  Heading,
  Input,
  Stack,
  Flex,
  Select,
} from '@chakra-ui/react';

export const Register = ({ credentials, setCredentials }) => {
  return (
    <>
      <Divider />
      <Stack gap="4" margin="5" alignItems="left">
        <Heading size="md">Имеил</Heading>
        <Input
          placeholder="Въведете email"
          value={credentials.email}
          onChange={e =>
            setCredentials(prevState => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
        <Heading size="md">Име</Heading>
        <Input
          placeholder="Въведете име"
          value={credentials.firstName}
          onChange={e =>
            setCredentials(prevState => ({
              ...prevState,
              firstName: e.target.value,
            }))
          }
        />
        <Heading size="md">Фамилия</Heading>
        <Input
          placeholder="Въведете фамилия"
          value={credentials.lastName}
          onChange={e =>
            setCredentials(prevState => ({
              ...prevState,
              lastName: e.target.value,
            }))
          }
        />
        <Heading size="md">Клас</Heading>
        <Flex margin={2}>
          <Input
            w="70%"
            placeholder="Въведете клас"
            value={credentials.grade}
            onChange={e =>
              setCredentials(prevState => ({
                ...prevState,
                grade: e.target.value,
              }))
            }
          />
          <Select
            marginLeft={2}
            variant="filled"
            w="30%"
            onChange={e =>
              setCredentials(prevState => ({
                ...prevState,
                class: e.target.value,
              }))
            }
          >
            <option value="А">А</option>
            <option value="Б">Б</option>
            <option value="В">В</option>
            <option value="Г">Г</option>
            <option value="Д">Д</option>
            <option value="Е">Е</option>
          </Select>
        </Flex>
        <Heading size="md">Парола</Heading>
        <Input
          type="password"
          placeholder="Въведете парола"
          value={credentials.password}
          onChange={e =>
            setCredentials(prevState => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
        <Heading size="md">Повтори Паролата</Heading>
            <Input
              type="password"
              placeholder="Въведете парола"
              value={credentials.rePassword}
              onChange={e =>
                setCredentials(prevState => ({
                  ...prevState,
                  rePassword: e.target.value,
                }))
              }
            />
        <Divider />
        <Button
          justifySelf="flex-start"
          onClick={() => {}}
          width="100%"
          fontSize="md"
        >
          Регистрация
        </Button>
      </Stack>
    </>
  );
};
