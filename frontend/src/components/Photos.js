import React, { useEffect } from "react";
import PhotoList from "./PhotoList";
import { useDispatch, useSelector } from "react-redux";
import { ThunkLoadAllCurrentPhotos } from "../store/photos";
import AddEditPhotoFormModal from "./AddEditPhotoFormModal";
import OpenModalButton from "./OpenModalButton";

function Photos() {
 console.log("step 1");
 const dispatch = useDispatch();
 const return_photos = useSelector((state) => state.photos.allPhotos);
 console.log("---------return_photos", return_photos);
 const photos = Object.values(return_photos);
 //const photos = [...return_photos];
 //console.log("---------photos", photos);
 useEffect(() => {
  console.log("step 3");
  dispatch(ThunkLoadAllCurrentPhotos());
 }, [dispatch]);
 console.log("step 4");
 if (!return_photos) return null;
 return (
  <>
   <div className="photo-current-top-cover-img">This is Photo </div>
   <div className="photo-current-mid-nav">
    <div className="photo-current-mid-nav-item ">About</div>
    <div className="photo-current-mid-nav-item ">Photostream</div>
    <div className="photo-current-mid-nav-item ">Alums</div>
    <div className="photo-current-mid-nav-item ">Faves</div>
   </div>
   <div className="photo-current-create-photo-row ">
    <div className="photo-current-new-photo ">
     <OpenModalButton
      btnClassName="OpenModal-btn"
      buttonText="Add a photo"
      modalComponent={<AddEditPhotoFormModal formType={"Add"} photo={null} />}
     />
    </div>
   </div>
   <div className="photo-current-photolist-container">
    {!!photos && <PhotoList photos={photos} />}
   </div>
  </>
 );
}
export default Photos;