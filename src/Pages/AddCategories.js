import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Input,
  Select,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { createCategory, getCategories } from '../services/requests';

export const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const toast = useToast();

  useEffect(() => {
    const setInitialCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    setInitialCategories();
  }, []);

  const successNotification = text => {
    toast({
      title: 'Успех!',
      description: text,
      status: 'success',
      duration: 3000,
    });
  };

  const handleAddCategory = async () => {
    const newCategory = await createCategory(category);
    setCategories(state => [...state, newCategory]);
    successNotification('Успешно добавена категория');
    setCategory('');
  };

  return (
    <Center h="70vh">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        w={['100%', '80%', '50%', '30%']}
        textAlign="center"
      >
        <Heading margin="5">Добави нова категория</Heading>
        <Divider />
        <Stack gap="4" margin="5" alignItems="left">
        <Heading size="md">Съществуващи категории:</Heading>
          <Select variant="filled">
            {categories.map(c => (
              <>
                <option value={c._id} key={c._id}>
                  {c.tag} | {c.questionCount} Въпрос/а
                </option>
              </>
            ))}
          </Select>
          <Divider></Divider>
          <Heading size="md">Създай категория:</Heading>
          <Input
            placeholder="Въведете име на категорията"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
          <Divider />
          <Flex alignItems="center" justifyContent="space-between">
            <Button justifySelf="flex-end" onClick={handleAddCategory}>
              Запази
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
};
