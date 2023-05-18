import { Box, Button, Center, Divider, Flex, Heading, Input, Select, Stack } from '@chakra-ui/react';

export const UserInfo = ({ userInfo, setUserInfo, setIsUserInfoGiven }) => {

    const handleSubmit = () => {
        if (userInfo.name.trim() === "" || userInfo.grade.trim() === "" || userInfo.class.trim() === "") {
            // error
        } else {
            setIsUserInfoGiven(true)
        }
    }

    return (
        <Box px={[4, 8, 12]} py={[8, 12, 16]}>
            <Center>
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    w={['100%', '80%', '50%', '30%']}
                    textAlign="center"
                >
                    <Divider />
                    <Stack gap="4" margin="5" alignItems="left">
                        <Heading size="md">Име</Heading>
                        <Input
                            placeholder="Въведете име и фамилия"
                            value={userInfo.name}
                            onChange={e => {
                                setUserInfo(prevState => ({ ...prevState, name: e.target.value }))
                            }
                            }
                        />
                        <Heading size="md">Клас</Heading>
                        <Flex margin={2}>
                            <Input
                                w="70%"
                                placeholder="Въведете клас"
                                value={userInfo.grade}
                                onChange={e => {
                                    setUserInfo(prevState => ({ ...prevState, grade: e.target.value }))
                                }}
                            />

                            <Select
                                marginLeft={2}
                                variant="filled"
                                w="30%"
                                onChange={e =>
                                    setUserInfo(prevState => ({
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
                        <Divider />
                        <Button justifySelf="flex-start" onClick={handleSubmit}>
                            Започни
                        </Button>
                    </Stack>
                </Box>
            </Center>
        </Box>
    );
};
