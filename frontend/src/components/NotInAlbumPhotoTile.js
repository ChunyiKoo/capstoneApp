import React, { useState, useEffect } from "react";

function NotInAlbumPhotoTile({ photo, user, setSelectedPhotos }) {
 const [select, setSelect] = useState(false);

 useEffect(() => {
  if (select) {
   setSelectedPhotos((prev) => {
    prev[photo.id] = photo.id;
    return prev;
   });
  } else {
   setSelectedPhotos((prev) => {
    delete prev[photo.id];
    return prev;
   });
  }
 }, [select]);
 return (
  <div
   className="Photo-box"
   style={{
    position: "relative",
    backgroundImage: `url(${photo?.imageUrl})`,
    width: "120px",
    height: "96px",
    backgroundSize: "cover",
    backgroundPosition: "center",
   }}
  >
   <div
    className="circle-check-icon-box"
    onClick={() => setSelect((prev) => !prev)}
   >
    {select ? (
     <i className="fa-regular fa-circle-check"></i>
    ) : (
     <i className="fa-regular fa-circle"></i>
    )}
   </div>
  </div>
 );
}
export default NotInAlbumPhotoTile;
