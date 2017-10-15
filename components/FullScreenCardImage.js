import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';

/* eslint-disable */
export default class CardImage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      isReady: false,
      photos:this.props.navigation.state.photosList,
    };
  }
  static navigationOptions = {
    header: null,
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ isReady: true });
  }
  _getImageUrl=()=>{
    console.log(params.photosList[params.id].image_url);
    return params.photosList[params.id].image_url;
  }
  testPress=()=>{
    console.log(params.id);

  }


  render() {
    // if (!this.state.isReady) {
    //   return <Expo.AppLoading/>;
    // }
    const { params } = this.props.navigation.state;
    const {goBack} = this.props.navigation;
    return (
      <Container >
        <Header  style={styles.header}>
          <Left>
            <Button transparent style={styles.btnBack} onPress={()=>goBack()}>
              <Icon name='ios-arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{params.author}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <View style={styles.headerBlock}>
            <Thumbnail source={{uri:params.authorIcon}} style={styles.userIcon}/>
            <View style={styles.headerText}>
              <Text>{params.author}</Text>
              <Text note>{params.imgName}</Text>
            </View>
            <Text style={styles.textTime}>11h ago</Text>
          </View>

          <View style={styles.imageView}>
            <Image source={{uri:params.url}} style={styles.image}/>
          </View>

          <View style={styles.btnBox}>
            <Button transparent style={styles.btnRating}
            onPress={this.testPress}>
              <Icon active name="thumbs-up" style={styles.btnIcon}/>
              <Text style={styles.btnText}>Rating {params.rating}</Text>
            </Button>

            <Button transparent style={styles.btnComments}>
              <Icon active name="chatbubbles" style={styles.btnIcon}/>
              <Text style={styles.btnText}>{params.comments} Comments</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
  title:{
    width:200,
  },
  btnBack:{
    width:30,
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
  header:{
    backgroundColor:'#546e7a',
  },

});
