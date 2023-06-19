import { csrfFetch } from "./csrf";
//
const LOAD_CURRENT_PHOTOS_BUT_THIS_ALBUM =
 "photos/LOAD_CURRENT_PHOTOS_BUT_THIS_ALBUM";
//
const CLEAR_CURRENT_PHOTOS_BUT_THIS_ALBUM =
 "photos/CLEAR_CURRENT_PHOTOS_BUT_THIS_ALBUM";
//
const LOAD_ALL_CURRENT_PHOTOS = "photos/LOAD_ALL_CURRENT_PHOTOS";
//
const LOAD_ALL_PHOTOS = "photos/LOAD_ALL_PHOTOS";

const CREATE_UPDATE_A_PHOTO = "photos/CREATE_UPDATE_A_PHOTO";

const DELETE_A_PHOTO = "photos/DELETE_A_PHOTO";

export const loadCurrentPhotosButThisAlbum = (photos) => {
 return {
  type: LOAD_CURRENT_PHOTOS_BUT_THIS_ALBUM,
  photos,
 };
};

export const clearCurrentPhotosButThisAlbum = () => {
 return {
  type: CLEAR_CURRENT_PHOTOS_BUT_THIS_ALBUM,
 };
};

export const loadAllCurrentPhotos = (photos) => {
 return {
  type: LOAD_ALL_CURRENT_PHOTOS,
  photos,
 };
};

export const loadAllPhotos = (photos) => {
 return {
  type: LOAD_ALL_PHOTOS,
  photos,
 };
};

export const createUpdateAPhoto = (photo) => {
 return {
  type: CREATE_UPDATE_A_PHOTO,
  photo,
 };
};

export const deleteAPhoto = (id) => {
 return {
  type: DELETE_A_PHOTO,
  id,
 };
};

export const ThunkLoadCurrentPhotosButThisAlbum =
 (albumId) => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${albumId}/photos/current`);
  const photos = await response.json();
  console.log("ThunkLoadCurrentPhotosButThisAlbum photos: ", photos);
  dispatch(loadCurrentPhotosButThisAlbum(photos));
  return response;
 };

export const ThunkLoadAllCurrentPhotos = () => async (dispatch) => {
 const response = await csrfFetch("/api/photos/current");
 const photos = await response.json();
 console.log("ThunkLoadAllCurrentPhotos photos: ", photos);
 dispatch(loadAllCurrentPhotos(photos));
 return response;
};

export const ThunkLoadAllPhotos = () => async (dispatch) => {
 const response = await csrfFetch("/api/photos");
 const photos = await response.json();
 console.log("ThunkLoadAllCurrentPhotos photos: ", photos);
 dispatch(loadAllPhotos(photos));
 return response;
};

export const ThunkCreateAPhoto = (data) => async (dispatch) => {
 const { title, image } = data;
 const formData = new FormData();
 formData.append("title", title);
 formData.append("image", image);
 const res = await csrfFetch("/api/photos/", {
  method: "POST",
  body: formData,
 });

 if (res.ok) {
  const photo = await res.json();
  dispatch(createUpdateAPhoto(photo));
  return;
 } else {
  return res;
 }
};

export const ThunkUpdateAPhoto = (data, photoId) => async (dispatch) => {
 const { title, image } = data;
 const formData = new FormData();
 formData.append("title", title);
 formData.append("image", image);
 const res = await csrfFetch(`/api/photos/${photoId}`, {
  method: "PUT",
  body: formData,
 });

 if (res.ok) {
  const photo = await res.json();
  dispatch(createUpdateAPhoto(photo));
  return;
 } else {
  return res;
 }
};
//thunkDeleteAPhoto
export const thunkDeleteAPhoto = (photoId) => async (dispatch) => {
 const res = await csrfFetch(`/api/photos/${photoId}`, {
  method: "DELETE",
 });
 if (res.ok) dispatch(deleteAPhoto(photoId));
 return res;
};

const initialState = {
 allPhotos: {},
 allcurrent: {},
 allcurrentButThisAlbum: {},
};

const photosReducer = (state = initialState, action) => {
 console.log("before photosReducer action: ", action);
 let newState = {};
 switch (action.type) {
  case LOAD_CURRENT_PHOTOS_BUT_THIS_ALBUM:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
    allcurrentButThisAlbum: {},
   };
   action.photos.forEach((photo) => {
    newState.allcurrentButThisAlbum[photo.id] = photo;
   });
   return newState;
  case CLEAR_CURRENT_PHOTOS_BUT_THIS_ALBUM:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
    allcurrentButThisAlbum: {},
   };
   return newState;
  case LOAD_ALL_CURRENT_PHOTOS:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: {},
    allcurrentButThisAlbum: { ...state.allcurrentButThisAlbum },
   };
   action.photos.forEach((photo) => {
    newState.allcurrent[photo.id] = photo;
   });
   return newState;
  case LOAD_ALL_PHOTOS:
   newState = {
    // ...state,
    allPhotos: {},
    allcurrent: { ...state.allcurrent },
    allcurrentButThisAlbum: { ...state.allcurrentButThisAlbum },
   };
   action.photos.forEach((photo) => {
    newState.allPhotos[photo.id] = photo;
   });
   return newState;

  case CREATE_UPDATE_A_PHOTO:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
    allcurrentButThisAlbum: { ...state.allcurrentButThisAlbum },
   };
   newState.allPhotos[action.photo.id] = action.photo;
   newState.allcurrent[action.photo.id] = action.photo;
   newState.allcurrentButThisAlbum[action.photo.id] = action.photo;
   return newState;

  case DELETE_A_PHOTO:
   newState = {
    // ...state,
    allPhotos: { ...state.allPhotos },
    allcurrent: { ...state.allcurrent },
    allcurrentButThisAlbum: { ...state.allcurrentButThisAlbum },
   };
   delete newState.allPhotos[action.id];
   delete newState.allcurrent[action.id];
   delete newState.allcurrentButThisAlbum[action.id];
   return newState;

  default:
   return state;
 }
};
export default photosReducer;
