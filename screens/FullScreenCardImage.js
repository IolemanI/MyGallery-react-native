import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableHighlight} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title } from 'native-base';
import { connect } from 'react-redux';


class FullScreenCardImage extends Component {
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

  render() {

    const { params } = this.props.navigation.state;
    const {goBack} = this.props.navigation;
    const id = params.id;
    return (
      <Container >
        <Header  style={styles.header}>
          <Left>
            <Button transparent style={styles.btnBack} onPress={()=>goBack()}>
              <Icon name='ios-arrow-back'/>
            </Button>
          </Left>
          <Body>
            <Title style={styles.title}>{this.props.imgStore[id].user.fullname}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content>
          <View style={styles.headerBlock}>
            <Thumbnail source={{uri:this.props.imgStore[id].user.userpic_url}} style={styles.userIcon}/>
            <View style={styles.headerText}>
              <Text>{this.props.imgStore[id].user.fullname}</Text>
              <Text note>{this.props.imgStore[id].name}</Text>
            </View>
            <Text style={styles.textTime}>11h ago</Text>
          </View>

          <View style={styles.imageView}>
            <Image source={{uri:this.props.imgStore[id].image_url}} style={styles.image}/>
          </View>

          <View style={styles.btnBox}>
            <Button transparent style={styles.btnRating}
            onPress={this.testPress}>
              <Icon active name="thumbs-up" style={styles.btnIcon}/>
              <Text style={styles.btnText}>Rating {this.props.imgStore[id].rating}</Text>
            </Button>

            <Button transparent style={styles.btnComments}>
              <Icon active name="chatbubbles" style={styles.btnIcon}/>
              <Text style={styles.btnText}>{this.props.imgStore[id].comments_count} Comments</Text>
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


export default connect(
  state =>({
    imgStore: state.photoReducer,
  })
)(FullScreenCardImage);
