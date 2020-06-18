import * as React from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import {Provider} from 'react-redux';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from "react-native"
import axios from 'axios';
 class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        }
    }
	Register= ()=>{
        axios.post('https://localhost:44399/Account/Register', {
         email: this.state.email,
         password: this.state.password
     })
     .then(response => { 
        //save
        alert("Вдала реєстрація! Увійдіть!");
        this.props.navigation.goBack();
     })
     .catch(error => {
         alert('Помилка реєстрації. Можливо дана пошта уже використовується або пароль занадто короткий.');
     });
    }
    onPressLogin = () => {this.props.navigation.goBack()};
    onPressRegister=()=>{ this.Register()};
	render(){
	  return (
		<View style={styles.container}>
		  <Text style={styles.logo}>Помічник Боб</Text>
		  <View style={styles.inputView} >
			<TextInput  
			  style={styles.inputText}
			  placeholder="Email..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({email:text})}/>
		  </View>
		  <View style={styles.inputView} >
			<TextInput  
			  style={styles.inputText}
			  placeholder="Password..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({password:text})}/>
		  </View>
		  <TouchableOpacity style={styles.registerbtn} onPress={this.onPressRegister}>
			<Text style={styles.loginText}>Заєреструватися</Text>
		  </TouchableOpacity>
		  <TouchableOpacity onPress={this.onPressLogin}>
			<Text style={styles.loginText}>Повернутися назад</Text>
		  </TouchableOpacity>
  
	
		</View>
	  );
	}
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#003f5c',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	logo:{
	  fontWeight:"bold",
	  fontSize:50,
	  color:"#fb5b5a",
	  marginBottom:40
	},
	inputView:{
	  width:"80%",
	  backgroundColor:"#465881",
	  borderRadius:25,
	  height:50,
	  marginBottom:20,
	  justifyContent:"center",
	  padding:20
	},
	inputText:{
	  height:50,
	  color:"white"
	},
	forgot:{
	  color:"white",
	  fontSize:11
	},
	registerbtn:{
	  width:"80%",
	  backgroundColor:"#fb5b5a",
	  borderRadius:25,
	  height:50,
	  alignItems:"center",
	  justifyContent:"center",
	  marginTop:10,
	  marginBottom:10
	},
	loginText:{
	  color:"white"
	}
  });
  
export default Register;
