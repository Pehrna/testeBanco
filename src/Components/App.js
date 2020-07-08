import * as React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation }) {

  var projeto = [];
  const [data, setData] = React.useState([]);
  if (data.length === 0) {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(res => {

        setData(res);
        
      })
      .catch(err => console.log('Fail', err))
  }
  var aux = {};
  var rowsUser = [];
  var cont = 0;
  React.useEffect(() => {
    projeto = data;
    console.log(projeto)
    console.log(projeto.lenght)
  
    for (let i = 0; i < projeto.length; i++) {
      cont = 0;
      for (let j = 0; j < rowsUser.length; j++) {
        if (projeto[i].userId === rowsUser[j].numero) {
          cont = 1;
        }
      }
      if (cont === 0) {
        aux = { numero: projeto[i].userId, userId: "Key:" + projeto[i].userId, }
        rowsUser.push(aux);
      }
    }
  })

  // var aux = {};
  // var rowsUser = [];
  // var cont = 0;
  // for (let i = 0; i < projeto.length; i++) {
  //   cont = 0;
  //   for (let j = 0; j < rowsUser.length; j++) {
  //     if (projeto[i].userId === rowsUser[j].numero) {
  //       cont = 1;
  //     }
  //   }
  //   if (cont === 0) {
  //     aux = { numero: projeto[i].userId, userId: "Key:" + projeto[i].userId, }
  //     rowsUser.push(aux);
  //   }
  // }

  return (

    <View style={styles.container} >

      <FlatList
        data={rowsUser}
        renderItem={({ item }) =>

          <View style={styles.line}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Postagens', item)
            }} >
              <Text style={styles.info}>Usuario {item.numero} </Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => item.userId}
      />

    </View>
  );
}

function Postagens2({ navigation, route }) {
  const { numero } = route.params;
  console.log(route)
  console.log(JSON.stringify(route))
  console.log(route.params)
  console.log(JSON.stringify(route.params))
  console.log(numero);
  console.log(JSON.stringify(numero))

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Postagens')}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {

    super(props)
    this.state = { data: [] }
  }

  componentDidMount() {

    if (this.state.data.length === 0) {
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(res => {

          this.setState({
            data: res || []
          })

        })
        .catch(err => console.log('Fail', err))
    }
  }


  render() {

    //console.log(this.state.data);
    return (
      <NavigationContainer InitiaState={this.state.data}>
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Postagens" component={Postagens2} />
          {/* <View style={styles.container} >

                        <FlatList
                            data={rowsUser}
                            renderItem={({ item }) => (

                                <View style={styles.line}>
                                    {/* <TouchableOpacity  onPress={this.props.navigation.navigate('Postagens')} >
                                <Text style={styles.info}>Usuario {item} </Text>
                            < /TouchableOpacity> }
                                </View>
                            )}
                            keyExtractor={item => "Key:" + item}
                        />
                    </View> */}
        </Stack.Navigator>
      </NavigationContainer >
    );
  }
}

const styles = StyleSheet.create({

  container: {
    width: 360,
    height: 640,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#2c3e50'
  },
  info: {
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "white",
    fontSize: 20

  },
  line: {

    height: 50,
    width: 300,
    flexDirection: "row",
    borderTopColor: '#ccc',
    borderTopWidth: "2",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center"


  }


})