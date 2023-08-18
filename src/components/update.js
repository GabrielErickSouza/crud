import React,{useCallback, useState} from "react";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from 'react-router-dom'
import Forms from "./forms";

import axios from "axios";
import {useParams} from 'react-router-dom'


export default function Update(){
    const [userdata,setUserData] = useState()
        
    const {id} = useParams()

    const history = useNavigate()

    const {data,isLoading} = useQuery('user', ()=>{
            return axios.get(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`)
            .then(response => response.data)
    })  

    const mutation = useMutation({
        mutationFn: ()=>{
            return axios.put(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata${id}`) 
        },
        onSuccess:()=> {
            alert('Atualizado com sucesso!')
            history('/read')
        }
    })
    
    const updateData = useCallback(()=>{ 
           mutation.mutate({firstName:userdata.firstName,lastName:userdata.lastName})
    },[mutation,userdata])

    if (isLoading)  return  <div>Carregando...</div>

    return (
        <Forms 
        firstName={data.firstName}
        lastName={data.lastName}
        checkbox={Boolean(data.checkbox)}
        first={(e)=>setUserData({...data,firstName:e.target.value})}
        last={(e)=>setUserData({...data,lastName:e.target.value})}
        check={(e,datacheck)=>setUserData({...data,checkbox:datacheck.checked})}
        post={updateData}
        /> 
    )
}