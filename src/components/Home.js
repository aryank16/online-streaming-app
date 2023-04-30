import React,{useEffect,useState} from 'react'
import ImgSlider from './ImgSlider'
import Viewers from './Viewers'
import styled from 'styled-components';
import Movies from './Movies';
import db from '../firebase';
import { collection, getDocs } from "firebase/firestore"; 
import axios from 'axios';

const Home = () => {

  const [data,setData] = useState([]);

  useEffect(() => {
    axios.get( 'http://localhost:3001/movies')
    .then((res) => {

      //console.log("res",res)
     
      let tempMovies = res.data.map((movie)=>{
      
        return { id: movie.imdbID,...movie }
      })
     console.log("temp",tempMovies)
      setData(tempMovies)
     
    });
  
  }, []);

  return (
    <Component>
        <ImgSlider />
        <Viewers />
        <Movies movies={data}/>
       
    </Component>
  )
}

export default Home

const Component  = styled.div`
overflow-x:hidden;
`