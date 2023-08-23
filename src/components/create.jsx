import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useMutation } from 'react-query';
import Forms from './forms';

export default function Create() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [checkbox, setCheckbox] = useState(false);
  const history = useNavigate();

  const mutation = useMutation({
    mutationFn:
      () => (
        axios
          .post('https://646f6e7609ff19b120873f81.mockapi.io/fakedata', {
            firstName,
            lastName,
            checkbox
          })),
    onSuccess:
      () => {
        alert('Dados criado com sucesso!');
        history('/read');
      }
  });
  return (
    <Forms
      firstName={firstName}
      lastName={lastName}
      checkbox={checkbox}
      first={(e) => setFirstName(e.target.value)}
      last={(e) => setLastName(e.target.value)}
      check={() => setCheckbox(!checkbox)}
      post={() => (
        mutation.mutate({
          firstName: firstName,
          lastName: lastName,
          checkbox: checkbox
        })
      )}
    />
  );
}
