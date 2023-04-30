import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Movies = (props) => {

   // console.log("props",props)
  return (
    <Container>
        <h4>Recommneded For You</h4>
        <Content>
           
            {
                props.movies.map((movie,index)=>{
                    return(
                        <Link to={`/detail/${movie.id}`} key={movie.id}>
                        <Wrap >
                            <img src={movie.Poster} />
                        </Wrap>
                        </Link>
                    )
                })
            }
       
       

        </Content>
    </Container>
  )
}

export default Movies

const Container = styled.div`
`

const Content = styled.div`
display:grid;
grid-gap:25px;
grid-template-columns:repeat(4,minmax(0,1fr));
padding:10px 30px;
`

const Wrap = styled.div`

border: 3px solid rgba(249,249,249,0.1);
    border-radius:10px;
    overflow:hidden;
    box-shadow: rgb(0 0 0 /69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor:pointer;
    transition: all 250ms cubic-bezier(0.25,0.46,0.45,0.94) 0s;

    img{
        width:100%;
        height:100%;
        object-fit:cover;
    }
    &:hover{
        transform:scale(1.05);
        border-color: rgba(249,249,249,0.8);
    }
`