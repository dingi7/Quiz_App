import { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { getResults } from '../services/requests';

export const ShowResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults().then(data => {
      console.log(data);
      setResults(data);
      if (data.length === 0) {
        alert('No results!');
      }
    });
  }, []);

  return (
    <TableContainer>
      <Table variant='striped'>
        <TableCaption>Results</TableCaption>
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
                        категория: {test.category.tag}, Points: {test.points}  
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
  );
};
