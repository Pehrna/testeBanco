import React, { Component, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import Postagens from './Postagens'

//https://reactnavigation.org/

// https://snack.expo.io/?platform=android&name=Moving%20between%20screens%20%7C%20React%20Navigation&dependencies=%40react-native-community%2Fmasked-view%40%5E0.1.7%2C%40react-navigation%2Fbottom-tabs%40%5E5.6.0%2C%40react-navigation%2Fdrawer%40%5E5.8.3%2C%40react-navigation%2Fmaterial-bottom-tabs%40%5E5.2.11%2C%40react-navigation%2Fmaterial-top-tabs%40%5E5.2.11%2C%40react-navigation%2Fnative%40%5E5.6.0%2C%40react-navigation%2Fstack%40%5E5.6.1%2Creact-native-paper%40%5E3.10.1%2Creact-native-reanimated%40%5E1.7.0%2Creact-native-safe-area-context%40%5E0.7.3%2Creact-native-screens%40%5E2.4.0%2Creact-native-tab-view%40%5E2.14.0&sourceUrl=https%3A%2F%2Freactnavigation.org%2Fexamples%2F5.x%2Fgo-back.js


function HomeScreen({ navigation }) {    
    var rowsUser = [];
    //console.log(this.state.data)
    var pf = [];
    const [datas, setDatas] = useState(fetchar(pf));
    var cont = 0;
    for (let i = 0; i < pf; i++) {
        cont = 0;
        for (let j = 0; j < rowsUser.length; j++) {
            if (pf[i].userId === rowsUser[j]) {
                cont = 1;
            }
        }
        if (cont === 0) {
            rowsUser.push(pf[i].userId);
        }
    }

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Home Screen</Text>
        //     <Button
        //         title="Go to Details"
        //         onPress={() => navigation.navigate('Postagens')}
        //     />
        // </View>
        <View style={styles.container} >

            <FlatList
                data={rowsUser}
                renderItem={({ item }) =>

                    <View style={styles.line}>
                        <TouchableOpacity onPress={navigation.navigate('Postagens')} >
                            <Text style={styles.info}>Usuario {item} </Text>
                        </TouchableOpacity>
                    </View>
                }
                keyExtractor={item => "Key:" + item}
            />
        </View>
    );
}

function Postagens2({ navigation }) {
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

function fetchar(lista) {
    if (lista.length === 0) {

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

const Stack = createStackNavigator();

export default class App extends Component {

    constructor(props) {

        super(props)
        this.state = {
            data: []
        }
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


        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="App">
                    <Stack.Screen name="Home" component={HomeScreen} initialParams={this.state.data} />
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