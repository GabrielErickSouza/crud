import React,{useState} from "react";

import { useNavigate } from 'react-router-dom'

import Forms from "./forms";

import axios from "axios";



export default function Create(){
     const [firstName,setFirstName] = useState('')
     const [lastName,setLastName] = useState('')
     const [checkbox,setCheckbox] = useState(false)   
     const history = useNavigate();
     const postData = () =>{
        axios.post(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata`,{
            firstName,
            lastName,
            checkbox
        })
        .then(() => {history('/read')})
        .then(()=> alert('Dados Criados com Sucesso!'))

     }

     
    return (
        <Forms 
        firstName={firstName}
        lastName={lastName}
        checkbox={checkbox}
        first={(e)=>setFirstName(e.target.value)} 
        last={(e)=>setLastName(e.target.value)}
        check={(e) => setCheckbox(!checkbox)}
        post={postData}
        />        
    )
}

