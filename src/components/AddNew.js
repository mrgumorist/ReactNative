import React from 'react';
import {Alert,Platform, StyleSheet, Text, View, TextInput, TouchableOpacity , FlatList, AsyncStorage} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import DropDownPicker from 'react-native-dropdown-picker';
class AddNew extends React.Component
{
    constructor(props, navigation ) {
        super(props);
        this.state = {
            Name:null,
            Description:null,
            date: new Date(),
            Category:null,
            IsComplited:null, 
            arr:[],
        }
        this.ToNeededArray = this.ToNeededArray.bind(this)
        this.AddNewPress = this.AddNewPress.bind(this)
        
    }
    ToNeededArray=()=>{
        const out=[];
        for (let categoryObject of this.state.arr) {
            out.push({label:categoryObject.categoryName, value:categoryObject.categoryName});
        }
        return out;
        
    }
    componentDidMount()
    {
        this.LoadCategories();
    }
     LoadCategories = async () =>
    {
        axios.get('https://localhost:44399/Tasks/GetAllCategories', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ await AsyncStorage.getItem('jwt_token')
            },
        })
        .then(response => {
             
         this.setState({
            arr: response.data
        });           
        console.log("Вдалий запит");
          
        })
        .catch(error => {
            console.log(error)
            alert("Відсутнє з'єднання ")
        });
    }
    CancelPress = () => {
        this.props.navigation.goBack();
    }
    AddNewPress = async () => {
    if(this.state.Name!=null&&this.state.Description!=null&&this.state.date!=null&&this.state.Category!=null)
    {
        if(this.state.Name!=''&&this.state.Description!=''&&this.state.date!=''&&this.state.Category!='')
        {
            console.log(await AsyncStorage.getItem('jwt_token'));
            axios.post('https://localhost:44399/Tasks/AddTask', {
                    Name: this.state.Name,
                    Description: this.state.Description,
                    Category: this.state.Category,
                    date: this.state.date,
                    IsComplited:false, id:1},{
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+ await AsyncStorage.getItem('jwt_token')
                },
            })
            .then(response => {
                 
                console.log(response)          
                this.props.navigation.goBack();
                alert("Додано!")
              
            })
            .catch(error => {
                console.log(error)
                alert("Відсутнє з'єднання ")
            });
        }
        else
        {
            alert("Заповніть всі поля!")
        }
    }
    else
    {
        alert("Заповніть всі поля!")
    }
    {

    }
    }
        render(){
            return(<View style={styles.container}>
                 <Text style={styles.logo}>Помічник Боб</Text>
                 <Text style={styles.name}>Додавання</Text>
                 
		        <View style={styles.inputView} >
			        <TextInput  
			  style={styles.inputText}
			  placeholder="Назва..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({Name:text})}/>
		        </View>
                <View style={styles.inputView} >
			        <TextInput  
			  style={styles.inputText}
			  placeholder="Опис..." 
			  placeholderTextColor="#003f5c"
			  onChangeText={text => this.setState({Description:text})}/>
		        </View>
                <DropDownPicker
    items={this.ToNeededArray()}
    placeholder="Оберіть категорію"
    containerStyle={styles.forcontainer}
    style={{backgroundColor: '#fafafa'}}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    onChangeItem={item => this.setState({
        Category: item.value
    })}
/>
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
          // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
            />
            <TouchableOpacity style={styles.loginBtn} onPress={this.AddNewPress}>
			<Text style={styles.loginText}>Додати новий</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={this.CancelPress}>
			<Text style={styles.loginText}>Скасувати</Text>
        </TouchableOpacity>
                </View>)
            }
        
      
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
	  justifyContent: 'center',
        marginBottom:0,
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
      inputText:{
        height:50,
        color:"white"
      },
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
        marginBottom:10
      },	loginText:{
        color:"white"
      },
      forcontainer:{
    height: 40, 
     width:"80%",
      marginBottom:10
    }},)
export default AddNew;