import { csrfFetch } from "./csrf";
//

//CLEAR current user's albums
const CLEAR_ALL_CURRENT_ALBUMS = "albums/CLEAR_ALL_CURRENT_ALBUMS";

//GET current user's albums
const LOAD_ALL_CURRENT_ALBUMS = "albums/LOAD_ALL_CURRENT_ALBUMS";

//Add a new album
const ADD_A_ALBUM = "albums/ADD_A_ALBUM";

//Delete a album
const DELETE_A_ALBUM = "albums/DELETE_A_ALBUM";

export const clearAllCurrentAlbums = () => {
 return {
  type: CLEAR_ALL_CURRENT_ALBUMS,
 };
};

export const loadAllCurrentAlbums = (albums) => {
 return {
  type: LOAD_ALL_CURRENT_ALBUMS,
  albums,
 };
};

export const addAAlbum = (album) => {
 return {
  type: ADD_A_ALBUM,
  album,
 };
};

export const deleteAAlbum = (albumId) => {
 return {
  type: DELETE_A_ALBUM,
  albumId,
 };
};

export const ThunkLoadAllCurrentAlbums = () => async (dispatch) => {
 console.log("first line in ThunkLoadAllCurrentAlbums");
 const response = await csrfFetch("/api/albums/current");
 console.log(response);
 if (response.ok) {
  const albums = await response.json();
  console.log("***aaa*** albums: ", albums);
  dispatch(loadAllCurrentAlbums(albums));
  return albums;
 }
 //return response;
};

export const ThunkAddAAlbum = (data) => async (dispatch) => {
 const response = await csrfFetch("/api/albums", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });
 if (response.ok) {
  const album = await response.json();
  dispatch(addAAlbum(album));
  return album;
 }
 return response;
};

export const ThunkDeleteAAlbum = (albumId) => async (dispatch) => {
 const response = await csrfFetch(`/api/albums/${albumId}`, {
  method: "DELETE",
 });
 if (response.ok) dispatch(deleteAAlbum(albumId));
 //return response;
};

const initialState = { allCurrent: {} };

const albumReducer = (state = initialState, action) => {
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_CURRENT_ALBUMS:
   newState = {
    allCurrent: {},
   };
   action.albums.forEach((album) => {
    newState.allCurrent[album.id] = album;
   });
   return newState;

  case CLEAR_ALL_CURRENT_ALBUMS:
   newState = {
    allCurrent: {},
   };
   return newState;

  case ADD_A_ALBUM:
   newState = {
    allCurrent: { ...state.allCurrent },
   };
   newState.allCurrent[action.album.id] = action.album;
   return newState;

  case DELETE_A_ALBUM:
   newState = {
    allCurrent: { ...state.allCurrent },
   };
   delete newState.allCurrent[action.albumId];
   return newState;
  default:
   return state;
 }
};

export default albumReducer;
