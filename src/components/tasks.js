import React from 'react';
import {Alert,Platform, StyleSheet, Text, View, TextInput, TouchableOpacity , FlatList} from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
class Tasks extends React.Component
{

    constructor(props, navigation ) {
        super(props);
        this.state = {
          date: new Date(),
           arr:[
               
           ]
        }
        this.Update = this.Update.bind(this)
        this.RemoveData = this.RemoveData.bind(this)
        this.GetItem = this.GetItem.bind(this)
    }
   
    RemoveData = async() =>{
        try {
            await AsyncStorage.removeItem('jwt_token');
        }
        catch(exception) {
            console.log(exception);
        }
        this.props.navigation.push("Main");
    }
    IsLoggined = async () => {
        try {
         value = await AsyncStorage.getItem('jwt_token');
          if (value != null) {
            // We have data!!
            console.log(value);
            return true;
          }
          else
          {
                console.log("feef");
              return false;
          }
        } catch (error) {
            return false;
          // Error retrieving data
        }
      };
      FlatListItemSeparator = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
          />
        );
      };
     findArrayElementById=(id) =>{
        return this.state.arr.find((element) => {
          return element.id === id;
        })
      }
      GetItem = (item)=>{
        let element = this.findArrayElementById(item);
        this.props.navigation.push(
          'Card',
          { element },
        );
         
      }
      AddNewPress= ()=>
      {
        this.props.navigation.push("AddNew")
      }
    async Update()
    {
        axios.post('https://localhost:44399/Tasks/GetAllTasksByUser',{date:this.state.date}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ await AsyncStorage.getItem('jwt_token')
            },
        })
        .then(response => {
             
         this.setState({
            arr: response.data
        }
        
        );           
       
        if(this.state.arr.length!=0)
        {

        }
        else
        {
          alert('Немає запланованих подій цього дня!')
        }
        console.log("Вдалий запит");
        })
        .catch(error => {

            console.log(error)
        });
    }
    componentDidMount()
    {
        //send request
      
    }
    componentDidUpdate()
    {}
    render(){
    return(<View style={styles.container2}>
        <View style={styles.container} >
         <Text style={styles.logo}>Помічник Боб</Text>
         <TouchableOpacity style={styles.loginBtn} onPress={this.AddNewPress}>
			<Text style={styles.loginText}>Додати новий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.Update}>
			<Text style={styles.loginText}>Завантажити</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.RemoveData}>
			<Text style={styles.loginText}>Вийти</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.MainContainer}>
          <View style={styles.SpecialContainer}>
        <DatePicker
        style={{width: 200, color:"white"}}
        date={this.state.date}
        mode="date"
        placeholder="Обрати дату"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        date={new Date()}
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36, color:"white",
          },  
           placeholderText: {
            fontSize: 18,
            color: 'white'
        }, dateText:{
            color: '#c7c8ca',
            justifyContent: 'flex-start'
          }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
            />
        <Text style={styles.name}>Задачі:</Text>
        </View>
        <FlatList

        data={this.state.arr}
        extraData={this.state.arr}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={({ item }) => (
            <View>
              <Text
                style={styles.item}
                onPress={this.GetItem.bind(
                  this,
                   item.id 
                )}>
                {item.name}   </Text>
            </View>
          )}
        />
           </View>
        </View>
       )
        
    }
    
}
const styles = StyleSheet.create({
    container2: {  flex: 1, justifyContent: 'flex-start',  backgroundColor: '#003f5c', paddingTop:30,    },
	container: {
	  flex: 1,
	  backgroundColor: '#003f5c',
	  alignItems: 'center',
	  marginBottom:0
	},
	logo:{
	  fontWeight:"bold",
	  fontSize:50,
	  color:"#fb5b5a",
	  marginBottom:0
	},
	inputText:{
	  height:50,
	  color:"white"
  },
  name:{
    fontWeight:"bold",
    fontSize:25,
    color:"#fb5b5a",
    marginBottom:0
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
    listBtn:{
        width:"80%",
        backgroundColor:"#407294",
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:0
      },
	loginText:{
	  color:"white"
    },
    MainContainer: {
        flex: 1,
      
        
        marginLeft: 10,
        marginRight: 10,
        marginBottom:0,
        marginTop: 0,
      },
      SpecialContainer:{
        alignItems: 'center',
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
        backgroundColor: '#ff4040',
        color:"white",
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },
  });
  export default Tasks;