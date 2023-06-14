import { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Spinner } from '@chakra-ui/react';
import { getResults } from '../services/requests';

export const ShowResults = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getResults()
      .then(data => {
        setResults(data);
        if (data.length === 0) {
          alert('No results!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box marginLeft={{ base: '20px', md: '40px' }} marginRight={{ base: '20px', md: '40px' }}>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>First Name</Th>
                <Th>Last Name</Th>
                <Th>Submitted Tests</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td colSpan={3} textAlign="center">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="md"
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return (
    <Box marginLeft={{ base: '20px', md: '40px' }} marginRight={{ base: '20px', md: '40px' }}>
      <TableContainer>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Submitted Tests</Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map(result => (
              <Tr key={result._id}>
                <Td>{result.firstName}</Td>
                <Td>{result.lastName}</Td>
                <Td>
                  <ul>
                    {result.submittedTests.map(test => (
                      <li key={test._id}>
                        {test.category ? (
                          <span>
                            {test.category.tag} | Points: {test.points}/{test.questions.length}
                          </span>
                        ) : (
                          <span>категория: няма такава категория</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
