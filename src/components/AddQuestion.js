import {
  Box,
  Center,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';

export const AddQuestion = () => {
  const [value, setValue] = useState('1');
  return (
    <Center h="70vh">
      <Box
        justifySelf="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w="30%"
        textAlign="center"
      >
        <Heading>Add new question</Heading>
        <RadioGroup onChange={setValue} value={value} name="quiz-answer">
          <Stack gap="4">
            <Input textAlign="center" placeholder="Enter question" />
            <Radio value='1'><Input textAlign="center" placeholder="Enter question" /></Radio>
            <Radio value='1'><Input textAlign="center" placeholder="Enter question" /></Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </Center>
  );
};
