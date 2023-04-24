import { Box, Button, Center, Divider, Progress, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"

export const QuizBox = () => {
    const [value, setValue] = useState('1')
    return (
        <Center h="70vh">
        <Box justifySelf="center" borderWidth='1px' borderRadius='lg' overflow='hidden' w="15%" textAlign="center">
            <Progress value="50"/>
            <Stack justifySelf="center">
                <Text marginTop="2" justifySelf="center">Q1: The largest ocean in the world is</Text>
                <Divider/>
                <RadioGroup onChange={setValue} value={value} name="quiz-answer">
                <Stack marginLeft="5" justifyContent="center">
                    <Radio value='1'>Answer 1</Radio>
                    <Radio value='2'>Answer 2</Radio>
                    <Radio value='3'>Answer 3</Radio>
                    <Radio value='4'>Answer 4</Radio>
                </Stack>
                </RadioGroup>
                <Divider/>
                <Stack marginLeft="5" direction="row" >
                    <Button marginLeft="5" marginRight ="5" marginBottom="2" w="100%">Next</Button>
                </Stack>
            </Stack>
        </Box>
        </Center>
    )
}
