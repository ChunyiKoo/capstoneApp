import React, { useEffect } from "react";
import AlbumList from "./AlbumList";
import { useDispatch, useSelector } from "react-redux";
import {
 ThunkLoadAllCurrentAlbums,
 clearAllCurrentAlbums,
} from "../store/albums";
import AddAlbumFormModal from "./AddAlbumFormModal";
import OpenModalButton from "./OpenModalButton";
import MidNav from "./MidNav";
import BottomBanner from "./BottomBanner";
import { Redirect } from "react-router-dom";

function Albums({ user }) {
 console.log({ user });
 if (user === null) <Redirect to="/" />;
 console.log("first line of Photos user", user);
 const dispatch = useDispatch();
 const return_albums = useSelector((state) => state.albums.allCurrent);
 console.log("---------return_albums", return_albums);
 let albums;
 if (return_albums) {
  albums = Object.values(return_albums);
 }
 console.log("---------user", user);
 useEffect(() => {
  console.log("step 3");
  if (user) {
   dispatch(ThunkLoadAllCurrentAlbums());
   //return () => dispatch(clearAllCurrentAlbums());
  }
 }, [dispatch, user]);
 console.log("step 4");
 if (!albums) return null;
 return (
  <>
   <div className="photo-current-top-cover-img">
    <span className="photo-logo-box">
     <img
      className="photo-logo"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLNqpbvkqoDHq1fwkBZBA8dByg5H8O0dMnow&usqp=CAU"
      alt="logo of the app"
     />
    </span>
    <div className="photo-current-user">
     <div className="photo-current-user-name">{`${user?.firstname} ${user?.lastname}`}</div>
     <div>{user?.email}</div>
    </div>
    <div className="photo-current-photolength">
     {`${albums?.length} albums`} &#160; &#160;{" "}
     {`joined ${user?.createdAt.slice(0, 4)} `}
    </div>
   </div>
   <MidNav compo={"Albums"} />
   <div className="photo-current-create-photo-row ">
    <div className="page-title">
     <h3>Albums</h3>
    </div>
    <div className="photo-current-new-photo ">
     <OpenModalButton
      btnclassname="OpenModal-btn"
      buttonText={<i className="fa-solid fa-square-plus"></i>}
      modalComponent={<AddAlbumFormModal />}
     />
    </div>
   </div>
   <div className="photo-current-photolist-container">
    {albums?.length !== 0 && <AlbumList albums={albums} user={user} />}
    {albums.length === 0 && (
     <div className="photos-add-more-photo">Please add Albums!</div>
    )}
   </div>
   <BottomBanner />
  </>
 );
}
export default Albums;
