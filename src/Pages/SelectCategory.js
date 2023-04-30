import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { getCategories } from '../services/requests';

export const SelectCategory = () => {
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const setInitialCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
      if (fetchedCategories.length > 0) {
        setChosenCategory(fetchedCategories[0]._id);
      }
    };
    setInitialCategories();
  }, []);

  const handleCategoryChoice = ({ target: { value } }) => {
    setChosenCategory(value);
  };

  const handleSubmit = () => {
    navigate('/quiz/' + chosenCategory);
  };

  return (
    <Center h="70vh">
      <Box
        justifySelf="center"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={['90%', '70%', '50%', '30%']}
        textAlign="center"
      >
        <Stack justifySelf="center" direction="column" gap="4" margin="5">
          <Heading marginTop="2" justifySelf="center">
            Избери категория:
          </Heading>
          <Divider />

          <Select variant="filled" onChange={handleCategoryChoice}>
            {categories.map(c => (
              <option value={c._id} key={c._id}>
                {c.tag} | {c.questionCount} Въпрос/а
              </option>
            ))}
          </Select>

          <Divider />
          <Stack marginLeft="5" direction="row">
            <Button
              onClick={handleSubmit}
              marginLeft="5"
              marginRight="5"
              marginBottom="2"
              w="100%"
            >
              Начало
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};
