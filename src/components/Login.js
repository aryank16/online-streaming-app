import React,{useEffect} from 'react'
import styled from 'styled-components'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { useDispatch,useSelector } from 'react-redux';
import {signIn} from '../redux/userReducer'
import {useNavigate} from "react-router-dom"

const Login = () => {

    const dispatch = useDispatch();
    const navigate=useNavigate();
    const userStored= JSON.parse(window.localStorage.getItem('user'))
    if(userStored){
        dispatch(signIn(userStored))
       // console.log("user123",userStored)
        
    } 
   
    useEffect(() => {
        console.log("user123",userStored)
        if(userStored){
            navigate('/');
        }
    }, []);

   
      const responseGoogleFail = (response) => {
        console.log("err",response);
      }
  return (
   
   <Container>
       <Background>
            <img src='/images/login-background.jpg' />
        </Background>
        <CTA>
            <CTALogoOne src='/images/cta-logo-one.svg' />
            
                { 
                userStored== null ? (
                    <SignUp>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    axios.post( 'http://localhost:5000/user',{
            
                        cred: credentialResponse.credential
                      
                })
                .then((res) => {
            
                 console.log("response",res)
                 const user ={
                    name:res.data.name,
                    email:res.data.email,
                    photo:res.data.picture
                 }
                 dispatch(signIn(user))
                window.localStorage.setItem("user",JSON.stringify(user))
                navigate('/')
                });

                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            /> </SignUp>) : (<>
             <SignUp>Watch All Here</SignUp>
            </>)
            }
            
            <Description>
            ​Get Premier Access to Raya and the Last Dragon for an additional fee with a Disney+ subscription. As of 03/26/21, the price of Disney+ and The Disney Bundle will increase by $1.
            </Description>
            <CTALogoTwo src='/images/cta-logo-two.png' />
        </CTA>
        <>
       

        </>
        
   </Container>    
  )
}

export default Login

const Container = styled.div`

    position: relative;
    height:100vh - 70px;
    display:flex;
    align-items: center;
    justify-content: center;
    
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

const CTA  = styled.div`
    max-width:650px;
    padding: 80px 40px;
    width: 80%;
    display: flex;
    flex-direction: column;
`

const CTALogoOne  = styled.img`
`
const CTALogoTwo = styled.img`
`

const SignUp  = styled.a`

    width: 100%;
    background-color: #3e3eed;
    padding:17px 0;
    border-radius: 4px;
    text-align: center;
    cursor:pointer;
    letter-spacing: 1.5px;
    margin-bottom: 10px;

    &:hover{
        background-color: #5f5fcd;
    }
`

const Description = styled.p`
    text-align: center;
    font-size:11px;
    line-height: 1.5;
`