import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {
    useLocation
  } from "react-router-dom";
import { connectStorageEmulator } from 'firebase/storage';

const PlayVideo = () => {

  const [play, setPlay]  = useState(false);
  const [barWidth,setWidth] = useState(0);
  const [show,setShow] = useState(false);
  const [clock,setClock] = useState('');
  const {state} = useLocation();
  const videoRef = React.useRef();
  const [curTime,setCurTime]=useState('00:00')


const handleTimeUpdate =() =>{
    var widthBar =  (videoRef.current.currentTime / videoRef.current.duration)*100;
    setWidth(widthBar)
    if(widthBar==100){
        setPlay(false)
    }
    if(widthBar!=0){
        let hrs=(Math.floor(videoRef.current.currentTime/3600)).toString();
         if(hrs.length == 1){
            hrs+='0'
         }
         const forM = Math.floor((videoRef.current.currentTime) % 3600)
         

        let mins=(Math.floor(forM/60)).toString();
        if(mins.length == 1){
            mins = '0' + mins;
         }
      
         let sec=(Math.floor(forM%60)).toString();
         if(sec.length == 1){
            sec = '0' + sec;
         }
         let timeF = ''
         if(hrs !== '00'){
            timeF = hrs+ ':'
         }
         timeF +=  mins + ':' + sec;
         
         setCurTime(timeF)
    }
}
const reverseVideo=()=>{
    videoRef.current.currentTime-=2;
}
const forwardVideo=()=>{
    videoRef.current.currentTime+=2;
}

  const playPause =()=>{
   
  setPlay(!play)

  }
  const jumpTo = (e) =>{
  
    var jumpOn = (e.nativeEvent.offsetX/e.currentTarget.offsetWidth)*100
    videoRef.current.currentTime = jumpOn*videoRef.current.duration/100
  
    setWidth(jumpOn)
    

  }

  useEffect(() => {
    if(play === true){
      
        videoRef.current.play()
       
        
       }
       else{
      
        videoRef.current.pause()
       }
    
  }, [play]);

  useEffect(() => {
    console.log("link",state.link)
   // axios.get(state.link);
    setTimeout(()=>{
        setShow(true)
       
         let hrs=(Math.floor(videoRef.current.duration/3600)).toString();
         if(hrs.length == 1){
            hrs+='0'
         }
         const forM = Math.floor((videoRef.current.duration) % 3600)
         

        let mins=(Math.floor(forM/60)).toString();
        if(mins.length == 1){
            mins = '0' + mins;
         }
      
         let sec=(Math.floor(forM%60)).toString();
         if(sec.length == 1){
            sec = '0' + sec;
         }
         let timeF = ''
         if(hrs !== '00'){
            timeF = hrs+ ':'
         }
         timeF +=  mins + ':' + sec;
         console.log("hrs",timeF)
         setClock(timeF)
    },1500)
  }, []);

  const onSlide = (e) =>{
       
        videoRef.current.volume = e.target.value/50;
  }
  const fullScreen = (e) =>{
    var elem = document.getElementById('videoP');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
  }

  const dragStart = (e) =>{

    function onMouseMove(mouseMoveEvent) {
      
        setWidth(((mouseMoveEvent.offsetX)/document.getElementById('mainBar').getBoundingClientRect().width)*100)
    }
    function onMouseUp() {
      document.getElementById('mainBar').removeEventListener("mousemove",onMouseMove);
     
    }

document.getElementById('mainBar').addEventListener("mousemove", onMouseMove);
document.getElementById('mainBar').addEventListener("mouseup", onMouseUp, { once: true });

  }


  return (
    <Container>
    <Main>
        <Video  src='/demoVideo.mp4' ref={videoRef} onTimeUpdate={handleTimeUpdate} id="videoP">
      
        </Video>
        <BottomBar status={play}>
        <MainBar onClick={(e) => jumpTo(e)} id="mainBar" >
            <ProgrssBar barWidth={barWidth}  id="progressBar" onMouseDown={dragStart}>

            </ProgrssBar>
            </MainBar>
        <Controls>

        <PlayButton id='play-pause' onClick={playPause} draggable="false">
            
            { play && barWidth!=100 ?  <Pause></Pause> : !play && barWidth==100 ? <Replay></Replay> :
            <img src='/images/play-icon-white.png' />
            }
            <Tooltip>Play-pause</Tooltip>
            </PlayButton>
            
            { show &&
            <ShowTime>
            <span>{curTime} / {clock}</span>
            </ShowTime>
}
        <VolD> 
        <Volume className="range" type="range" id="vol" name="vol" min="0" max="50" onChange={(e) => onSlide(e)} />
        </VolD> 
        {/* <Arrow>
            <Stem></Stem>
        <WatchList>
               
        </WatchList>
        </Arrow> */}
            <TimeSpan>
                <B1 onClick={reverseVideo} barWidth={barWidth}></B1><F1 onClick={forwardVideo} barWidth={barWidth}></F1>

            </TimeSpan>
            <FullScreen>
                <span onClick={fullScreen}>&#x26F6;</span>
            </FullScreen>
           
        </Controls>
        </BottomBar>
    </Main>
    </Container>
  )
}

const Video = styled.video`
width: 100%;
`

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Main = styled.div`
    position: relative;
`
const BottomBar = styled.div`
 position: absolute;
    background:rgba(0,0,0,0.7);
    align-items: center;
    width:100%;
    bottom:0;
    padding:00px 20px;
    opacity: ${props => props.status === true ? 0 : 1};
    transition: opacity 0.3s ease-out;
    ${Main}:hover & {
        
        opacity: 1;
  }
`
const Controls = styled.div`
   display: flex;
    width:100%;
    margin-top:1%;
`
const ProgrssBar = styled.div`
    width:  ${props => props.barWidth}%; 
    height:5px;
    background-color:red;
    position: relative;
  
    &:after{
        content:'';
        width:11px;
        height:11px;
        border-radius:50%;
        background: red;
        display:block;
        right:-3px;
        position:absolute;
        margin-top:-3px;
    }

`
const MainBar = styled.div`
    width: 100%;
    height:5px;
    background-color: white;
    top:0;
    left:0;
    cursor:pointer;
`

const PlayButton = styled.button`
    
    background-color: rgba(0,0,0,0.3);
   color:white;
   border:1px solid white;
   border-radius: 50%;
   height:30px;
   width:30px;
   position:relative;
   img{
    width: 30px;
    padding-right:10px;
   }


`
const Pause = styled.div`
background-color: rgba(0,0,0,0.3);
    &:before{
        content: "❚❚";
    }
`
const TimeSpan = styled.div`
    display: flex;
    margin-left:auto;
`
const F1 = styled.span`
    padding:10px 10px;
    pointer-events: ${props => props.barWidth===100 ? 'none':'all'};
    opacity:${props => props.barWidth===100 ? 0.4:1};
    cursor: pointer;
    &:before{
            content: '↻';
            display: block;

                
                }
            
  
`
const B1 = styled.span`
    padding:10px 10px;
    pointer-events: ${props => props.barWidth===0 ? 'none':'all'};
    opacity:${props => props.barWidth===0 ? 0.4:1};
    cursor: pointer;
    &:before{
            content: '↺';
            display: block;
            }
`
const Arrow = styled.div`
    width:100px;
`
const Stem = styled.div`
   height: 50px;
   width:100px;
   border: 20px solid transparent;

   border-left:20px solid blue;
   border-top:20px solid blue;
   border-bottom:20px solid blue;
   border-radius: 50%;
`
const WatchList = styled.div`
   border-left:20px solid white;
   border-top:20px solid red;
   border-bottom:20px solid yellow;
   float: right;
   width: 0; 
	height: 0; 

`
const ShowTime = styled.div`
    display: table;
    margin-left: 20px;
    margin-bottom:9px;
    span{
        display:table-cell;
        vertical-align: middle;
    }

`
const VolD = styled.div`
text-align: center;
    margin-top: auto;
    margin-bottom: auto;
    .range{
        -webkit-appearance: none;
        appearance: none;
        width: 50%;
        height:10px;
        border-radius: 10px;
        background: grey;

       
    }

`

const Volume = styled.input`

    
  
`
const Replay = styled.div`
        width :100%;
        &:before{
            content: '↺';
            display: block;

                
                }
`

const Tooltip = styled.span`


    /* width: 10px;
    height: 10px; */
    pointer-events: none;;
    padding:10px;
    background: yellow;
    opacity: 0;
    z-index: 100;
    color:red;
    position:absolute;
    bottom:100%;
    border-radius:10px;
    transition: opacity 0.5s ease-out;
    ${PlayButton}:hover & {
        
        opacity: 1;
  }

`

   const FullScreen = styled.div`
   margin-top:8px;
   padding-left:10px;
   cursor: pointer;
   `


export default PlayVideo