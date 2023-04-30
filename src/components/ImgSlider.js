import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';

const ImgSlider = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
      };

  return (
    <Carousel {...settings}>
         <Wrap>
             <img src='/images/slider-badging.jpg' alt=''/>
         </Wrap>
         <Wrap>
             <img src='/images/slider-badag.jpg' alt=''/>
         </Wrap>
         <Wrap>
             <img src='/images/slider-badging.jpg' alt=''/>
         </Wrap>
        
    </Carousel>
  )
}

export default ImgSlider

const Carousel = styled(Slider)`
margin-top:20px;

    ul li button{
        &:before{
            font-size:10px;
            color:white
        }
    }
    li.slick-active button::before{
        color:white;
    }

    .slick-list{
        overflow:visible;
    }
    
`

const Wrap = styled.div`
    img{
        width:100%;
        height:100%
    }



`