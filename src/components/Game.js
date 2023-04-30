import React,{useState} from 'react'

const Game = () => {

//   var a = 5
// if(true) {
// console.log(a)
// let a = 10
// let b = 5
// console.log(a,5)
// }

// let obj1 = {
//   a: 1,
//   b: {
//     c: 2,
//     d: 3
//   }
// }
// let obj2  = {...obj1}
// obj1.a = 5
// obj2.b.c = 10
// console.log(obj1)
// console.log(obj2)

// for (var i = 0; i < 3; i++) {
//   setTimeout(function log() {
//     console.log(i);
//   }, 10

// for (var i = 0; i < 3; i++) {
//   setTimeout(function log() {
//     console.log(i);
//   }, 1000);
// }


    const arr = [];
    const [flag,setFlag] = useState(false);
    const handleClick = e =>{
    //  alert(id)
    console.log(e,)
      // if(!document.getElementById(id).disabled){
      // if(flag){
      //   document.getElementById(id).value = '0'
      // }
      // else{
      //   document.getElementById(id).value = 'x'
       
      // }
      // document.getElementById(id).disabled=true;
      // setFlag(!flag);
      // checkWinner(id);
  //  }
      
    }
    const checkWinner = (id) =>{
      let clickVal =  document.getElementById(id).value;
      let row = id.split('_')[1];
      let col = id.split('_')[0];
     // console.log("row" + row , "col" + col)
      //console.log("this",document.getElementById('1_'+row).value== clickVal,document.getElementById('2_'+row).value== clickVal,document.getElementById('2_'+row).value== clickVal)

        if(document.getElementById('1_'+row).value== clickVal && document.getElementById('2_'+row).value== clickVal && document.getElementById('3_'+row).value== clickVal  ){
            console.log("winner",flag)
            if(flag){
              alert('player 2 is winner')
            }
            else{
              alert('player 1 is winner')
            }
            return;
        }
        else{
        if(document.getElementById(col+'_1').value== clickVal && document.getElementById(col+'_2').value== clickVal && document.getElementById(col+'_3').value== clickVal){
          if(flag){
            alert('player 2 is winner')
          }
          else{
            alert('player 1 is winner')
          }
          return
        }
        else{
          if((document.getElementById('1_1').value== clickVal && document.getElementById('2_2').value== clickVal && document.getElementById('3_3').value== clickVal) || (document.getElementById('1_3').value== clickVal && document.getElementById('2_2').value== clickVal && document.getElementById('3_1').value== clickVal) ){
            if(flag){
              alert('player 2 is winner')
            }
            else{
              alert('player 1 is winner')
            }
            return
          }
          else{
            var c=0;
            for(let i=1;i<4;i++){
              for(let j=1;j<4;j++){
                 if( document.getElementById(i+'_'+j).disabled==true ){
                   c=c+1;
                 }
              }
            }
            if(c==9){
              alert('match is tied')
              for(let i=1;i<4;i++){
                for(let j=1;j<4;j++){
                   document.getElementById(i+'_'+j).disabled=false
                    document.getElementById(i+'_'+j).value=''
                }
              }
              return;
            }
          }
          
        }

        }
      
    }


    for(let i=1;i<4;i++){
        arr.push(<tr>
          <td onClick={()=> handleClick()} ><input type="text" id={'1_' + i}></input></td>
          <td onClick={(e)=> handleClick(e)} ><input type="text" id={'2_' + i}></input></td>
          <td onClick={(e)=> handleClick(e)} ><input type="text" id={'3_' + i}></input></td></tr>)
    }
  return (
    <div>
        <table>
            <tbody>
              {arr}

            </tbody>
            

        </table>
    </div>
  )
}

export default Game