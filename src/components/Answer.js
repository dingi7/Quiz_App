import {
  Box,
  Checkbox,
  Flex,
  Input,
  CloseButton,
} from '@chakra-ui/react';

export const Answer = ({ answer, index, onAnswerChange, onDeleteAnswer }) => {
  const handleTextChange = e => {
    onAnswerChange(index, e.target.value);
  };

  const handleDeleteClick = () => {
    onDeleteAnswer(index);
  };

  return (
    <Flex alignItems="center">
      <Checkbox size="lg" />
      <Box ml="3">
        <Input
          textAlign="center"
          placeholder="Enter answer"
          value={answer.text}
          onChange={handleTextChange}
        />
      </Box>

      <CloseButton ml="3" onClick={handleDeleteClick} />
    </Flex>
  );
};
