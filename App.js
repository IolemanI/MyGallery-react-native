import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { StackNavigator } from 'react-navigation';

import FullScreenCardImage from './components/FullScreenCardImage.js';
import CardImage from './components/CardImage.js';
import Home from './components/Home.js';

export default class App extends React.Component {

  render() {
    return <Application />;
  }
}

const Application = StackNavigator({
  Home: { screen: Home },
  CardImage: { screen: CardImage },
  FullScreenCardImage: { screen: FullScreenCardImage },
});

const styles = StyleSheet.create({

});
