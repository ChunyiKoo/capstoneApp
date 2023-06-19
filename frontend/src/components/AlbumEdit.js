import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { useParams } from "react-router-dom";
import {
 ThunkLoadCurrentPhotosButThisAlbum,
 clearCurrentPhotosButThisAlbum,
} from "../store/photos";
import {
 ThunkLoadAllCurrentAlbums,
 clearAllCurrentAlbums,
} from "../store/albums";
import PhotoList from "./PhotoList";
import AlbumPhotoList from "./AlbumPhotoList";
import {
 ThunkAddMultiAlbumPhotos,
 ThunkDeleteMultiAlbumPhotos,
} from "../store/albumPhotos";

function AlbumEdit({ user, albumId }) {
 const [album_id, setAlbum_id] = useState();
 //const params = useParams();
 const [selectedPhotos, setSelectedPhotos] = useState({});
 const [selectedAlbumPhotos, setSelectedAlbumPhotos] = useState({});
 const dispatch = useDispatch();
 //const { albumId } = params;

 console.log("PhotoDetail albumId: ", albumId);
 //const theAlbumId = parseInt(albumId);

 useEffect(() => {
  setAlbum_id(albumId);
 }, [albumId]);

 //setPhoto_id(thePhotoId);
 const currentAlbums = useSelector((state) => state.albums.allCurrent);
 const album = currentAlbums[album_id];

 console.log("AlbumDetail album, album_id: ", album, album_id);

 useEffect(() => {
  if (album_id) {
   dispatch(ThunkLoadAllCurrentAlbums());
   //return () => dispatch(clearAllCurrentAlbums());
  }
 }, [dispatch, album_id, selectedPhotos, selectedAlbumPhotos]);

 //allcurrentButThisAlbum
 const return_photos = useSelector(
  (state) => state.photos.allcurrentButThisAlbum
 );

 const photos = Object.values(return_photos);
 console.log("AlbumEdit photos: ", photos);

 useEffect(() => {
  if (album_id) {
   dispatch(ThunkLoadCurrentPhotosButThisAlbum(album_id));
   //return () => dispatch(clearCurrentPhotosButThisAlbum());
  }
 }, [dispatch, album_id, selectedPhotos, selectedAlbumPhotos]);

 const AddToAlbum = () => {
  //e.preventDefault();
  const photoIds = { photoIds: Object.values(selectedPhotos) };
  console.log("function AddToAlbum album_id, photoIds: ", album_id, photoIds);
  ThunkAddMultiAlbumPhotos({ album_id, photoIds }).then(() => {
   setSelectedPhotos({});
  });
 };

 const RemoveFromAlbum = () => {
  //e.preventDefault();
  const albumPhotoIds = { albumPhotoIds: Object.values(selectedAlbumPhotos) };
  console.log("function RemoveFromAlbum albumPhotoIds: ", albumPhotoIds);
  ThunkDeleteMultiAlbumPhotos(albumPhotoIds).then(() => {
   setSelectedAlbumPhotos({});
  });
 };

 //  if (photos === undefined) return <div>Loading</div>;
 //  else
 return (
  <div className="albumEdit-outer-container">
   <div className="partition1">
    <div className="photos-notInAlbum-container">
     <PhotoList
      photos={photos}
      type="photo-but-album"
      user={user}
      setSelectedPhotos={setSelectedPhotos}
     />
    </div>
   </div>
   <div className="partition2">
    <div className="albumEdit-btn-container">
     <div
      onClick={(e) => AddToAlbum(e)}
      style={{ fontSize: "18pt", cursor: "pointer" }}
     >
      Add to album <i className="fa-solid fa-arrow-right"></i>
     </div>
     <div
      onClick={(e) => RemoveFromAlbum(e)}
      style={{ fontSize: "18pt", cursor: "pointer" }}
     >
      <i className="fa-solid fa-arrow-left"></i>Remove from album
     </div>
    </div>
   </div>
   <div className="partition3">
    <div className="album-edit-album-name">{"Album: " + album?.name}</div>
    <div className="photos-InAlbum-container">
     <AlbumPhotoList
      album={album}
      user={user}
      setSelectedAlbumPhotos={setSelectedAlbumPhotos}
     />
    </div>
   </div>
  </div>
 );
}
export default AlbumEdit;
