import axios from "axios";
import React,{useEffect,useState} from "react";
import './read.css'
import { Table, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Imagem from "./icons8-order-48.png"

export default function Read(){
    const [APIData,setAPIData] = useState([])
    
    
    const [itensPerPage,setItensPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(0)
    const [search, setSearch] = useState('')


    const pages = Math.ceil(APIData.length/itensPerPage)
    const startIndex = currentPage * itensPerPage
    const endIndex = startIndex + itensPerPage
    const currentItens = APIData.slice(startIndex,endIndex)
    
    const searchLowerCase = search.toLocaleLowerCase()
    

    const data = currentItens.filter((data)=> data.firstName.toLowerCase().includes(searchLowerCase)||
    data.lastName.toLowerCase().includes(searchLowerCase))

    const handleOrderClick = ()=>{
        let newData = [...APIData]  
        
        newData.sort((a,b)=> (a.firstName > b.firstName)?1:(b.firstName>a.firstName)?-1:0)
        setAPIData(newData)
    }

    useEffect(()=>{
        axios.get("https://646f6e7609ff19b120873f81.mockapi.io/fakedata")
        .then((response) => {
            setAPIData(response.data)
        })
    },[])

    const setData = () =>{
        axios.get('https://646f6e7609ff19b120873f81.mockapi.io/fakedata/')
        .then(response=>{
            setAPIData(response.data)
        })
    }
    
    const onDelete = (id) =>{
        if(window.confirm('Deseja apagar os dados ?')){
            axios.delete(`https://646f6e7609ff19b120873f81.mockapi.io/fakedata/${id}`)
            .then(()=>{getData()})
        }
    }

    const getData = () =>{
        axios.get('https://646f6e7609ff19b120873f81.mockapi.io/fakedata')
        .then((getData)=>{
            setAPIData(getData.data)
        })
    }
    
    return (
        <>
            <div className="search">
                 <input placeholder="Pesquise um nome" type="search" value={search} onChange={(e)=> setSearch(e.target.value)} /> 
                 <button onClick={handleOrderClick}><img src={Imagem} alt="icon"/></button>
            </div>
            <div>
                <select value={itensPerPage} onChange={(e)=> setItensPerPage(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>

            </div>
        <div className="containe-table">
             
            <Table  singleLine>
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
                    {data.map((data,index)=>{
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{data.firstName}</Table.Cell>
                                <Table.Cell>{data.lastName}</Table.Cell>
                                <Table.Cell>{data.checkbox ? 'Checked' : 'Unchecked'}</Table.Cell>
                                <Table.Cell>
                                <Link to={`/view/${Number(data.id)}`}>
                                    <Button>View</Button>            
                                </Link>
                                </Table.Cell>
                                <Table.Cell>
                                <Link  to={`/update/${Number(data.id)}`}>    
                                <Button onClick={()=> setData(data)} >Update</Button>    
                                </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={()=> onDelete(data.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                    
                </Table.Body>
            </Table>
            
        </div>
        <div className="pagination">{Array.from(Array(pages), (item,index)=>{
                return (
                    <button key={index} className="content" value={index} onClick={(e)=> setCurrentPage(Number(e.target.value))}>
                    {index +1}
                    </button>
                    
                    )
            })}</div>
        </>
    );
          

}