import React ,{ useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const UserDetail = () => {

    const { id } = useParams();

    const [user,setUser] = useState({});
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users/'+id)
        .then((res)=>{
          //  console.log(res.data);
            setUser(res.data)

        })
    },[])

  return (
    <Card>
        { user && user.company && user.address && <>
            <h3>{user.name}</h3>
                <p>{user.company.name}</p>
                <p>{user.address.city} - {user.address.zipcode}</p>
        </>
               
        }
       
    </Card>
  )
}

export default UserDetail

const Card= styled.div`
    border:1px solid white;
    border-radius:10px;
    padding:10px;
    margin-left:10%;
`