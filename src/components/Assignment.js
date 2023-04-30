import React ,{ useEffect,useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Assignment = () => {

  const [users,setUsers] = useState([]);
  var navigate = useNavigate();

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((res)=>{
      //  console.log(res.data)
        setUsers(res.data)
    })
    .catch((err)=>{
        console.log(err)
    })
  },[])

  const detailsPage = function(id){
  //  console.log(id)
    navigate('/user-details/'+id);
  }

  return (
    <CardRow>
        {
            users.map((item)=>{
                return(
                    
                    <Card key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.username}</p>
                        <p>{item.email}</p>
                       
                        <button onClick={() => detailsPage(item.id)} > View Details</button>
                        
                    </Card>
                )
            })
        }
    </CardRow>
  )
}

export default Assignment



const CardRow = styled.div`
    display:flex;
`
const Card = styled.div`
    border:1px solid white;
    background-color: grey;
    margin-right:10px;
    margin-left:10px;
    border-radius:10px;
    padding:10px;
`