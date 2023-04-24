import { Box, Button, Center, Divider, Progress, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"

export const QuizBox = () => {
    const [value, setValue] = useState('1')
    return (
        <Center h="70vh">
        <Box justifySelf="center" borderWidth='1px' borderRadius='lg' overflow='hidden' w={["90%", "70%", "50%", "30%"]} textAlign="center">
            <Progress value="50"/>
            <Stack justifySelf="center" direction="column">
                <Text marginTop="2" justifySelf="center">Q1: Рационалната формулата на бутан е:</Text>
                <Divider/>
                <RadioGroup onChange={setValue} value={value} name="quiz-answer">
                <Stack marginLeft="5" justifyContent="center">
                    <Radio value='1'>Отговор 1</Radio>
                    <Radio value='2'>Отговор 2</Radio>
                    <Radio value='3'>Отговор 3</Radio>
                    <Radio value='4'>Отговор 4</Radio>
                </Stack>
                </RadioGroup>
                <Divider/>
                <Stack marginLeft="5" direction="row" >
                    <Button marginLeft="5" marginRight ="5" marginBottom="2" w="100%">Нататък</Button>
                </Stack>
            </Stack>
        </Box>
        </Center>
    )
}
