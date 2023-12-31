import React, { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Forms from './forms';

export default function Update() {
  const [userdata, setUserData] = useState();

  const { id } = useParams();

  const history = useNavigate();

  const { data, isLoading } = useQuery('user', () => {
    axios
      .get(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`)
      .then((response) => response.data);
  });

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (Data) => axios.put(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`, Data),
    onSuccess: () => {
      alert('Atualizado com sucesso!');
      history('/read');
    }
  });

  const updateData = useCallback(() => {
    mutation.mutate({
      firstName: userdata.firstName,
      lastName: userdata.lastName,
      checkbox: userdata.checkbox
    });
  }, [mutation, userdata]);

  if (!userdata || isLoading) return <div>Carregando...</div>;
  return (
    <Forms
      firstName={userdata.firstName}
      lastName={userdata.lastName}
      checkbox={Boolean(userdata.checkbox)}
      first={(e) => setUserData({ ...userdata, firstName: e.target.value })}
      last={(e) => setUserData({ ...userdata, lastName: e.target.value })}
      check={(e, datacheck) => setUserData({ ...userdata, checkbox: datacheck.checked })}
      post={updateData}
    />
  );
}
