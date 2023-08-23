import axios from 'axios';
import React from 'react';
import './pagination.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export default function View() {
  const { id } = useParams();

  const { data, isLoading } = useQuery('user', () => {
    return axios.get(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`)
      .then((response) => response.data);
  });

  if (isLoading) return <h1>Carregando...</h1>;
  return (
    <div className="item">
      <h1>DADOS DO USUÁRIO</h1>
      <span className="item-span">
        FirstName: {data.firstName}
      </span>
      <span className="item-span">
        LastName: {data.lastName}
      </span>
    </div>
  );
}