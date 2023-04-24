import { Box, Checkbox, Flex, Input, CloseButton } from '@chakra-ui/react';

export const Answer = ({ answer, index, onAnswerChange, onDeleteAnswer, handleAddCorrect }) => {
    console.log(index);
  const handleTextChange = e => {
    onAnswerChange(index, e.target.value);
  };

  const handleDeleteClick = () => {
    onDeleteAnswer(index);
  };

  const hadleCorrectClick = () => {
    console.log('Clicked');
    handleAddCorrect(index)
  };

  return (
    <Flex alignItems="center">
      <Checkbox size="lg" onChange={hadleCorrectClick} />
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
