import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Postagens from './Postagens'


export default class App extends Component {

    constructor(props) {

        super(props)
        this.state = {
            data: []
        }
    }

    async componentDidMount() {

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
        var rowsUser = []

        var cont = 0;
        for (let i = 0; i < this.state.data.length; i++) {

            cont = 0;

            for (let j = 0; j < rowsUser.length; j++) {

                if (this.state.data[i].userId === rowsUser[j]) {
                    cont = 1;
                }
            }
            if (cont === 0) {
                rowsUser.push(this.state.data[i].userId);
            }
        }

        return (

            <View style={styles.container} >

                <FlatList
                    data={rowsUser}
                    renderItem={({ item }) => (

                        <View style={styles.line}>
                            {/* <TouchableOpacity onPress={this.props.navigation.navigate('Postagens')}> */}
                                <Text style={styles.info}>Usuario {item} </Text>
                            {/* </TouchableOpacity> */}
                        </View>
                    )}
                    keyExtractor={item => "Key:" + item}
                />
            </View>
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