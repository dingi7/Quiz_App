import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Results = ({ correctAnswers, incorrectAnswers, totalAnswers }) => {
  const navigate = useNavigate();

  return (
    <Center h={['100%', '70vh']}>
      <Box
        justifySelf="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={['90%', '70%', '50%', '30%']}
        textAlign="center"
      >
        <Stack justifySelf="center" direction="column" gap="4" margin="5">
          <Heading
            marginTop="2"
            justifySelf="center"
            fontSize={['1.5em', '2xl']}
          >
            Вашите резултати:
          </Heading>
          <Divider />
          <Center>
            <Flex
              justifyContent="center"
              width="100%"
              flexDirection="column"
              alignItems="center"
            >
              <Badge
                variant="subtle"
                colorScheme="green"
                justifySelf="center"
                w="80%"
                h={['40%', '30%']}
                fontSize={['1.2em', '1em']}
                margin={2}
              >
                Верни отговори: {correctAnswers} / {totalAnswers}
              </Badge>
              <Badge
                variant="subtle"
                colorScheme="red"
                w="80%"
                h={['40%', '30%']}
                fontSize={['1.2em', '1em']}
                margin={2}
              >
                Грешни отговори: {incorrectAnswers} / {totalAnswers}
              </Badge>
            </Flex>
          </Center>

          <Divider />
          <Stack marginLeft="5" direction="row">
            <Button
              marginLeft="5"
              marginRight="5"
              marginBottom="2"
              w="100%"
              fontSize={['1.2em', '1em']}
              padding={['1em', '0.5em']}
              onTouchStart={() => navigate('/')}
              onTouchEnd={() => navigate('/')}
              onClick={() => navigate('/')}
            >
              Започни нов тест
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
