import React ,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios';
import PlayVideo from './PlayVideo';
import { useSelector } from 'react-redux';

const Detail = () => {

    const {id} = useParams();
    const [movieDet,setMovieDet] =  useState([]);
    const navigate=useNavigate();
    let user = useSelector((state)=> state.user)

    useEffect(()=>{
        axios.get(`http://localhost:3001/movies/${id}`)
        .then((res)=>{
            console.log("respose",res)
            setMovieDet(res.data);
        })

    },[])

    const playVideo = (link) =>{
      if(user.name!=''){
        navigate('/playvideo',{state:{link:"http://techslides.com/demos/sample-videos/small.mp4"}})
      }
      else{
        navigate('/login')
      }
    }

  
  return (
    <Component>
        { movieDet && ( 
            <>
            <Background>
            <img src={movieDet.Poster} />
        </Background>
        <ImageTitle>
            <span>{movieDet.Title}</span>
        </ImageTitle>
        <Controls>
            <PlayButton>
                <img src='/images/play-icon-black.png' />
                
                <span onClick={()=> playVideo('https://www.bigbuckbunny.org/')}>PLAY</span>
            </PlayButton>
            <TrailerButton>
            <img src='/images/play-icon-white.png' />
                <span>TRAILER</span>
            </TrailerButton>
            <AddButton>
               <span>+</span>
            </AddButton>
            <GroupButon>
            <img src='/images/group-icon.png' />
            </GroupButon>

        </Controls>
        <SubTitle>
            subtitle
        </SubTitle>
        <Description>
            here comes the description
        </Description>
        </>
        )}
        

    </Component>
  )
}

export default Detail

const Component = styled.div`
    min-height: calc(100vh - 70px);
    position:relative;

`

const Background = styled.div`
    position:fixed;
    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index:-1;
    opacity:0.8;

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
`

const ImageTitle = styled.div`
   
    width:40vw;
    min-height:170px;
    min-width:200px;
    padding: 5%;
    /* img{
        height:100%;
        width:100%;
        object-fit:contain;
    } */
    span{
        font-size: 50px;
    }

`

const Controls = styled.div`
   display: flex;
   align-items: center;

`

const PlayButton = styled.button`
   border-radius:4px;
   font-size:15px;
   display:flex;
   align-items: center;
   height: 56px;
   background-color: rgb(249,249,249);
   border:none;
   padding:0 24px;
   margin-right:22px;
   cursor:pointer;

   &:hover{
       background-color:rgb(198,198,198) ;
   }

`

const TrailerButton = styled(PlayButton)`
   background-color: rgba(0,0,0,0.3);
   color:white;
   border:1px solid white;

`

const AddButton = styled.button`
  width:38px;
  height:38px;
  display:flex;
  justify-content: center;
  border-radius: 50%;
  border:2px solid white;
  background-color: rgba(0,0,0,0.6);
  margin-right:22px;
  cursor:pointer;
  span{
      font-size:30px;
      color:white;
  }

`

const GroupButon = styled(AddButton)`

`

const SubTitle = styled.div`
    margin-top: 26px;;
`
const Description = styled.div`

`
