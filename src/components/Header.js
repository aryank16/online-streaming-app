import React ,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { useSelector ,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signIn} from '../redux/userReducer'

const Header = () => {

  let navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state)=> state.user)
  const [isdropDown, setDropDown] = useState(false);
 
  if(window.localStorage.getItem('user')){
  var user1 = JSON.parse(window.localStorage.getItem('user'))
    dispatch(signIn(user1))
  }
  console.log("user",user,user1)
  const showDropDown = () =>{
   
    setDropDown(!isdropDown);
  }
  const LoginOut = () =>{
    if(user.name==''){
      navigate('/login')
    }
    else{
      window.localStorage.removeItem('user')
    }
      
  }
  const dropDown = () =>{
    return (
      <ul style={{ listStyle: 'none', border: '1px solid #000',borderRadius:'10px',padding:'10px',textAlign: 'center',background:'grey',marginTop:'0px',position:'absolute',right:"20px",zIndex:"1000" }}>
        <li style={{cursor:'pointer'}}>Profile </li>
        <li style={{cursor:'pointer'}} onClick={LoginOut}>
          {
            user.name=='' ? 'Logout':'Login'
          }
        </li>
      </ul>
    );
    
  }
  
  return (
    <>
    <Nav>
     <Logo src='/images/logo.svg' />
     <Navmenu >
      <a href=''>
        <img src='/images/home-icon.svg'/>
        <span>HOME</span>
      </a>
      <a href=''>
        <img src='/images/search-icon.svg'/>
        <span>SEARCH</span>
      </a>
      <a href=''>
        <img src='/images/watchlist-icon.svg'/>
        <span>WATCHLIST</span>
      </a>
      <a href=''>
        <img src='/images/original-icon.svg'/>
        <span>ORIGINAL</span>
      </a>
      <a href=''>
        <img src='/images/movie-icon.svg'/>
        <span>MOVIES</span>
      </a>
      <a href=''>
        <img src='/images/series-icon.svg'/>
        <span>SERIES</span>
      </a>
     </Navmenu> 
     <div> 
      <div style={{float:'left'}}>
      {
       user.name != '' ? (
        <UserImage src={user.photo} onClick = {showDropDown}/>
      ) : ( <UserImage src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'onClick = {showDropDown}/>)

      }
     </div>
    
      </div>
    
      </Nav>
       <div>
       {
         isdropDown == true ? (
           dropDown()
         ) : ''
       }
       </div>
       </>
  )
}

export default Header

const Nav = styled.nav`
  height:70px;
  background-color:#090b13;
  display:flex;
  align-items:center;
  padding: 0px 36px;
`

const Logo = styled.img`
width:80px;

`
const Navmenu = styled.div`
display:flex;
flex:1;
align-items:center;
a{
  display:flex;
  align-items:center;
  padding: 0 12px;

  img{
    height:20px;
  }
  span{
    font-size:13px;
    letter-spacing:1.42px;
    position:relative;
    &:after{
      content:'';
      background:white;
      height:2px;
      bottom:-6px;
      right:0;
      position:absolute;
      left:0;
      opacity:0;
      transform:scaleX(0);
    }
  }
  &:hover{
    span:after{
      opacity:1;
      transform:scaleX(1);

    }
  }
}

`

const UserImage = styled.img`
width:48px;
height:48px;
border-radius:50%;
cursor:pointer;
`