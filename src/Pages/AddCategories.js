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
import { useContext, useEffect, useState } from 'react';
import { createCategory, getCategories } from '../services/requests';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const { isAuth } = useContext(AuthContext);

  const toast = useToast();
  const navigate = useNavigate()

  useEffect(() => {
    const setInitialCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    };
    if (isAuth) {
      setInitialCategories()
    }
    else {
      navigate('/auth')
      toast({
        title: 'Грешка!',
        description: "За да достъпите страницата трябва да сте влезли в профила си!",
        status: 'error',
        duration: 3000,
      });
    }
  }, [toast, isAuth, navigate]);

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
    isAuth ? (
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
    ) : null
  );
};
