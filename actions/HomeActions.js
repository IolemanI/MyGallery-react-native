import {PHOTOS_LIST, RESET_PHOTOS_LIST} from '../constants/Types.js';

export function addPhotos(photos){

  return {
    type: PHOTOS_LIST,
    payload: photos
  };
}

export function resetPhotos(){

  return {
    type: RESET_PHOTOS_LIST,
  };
}
