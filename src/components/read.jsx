import axios from 'axios';
import React from 'react';
import './read.css';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

export default function Read() {
  const { data, isLoading } = useQuery('user-list', () => {
    return axios
      .get('https://646f6e7609ff19b120873f81.mockapi.io/fakedata/')
      .then((response) => response.data);
  });

  const deleteMutation = useMutation((id) => axios.delete(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`));

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }
  return (
    <>
      {}
      <div className="containe-table">
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Checked</Table.HeaderCell>
              <Table.HeaderCell>View</Table.HeaderCell>
              <Table.HeaderCell>Update</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((Data) => {
              return (
                <Table.Row key={Data.id}>
                  <Table.Cell>{Data.firstName}</Table.Cell>
                  <Table.Cell>{Data.lastName}</Table.Cell>
                  <Table.Cell>
                    {Data.checkbox ? 'Checked' : 'Unchecked'}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/view/${Number(Data.id)}`}>
                      <Button>View</Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update/${Number(Data.id)}`}>
                      <Button>Update</Button>
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => deleteMutation.mutate(Data.id)}>
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
