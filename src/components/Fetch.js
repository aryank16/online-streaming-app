import React, { useEffect,useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const Fetch = () => {

    const [data,setData] = useState([])

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((res)=>{
        console.log("response",res);
        setData(res.data)
    })
  },[])
  return (
    <Container>
     {
        
        data.map((item,index)=>{
            return (
                <Card key={item.id}>
                    <p>{index}</p>
                    <p>{item.title}</p>
                    <p>{item.body}</p>
                </Card>
            )
        })
        
    }
    </Container>
   
  )
}

export default Fetch


const Card = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    width:50%;
    height: 100%;
    margin-top:20px;
    margin-left:20px;
    background-color: yellow;
    color:red;
`
const Container = styled.div`
    display: flex;
`