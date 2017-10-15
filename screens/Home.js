import React, { Component } from 'react';
import { StyleSheet, NativeModules, Image, Text, View, StatusBar, ToastAndroid, TouchableOpacity} from 'react-native';
import CardImage from './CardImage.js';
import {Footer, FooterTab, Container, Header, Content, List, ListItem, Left, Right, Button, Icon, Body, Title, Spinner, Toast} from 'native-base';
import {Router, Scene, Actions} from 'react-native-router-flux';
/* eslint-disable */

const { StatusBarManager } = NativeModules;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: true,
      receivedData: false,
      imageCards: [],
      pageToDownload: 1,
      currentPage: 1,
      showToast: false,
      photos: [],
      isReady:false,
    };
  }

  renderImageCards=(i, data)=>{
    return (<TouchableOpacity activeOpacity={1.0} key={i} onPress={(event)=>this.onImagePress(data, i)}>
      <CardImage id={i} url={data.photos[i].image_url}
      authorIcon={data.photos[i].user.userpic_url}
      author={data.photos[i].user.fullname}
      name={data.photos[i].name}
      rating={data.photos[i].rating}
      comments={data.photos[i].comments_count}/>
    </TouchableOpacity>);
  }

  onImagePress=(data, i)=>{
    console.log('image key is: '+i);

    Actions.fs_card_image({
      url:data.photos[i].image_url,
      authorIcon:data.photos[i].user.userpic_url,
      author:data.photos[i].user.fullname,
      imgName:data.photos[i].name,
      rating:data.photos[i].rating,
      comments:data.photos[i].comments_count,
    });
  }

  checkPage=(page)=>{
    this.setState({
      receivedData:false,
      pageToDownload:page
    });
    return page;
  }
  onPressPreviousPage=()=>{
    var prevPage = this.state.pageToDownload-1;
    console.log('to download'+prevPage);
    if (prevPage<1) {
      return;
    }
    this.loadData(this.checkPage(prevPage));

  }
  onPressNextPage=()=>{
    var nextPage = this.state.pageToDownload+1;
    console.log('to download'+nextPage);
    this.loadData(this.checkPage(nextPage));
  }

  loadData=(page)=>{
    console.log('начинается загрузка: '+page);
    var url = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF&page='+page;
    fetch(url)
    .then((response) => {
      if(!response.ok) alarm('Download error!');
      return response;
    }).then((response) => response.json())
    .then((data) => {
        // var data = JSON.stringify(responseData);
        var imageCards = new Array();
        var photos = new Array();
        photos.push(data.photos);

        for (var i = 0; i < data.photos.length; i++) {
          imageCards.push(
            this.renderImageCards(i, data)
          );
        }
        this.setState({
          imageCards: imageCards,
          receivedData:data,
          currentPage:data.current_page,
          photos:photos,
        });

        // console.log(this.state.photos);

        console.log('загружено: '+data.current_page);
        this.shouldComponentUpdate(this.state);
    })
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
    });

    this.setState({ isReady: true });
  }
  componentDidMount = () => {
    StatusBar.setHidden(true);
    console.log('componentDidMount');
    this.loadData(this.state.currentPage);
  }

  shouldComponentUpdate(state){
    // console.log(state.receivedData);
    if (!state.receivedData) {
      return true;
    }

    return false;
  }



  render = () => {
    let display;
    if (!this.state.isReady) return <Expo.AppLoading />;

    if (!this.state.receivedData) display = (<Spinner color='blue'  style={styles.spinner} />);
    else {
      // ToastAndroid.show('Page: '+this.state.receivedData.current_page, ToastAndroid.SHORT)
      display = this.state.imageCards;
    }

    let page = 'page '+this.state.currentPage;

    return (
      <Container >
        <Header  style={styles.header}>
          <Left>
            <Button transparent>
              <Icon name='menu'/>
            </Button>
          </Left>
          <Body>
            <Title>MyGallery</Title>
          </Body>
          <Right>
            <Text style={styles.headerText}>{page}</Text>
          </Right>
        </Header>
        <Content>
          {display}
        </Content>
        <Footer>
          <FooterTab style={styles.footerBtns}>
            <Button onPress={this.onPressPreviousPage} >
              <Text style={styles.footerText}>Previous page</Text>
            </Button>
            <Button onPress={this.onPressNextPage} >
              <Text style={styles.footerText}>Next page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
    // <TouchableHighlight onPress={this._onPressImage}>
    //    <Image source={{uri:'https://drscdn.500px.org/photo/231328407/q%3D50_w%3D140_h%3D140/v2?client_application_id=27071&webp=true&v=0&sig=956ada6374f32b672ee42f988942caa23f2abcdfa5fe38a9b237393ace47d865'}} style={{height: 300, width: null, flex: 1}}/>
    // </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loadingText:{
    width:100,
    height:100,
    alignItems:'center',
    flexGrow:1,
    justifyContent:'center',
  },
  footerText:{
    color:'#fff',
    fontSize:16,
  },
  headerText:{
    color:'#fff',
  },
  header:{
    backgroundColor:'#7f8c8d',
  },
  footerBtns:{
    backgroundColor:'#7f8c8d'
  },
  content:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  spinner:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  statusBar:{
    backgroundColor:"#7f8c8d",
  }
});
