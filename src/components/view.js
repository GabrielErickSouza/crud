
import axios from "axios"
import { useEffect, useState } from "react"
import './pagination.css'
import {useParams} from "react-router-dom"


export default function View(){
    const {id} = useParams()
    const [userdata,setUserData] = useState()
    
    useEffect(()=>{
        axios.get('https://646f6e7609ff19b120873f81.mockapi.io/fakedata/'+id)
        .then((response) =>{
            setUserData(response.data)
        })
    },[id])
   
    

    if(!userdata) return
    return (   
            <div className="item">
                <h1>DADOS DO USUÁRIO</h1>
                <span className="item-span">FirstName: {userdata.firstName}</span>
                <span className="item-span">LastName: {userdata.lastName}</span>
            </div>    
    )
}