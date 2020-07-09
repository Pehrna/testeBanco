import * as React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function HomeScreen({ navigation, route }) {

  console.log(route)

  var projetoHomeScreen = [];
  const [dataHome, setData] = React.useState([]);
  if (dataHome.length === 0) {
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
    projetoHomeScreen = dataHome
    for (let i = 0; i < projetoHomeScreen.length; i++) {
      cont = 0;
      for (let j = 0; j < rowsUser.length; j++) {
        if (projetoHomeScreen[i].userId === rowsUser[j].numero) {
          cont = 1;
        }
      }
      if (cont === 0) {
        aux = { numero: projetoHomeScreen[i].userId, userId: "Key:" + projetoHomeScreen[i].userId, }
        rowsUser.push(aux);
      }
    }
  })

  return (

    <View style={styles.containerHome} >

      <FlatList
        data={rowsUser}
        renderItem={({ item }) =>

          <View style={styles.lineHome}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Postagens', {parametro: item.userId, state: projetoHomeScreen})
            }} >
              <Text style={styles.infoHome}>Usuario {item.numero} </Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => item.userId}
      />

    </View>
  );
}

function Postagens({ navigation, route }) {
  
  const {parametro} = route.params;
  const {state} = route.params;

  const [dataPostagem, setDataPostagem] = React.useState(state);

  var rowsUser = [];

    for (let i = 0; i < dataPostagem.length; i++) {          
      if (JSON.stringify(dataPostagem[i].userId) === parametro.slice(4)) {
        rowsUser.push(dataPostagem[i]);
      }
    }

  return (
    <View style={styles.containerPostagem} >

      <FlatList
        data={rowsUser}
        renderItem={({ item }) =>

          <View style={styles.linePostagens}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Editar Postagens', {item})
            }} >
              {/* Aqui há troca do  (barra N) 
              <Text style={styles.infoPostagem}>{item.body.replace('\n', '/n')}</Text>*/}
              <Text style={styles.infoPostagemTitulo}>{item.title}</Text>
              <Text style={styles.infoPostagem}>{item.body}</Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => 'key:'+item.id}
      />

    </View>
  );
}

function CreatePostagens({ navigation,route }) {
}

function EditPostagens({ navigation,route }) {

  const {parametro} = route.params;
  const {state} = route.params;

  const [dataCreatePostagem, setDataCreatePostagem] = React.useState(state);

  var rowsUser = [];

  return (
    <View style={styles.containerPostagem} >

      <FlatList
        data={rowsUser}
        renderItem={({ item }) =>

          <View style={styles.linePostagens}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('Editar Postagens', item)
            }} >
              {/* Aqui há troca do  (barra N) 
              <Text style={styles.infoPostagem}>{item.body.replace('\n', '/n')}</Text>*/}
              <Text style={styles.infoPostagemTitulo}>{item.title}</Text>
              <Text style={styles.infoPostagem}>{item.body}</Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => "key:" + item.id}
      />

    </View>
  ); 
}

const Stack = createStackNavigator();

export default class App extends React.Component {

  constructor(props) {

    super(props)
    this.state = { data: [] }
  }

  render() {

    //console.log(this.state.data);
    return (
      <NavigationContainer InitiaState={this.state.data}>
        <Stack.Navigator initialRouteName="Home" >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Postagens" component={Postagens} />
          <Stack.Screen name="Editar Postagens" component={EditPostagens} />
          <Stack.Screen name="Criar Postagens" component={CreatePostagens} />
        </Stack.Navigator>
      </NavigationContainer >
    );
  }
}

const styles = StyleSheet.create({

  containerHome: {
    width: 360,
    height: 640,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#2c3e50'
  },
  containerPostagem: {
    width: 360,
    height: 640,
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#2c3e50'

  },
  infoHome: {
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "white",
    fontSize: 20

  },
  infoPostagem: {
    //height: 'auto',
    flexDirection: "column",
    justifyContent: "justify",
    color: "white",
    fontSize: 13,
    marginLeft: 10

  },
  infoPostagemTitulo: {
    //height: 'auto',
    flexDirection: "column",
    justifyContent: "justify",
    color: "white",
    fontSize: 15,
    fontWeight: 'bold'

  },
  lineHome: {
    height: 40,
    width: 300,
    flexDirection: "row",
    borderTopColor: '#ccc',
    borderTopWidth: "2",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  linePostagens: {
    width: 340,
    height: 'auto',
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign:'justify'
  }

})