import {PHOTOS_LIST, RESET_PHOTOS_LIST} from '../constants/Types.js';

const initialState = [];

export default function imageCardsStore(state = initialState, action){ //reduser

  switch (action.type) {
    case PHOTOS_LIST:
      return [
        ...state,
        action.payload
      ];
      break;
    case RESET_PHOTOS_LIST:
      return initialState;
      break;
    default:
      return state;

  }
}
