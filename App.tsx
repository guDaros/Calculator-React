{/* GUSTAVO DAROS RA: 2019102342 */}
import React,{useState} from "react";
import {StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableHighlight, Dimensions} from 'react-native';


let state = {
  screenVal:'', // valores aparecendo ao clicar nos botões simples(numeros e operadores)
  screenResult:0, //resultado da conta
  result:false, //se ja foi feito o calculo, ou seja, clicado no botão de igual "=", ele é setado como true
  dot:false //só pode aparecer uma virgula
}

export default function app(){

  const [screenValue, setScreenValue] = useState(state.screenVal);
  const [screenResult, setScreenResult] = useState(state.screenResult);


  const addDigit = (digit: string) =>{
    
    let slice = screenValue.slice(-1);
    if(state.screenVal.length == 0 && digit == '.'){
      state.screenVal = "0";
    }else if((slice == "+" || slice == "-" || slice == "/" || slice == '*') && digit == '.'){
      state.screenVal = state.screenVal +  "0";
    }


    if(digit == "+" || digit == "-" || digit == "/" || digit == '*'){
      state.dot=false;
    }

    if(digit == "." && !state.dot){
      state.dot=true;
      state.result=false;
    }else if(digit == "." && state.dot){
      return
    }

     if(state.result == true){
      state.screenVal = state.screenResult;
      state.screenResult = 0;
    }
    
      state.screenVal = state.screenVal + digit;
      setScreenValue(state.screenVal);
      setScreenResult(state.screenResult);
      state.result = false;
    
  }

  const reset = () =>{
     state = {
      screenVal:'', // valores aparecendo ao clicar nos botões simples(numeros e operadores)
      screenResult:0, //resultado da conta
      result:false, //se ja foi feito o calculo, ou seja, clicado no botão de igual "=", ele é setado como true
      dot:false //só pode aparecer uma virgula
    };

    setScreenValue(state.screenVal);
    setScreenResult(state.screenResult);
  }

  const result = (digit) =>{
    if(digit=='C'){
      reset();
      return;
    }else if(digit == "erase"){
      if(state.result){
        reset();
        return;
      }
      state.screenVal = screenValue.substring(0, (screenValue.length-1));
      setScreenValue(state.screenVal);
      return;
    }else if(digit == "equal"){
      try{
        state.screenResult = eval(state.screenVal);
        state.result=true;
        setScreenResult(state.screenResult);
      }catch{
        alert("operação inválida");
      }
    }
    
  };
  

  return(
    <SafeAreaView
    style={styles.display}>
      <StatusBar
        barStyle = "light-content"
        hidden = {false}
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
      <Calc value1={screenValue} value2={screenResult}/>
      <View style={styles.btn}>
        {/* botões do display igual a calc do windows */}
        <Buttons name="C" equal onclick={()=>{result("C")}}></Buttons>
        <Buttons name="(" onclick={()=>{addDigit('(')}}></Buttons>
        <Buttons name=")" onclick={()=>{addDigit(')')}}></Buttons>
        <Buttons name="E" erase onclick={()=>{result("erase")}}></Buttons>
        <Buttons name="7" onclick={()=>{addDigit('7')}}></Buttons>
        <Buttons name="8" onclick={()=>{addDigit('8')}}></Buttons>
        <Buttons name="9" onclick={()=>{addDigit('9')}}></Buttons>
        <Buttons name="*" op onclick={()=>{addDigit('*')}}></Buttons>
        <Buttons name="4" onclick={()=>{addDigit('4')}}></Buttons>
        <Buttons name="5" onclick={()=>{addDigit('5')}}></Buttons>
        <Buttons name="6" onclick={()=>{addDigit('6')}}></Buttons>
        <Buttons name="-" op onclick={()=>{addDigit('-')}}></Buttons>
        <Buttons name="1" onclick={()=>{addDigit('1')}}></Buttons>
        <Buttons name="2" onclick={()=>{addDigit('2')}}></Buttons>
        <Buttons name="3" onclick={()=>{addDigit('3')}}></Buttons>
        <Buttons name="+" op onclick={()=>{addDigit('+')}}></Buttons>
        <Buttons name="." onclick={()=>{addDigit('.')}}></Buttons>
        <Buttons name="0" onclick={()=>{addDigit('0')}}></Buttons>
        <Buttons name="=" equal onclick={()=>{result("equal")}}></Buttons>
        <Buttons name="/" op onclick={()=>{addDigit('/')}}></Buttons>
      </View>
      
      
    </SafeAreaView>
    )
};


const Calc = (props) =>{
  
    return(
      <View style={styles.display}>
        <Text
        style={styles.resultado}
          numberOfLines={1}
        >{props.value1}
        </Text>
        <Text
        style={styles.operador}
          numberOfLines={1}
        >{props.value2}
        </Text>
      </View>
       
    )
  
}

const Buttons = (props) =>{

  const stylesBtns = [styles.btnStyles]
  if(props.btnLarge){
    stylesBtns.push(styles.btnLarge)
  }if(props.equal){
    stylesBtns.push(styles.btnEqual)
  }if(props.op){
    stylesBtns.push(styles.btnOperation)
  }if(props.c){
    stylesBtns.push(styles.btnC)
  }if(props.erase){
    stylesBtns.push(styles.btnErase)
  }

  return(
        <View>
          <TouchableHighlight
          onPress={props.onclick}>
            <Text style={stylesBtns}>{props.name}</Text>
          </TouchableHighlight>
        </View>
  )
}





const styles = StyleSheet.create({
  display:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end',
    backgroundColor:'#f2f2f2',
    width:'100%'
  },
  operador:{
    fontSize:50,
    color:'#444',

  },
  resultado:{
    fontSize:35,
    color:'#444',
    
  },
  container:{
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center'
  },
  btn:{
    flexDirection:'row',
    flexWrap:"wrap"
  },
  btnStyles:{
    display: "flex",
    fontSize:30,
    width:Dimensions.get('window').width/4,
    height:Dimensions.get('window').width/4,
    justifyContent:"center",
    alignItems:"center",
    padding:30,
    backgroundColor:'#cfcfcf',
    color:'black',
   textAlign:'center'
  },
  btnEqual:{
    color:'#f00'
  },
  btnOperation:{
    color:'#00f'
  },
  btnC:{
    color:'blue'
  },
  btnErase:{
    color:'#f0f'
  },
  btnLarge:{
    width:(Dimensions.get('window').width/4)*2,
  }
})


