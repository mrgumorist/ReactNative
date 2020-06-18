import { ListItem } from 'react-native'
import React from 'react';
import {Alert,Platform, StyleSheet, Text, View, TextInput, TouchableOpacity , FlatList, AsyncStorage} from 'react-native';
import moment from 'moment'
import axios from 'axios';
export default class Card extends React.Component {
    constructor(props, navigation ) {
        super(props);
        this.state = {
            element : props.route.params.element
        }
    }
    handleDatePicked = (date) => {
        console.log(date);
        var ds = date.toString();
    
        var date = moment(new Date(ds.substr(0, 16)));
        return(date.format("DD/MM/YYYY"));
    
        
    
    };
    componentDidMount=()=>
    {
       console.log(this.state.element);
    }
    CancelPress = () => {
        this.props.navigation.goBack();
    }
    SetAsCompleated= async() => {
        axios.post('https://localhost:44399/Tasks/SetTaskAsComplited', {ID: this.state.element.id},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ await AsyncStorage.getItem('jwt_token')
            },
        })
        .then(response => {
            alert("Виконано! Оновіть задачі!");
        this.props.navigation.goBack();    
       
          
        })
        .catch(error => {
            console.log(error)
            alert("Відсутнє з'єднання ")
        });
        
    }
render () {
  return (
    <View style={styles.container}>
    <Text style={styles.logo}>Помічник Боб</Text>
    <Text style={styles.name}>Перегляд</Text>
    <View style={styles.container2}>
    <Text style={styles.title}>Ім'я</Text>
    <Text style={styles.loginText}>{this.state.element.name}</Text>
    <Text style={styles.title}>Опис</Text>
    <Text style={styles.loginText}>{this.state.element.description}</Text>
    <Text style={styles.title}>Категорія</Text>
    <Text style={styles.loginText}>{this.state.element.category}</Text>
    <Text style={styles.title}>Дата</Text>
    <Text style={styles.loginText}>{this.handleDatePicked(this.state.element.date)}</Text>
    </View>
    <TouchableOpacity style={styles.loginBtn} onPress={this.SetAsCompleated}>
			<Text style={styles.loginText}>Позначити як виконане</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.CancelPress}>
			<Text style={styles.loginText}>Повернутися назад</Text>
        </TouchableOpacity>
    </View>
  )
}}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
      justifyContent: 'center',
        marginBottom:0,
      },
      seondcontainer: {
        alignItems: 'left',
      justifyContent: 'left',
        marginBottom:0,
      },
      container2:{
          width:'80%'
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:0
      },
      name:{
        fontWeight:"bold",
        fontSize:25,
        color:"white",
        marginBottom:10
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
      },  title:{ width:"80%",
        fontWeight:"bold",
        fontSize:20,
        color:"white",
        marginBottom:0
      }
    })
