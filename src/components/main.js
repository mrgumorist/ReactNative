import React from 'react';
import {Alert,Platform, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { AsyncStorage } from "react-native"
import axios from 'axios';
const saveData = async(value) => {
    try {
       await AsyncStorage.setItem('jwt_token', value);
    } catch (e) { 
      alert(e)
    }
  }
  
 class Main extends React.Component {
    constructor(props, navigation ) {
        super(props);
        this.state = {
            email:"temp",
            password:"temp"
        }
        this.Login = this.Login.bind(this)
        this.IsLoggined = this.IsLoggined.bind(this)
    }
    IsLoggined = async() => {
        try {
         let value =  await AsyncStorage.getItem('jwt_token');
          if (value != null) {
            // We have data!!
            this.props.navigation.push('Tasks')
            console.log('not null');
            return true;
          }
          else
          {
                console.log("null");
            
              return false;
          }
        } catch (error) {
           
            console.log(error);
            return false;
          // Error retrieving data
        }
      };
    Login= ()=>{
       axios.post('https://localhost:44399/Account/Login', {
        email: this.state.email,
        password: this.state.password
    })
    .then(response => { 
       //save
       saveData(response.data)
       alert("Вдалий вхід");
      
        this.props.navigation.push("Tasks")
       //alert(response.data);
    })
    .catch(error => {
        alert('Помилка входу');
    });
      }
       componentDidMount(){
        if ( this.IsLoggined()==true)
        {
           console.log("ok");
        }
        else
        {
           
        }
      }
      componentDidUpdate()
      {
        if ( this.IsLoggined()==true)
        {
           console.log("ok");
        }
        else
        {
           
        }
      }
    onPressLogin = () => { this.Login()};
    onPressRegister=()=>{ this.props.navigation.push('Register')};
	render(){
       
	  return (            
		<View style={styles.container}>
		  <Text style={styles.logo}>Помічник Боб</Text>
          
		  <View style={styles.inputView} >
			<TextInput  
			  style={styles.inputText}
			  placeholder="Пошта..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({email:text})}/>
		  </View>
		  <View style={styles.inputView} >
			<TextInput  
			  secureTextEntry
			  style={styles.inputText}
			  placeholder="Пароль..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({password:text})}/>
		  </View>
		  <TouchableOpacity style={styles.loginBtn} onPress={this.onPressLogin}>
			<Text style={styles.loginText}>Вхід</Text>
		  </TouchableOpacity>
		  <TouchableOpacity>
			<Text style={styles.loginText} onPress={this.onPressRegister}>Реєстрація</Text>
		  </TouchableOpacity>
		</View>
	  );
    }}

  
  
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
	loginBtn:{
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
  
export default Main;
