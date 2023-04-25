import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThunkLoadAllCommentByCurrent } from "../store/comments";
import { ThunkLoadAllPhotos } from "../store/photos";
import AddEditCommentFormModal from "./AddEditCommentFormModal";
import OpenModalButton from "./OpenModalButton";
import DeleteCommentFormModal from "./DeleteCommentFormModal";

function CommentCurrent() {
 const dispatch = useDispatch();
 const return_photos = useSelector((state) => state.photos.allPhotos);
 const return_comments = useSelector(
  (state) => state.comments.commentsByCurrent
 );

 const comments = Object.values(return_comments);

 useEffect(() => {
  dispatch(ThunkLoadAllCommentByCurrent());
 }, [dispatch]);

 useEffect(() => {
  dispatch(ThunkLoadAllPhotos());
 }, [dispatch]);

 if (comments.length !== 0 && return_photos !== null) {
  comments.forEach((comment) => {
   comment.photo = return_photos[comment?.photoId];
  });
 }

 console.log(
  "666666666 return_comments,return_photos,comments: ",
  return_comments,
  return_photos,
  comments
 );

 if (comments.length === 0 || comments[0].photo === null)
  return <div>Loading</div>;
 else
  return (
   <>
    <div className="CommentCurrent-page-title">Manage Your Comments</div>
    <div>
     {comments?.map((comment) => {
      return (
       <div key={comment?.id} className="CommentCurrent-comment-container">
        <div
         style={{
          backgroundImage: `url(${comment?.photo?.url})`,
          width: "250px",
          height: "200px",
          backgroundSize: "cover",
          backgroundPosition: "center",
         }}
        >
         {/* <img src={`${comment.photo.url}`}></img> */}
        </div>
        <div className="CommentCurrent-comment-box">
         <div className="comment-current-title">{comment?.photo?.title}</div>
         <div className="comment-current-item">{comment?.comment}</div>
         <div className="comment-current-item-btn">
          <OpenModalButton
           btnclassname="OpenModal-btn "
           buttonText={
            <i className="fa-solid fa-pen-to-square CommentCurrent-btn"></i>
           }
           modalComponent={
            <AddEditCommentFormModal formType={"Edit"} comment={comment} />
           }
          />
          <OpenModalButton
           btnclassname="OpenModal-btn "
           buttonText={
            <i className="fa-solid fa-trash-can CommentCurrent-btn"></i>
           }
           modalComponent={<DeleteCommentFormModal comment={comment} />}
          />
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </>
  );
}
export default CommentCurrent;
