import { Box, Checkbox, Flex, Input, CloseButton } from '@chakra-ui/react';
import { useState } from 'react';

export const Answer = ({ answer, index, onAnswerChange, onDeleteAnswer, handleAddCorrect, handleRemoveCorrect }) => {
  const [correct, setCorrect] = useState(false)
  const handleTextChange = e => {
    onAnswerChange(index, e.target.value);
  };

  const handleDeleteClick = () => {
    onDeleteAnswer(index);
  };

  const hadleCorrectClick = () => {
    if(correct){
      handleRemoveCorrect(index)
      setCorrect(false)
    }else{
      handleAddCorrect(index)
      setCorrect(true)
    }
  };

  return (
    <Flex alignItems="center" w = "100%">
      <Checkbox size="lg" onChange={hadleCorrectClick} />
      <Box ml="3">
        <Input
          textAlign="center"
          placeholder="Въведете отговор"
          value={answer.text}
          onChange={handleTextChange}
          w="100%"
        />
      </Box>

      <CloseButton ml="3" onClick={handleDeleteClick} />
    </Flex>
  );
};
