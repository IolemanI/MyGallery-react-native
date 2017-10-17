import React, { Component, PropTypes, } from 'react';
import { StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

/* eslint-disable */

export default class CardImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }

  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading/>;
    }

    return (
        <Content style={styles.container}>

          <View style={styles.headerBlock}>
            <Thumbnail source={{uri:this.props.authorIcon}} style={styles.userIcon}/>
            <View style={styles.headerText}>
              <Text>{this.props.author}</Text>
              <Text note>{this.props.name}</Text>
            </View>
            <Text style={styles.textTime}>11h ago</Text>
          </View>

          <View style={styles.imageView}>
            <Image source={{uri:this.props.url}} style={styles.image}/>
          </View>

          <View style={styles.btnBox}>
            <Button transparent style={styles.btnRating}
            onPress={this.testPress}>
              <Icon active name="thumbs-up" style={styles.btnIcon}/>
              <Text style={styles.btnText}>Rating {this.props.rating}</Text>
            </Button>

            <Button transparent style={styles.btnComments}>
              <Icon active name="chatbubbles" style={styles.btnIcon}/>
              <Text style={styles.btnText}>{this.props.comments} Comments</Text>
            </Button>
          </View>

        </Content>
    );
  }
}

  const styles = StyleSheet.create({
    container: {
      margin:8,
      backgroundColor:'white',
      shadowOffset:{  width: 20,  height: 20,  },
      shadowColor: 'black',
      shadowOpacity: 1.0,
      elevation: 2,
    },
    image:{
      width:350,
      height:350,
    },
    imageView:{
      alignItems:'center',
    },
    btnBox:{
      flexDirection:'row',
      justifyContent:'space-between'
    },
    btnRating:{
      paddingLeft:5,
    },
    btnComments:{
      paddingRight:5,
    },
    btnText: {
      fontSize:12,
      color:'#2980b9',
    },
    btnIcon: {
      color:'#2980b9',
    },
    headerBlock: {
      flexDirection:'row',
      justifyContent:'space-between',
      padding:10,
      alignItems:'center',
    },
    userIcon: {
      marginLeft:6,
    },
    headerText: {
      width:200,
    },
    textTime: {
      fontSize:9,
      marginRight:6,
    },

  });


  CardImage.propTypes = {
    author: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    authorIcon: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired
  };
