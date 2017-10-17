import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import configureStore from './store/configureStore.js';

import FullScreenCardImage from './screens/FullScreenCardImage.js';
import CardImage from './components/CardImage.js';
import Home from './screens/Home.js';

// const initialState = [];
//
// function imageCardsList(state = initialState, action){ //reduser
//   if (action.type === 'PHOTOS_LIST') {
//     return [
//       ...state,
//       action.payload
//     ];
//   }
//   return state;
// }
//
// const store = createStore(imageCardsList);

const store = configureStore();


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}

const Application = StackNavigator({
  Home: { screen: Home },
  CardImage: { screen: CardImage },
  FullScreenCardImage: { screen: FullScreenCardImage },
});
