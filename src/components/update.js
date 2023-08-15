import React,{useEffect, useState} from "react";

import { useNavigate } from 'react-router-dom'
import Forms from "./forms";

import axios from "axios";
import {useParams} from 'react-router-dom'


export default function Update(){
        const [userdata,setUserData] = useState()
        

        const {id} = useParams()

        const history = useNavigate()

     useEffect(()=>{
       axios.get('https://646f6e7609ff19b120873f81.mockapi.io/fakedata/'+id)
        .then((response) =>{
            setUserData(response.data)
        })
     },[id])
     
     const updateAPIData = () =>{
       axios.put(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/`)
       .then(()=>{
            history('/read')
        }).then(()=> alert('Atualizado com Sucesso!'))
        
     }

    
    if (!userdata)  return   
    return (
        <Forms 
        firstName={userdata.firstName}
        lastName={userdata.lastName}
        checkbox={Boolean(userdata.checkbox)}
        first={(e)=>setUserData({...userdata,firstName:e.target.value})}
        last={(e)=>setUserData({...userdata,lastName:e.target.value})}
        check={(e,data)=>setUserData({...userdata,checkbox:data.checked})}
        post={updateAPIData}
        /> 
    )
}