import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import styles from '../Styles/index'

export default class Welcome extends Component {

    state = {
        slogan: 'Seu canal nerd!'
    }

    alternar = () => {


        this.setState({
            slogan: this.state.slogan ? '' : 'Seu canal nerd!'
        });
    }



    render() {
        return (
            <View style={styles.visu}>
                <TouchableOpacity style={styles.botao} onPress={this.alternar}>
                    <Text>Mudar</Text>
                </TouchableOpacity>
                <Text style={styles.titulo} >
                    {this.props.cabecalho}
                </Text>
                <Text>
                    {this.state.slogan}
                </Text>

                <Text style={styles.conteudo} >
                    {this.props.textao}
                </Text>

            </View>
        );
    }
}
