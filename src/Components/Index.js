//import React, {Component} from 'react';
import { createStackNavigator} from 'react-navigation';
import {createAppContainer} from '@react-navigation/native'

import App from './App';
import Postagens from './Postagens';

const MainNav = createStackNavigator(
    {
        Inicial:{
            screen: App,
            navigationOptions: {
                header: null
            }
        },
        Postagens:{
            screen: Postagens,
            navigationOptions:{
                headerTitle: 'Nulo'
            }
        }
    }
)

export default createAppContainer(MainNav);

