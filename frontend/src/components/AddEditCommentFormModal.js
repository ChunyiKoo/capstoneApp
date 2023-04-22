import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/Modal";
import {
 ThunkLoadAllCommentByCurrent,
 ThunkUpdateAComment,
 ThunkAddAComment,
} from "../store/comments";

function AddEditCommentFormModal({ formType, comment, photoId }) {
 const dispatch = useDispatch();
 const [comment_, setComment_] = useState("");
 const [errors, setErrors] = useState({});
 const { closeModal } = useModal();

 const return_comments = useSelector(
  (state) => state.comments.commentsByCurrent
 );
 useEffect(() => {
  if (formType === "Edit") {
   dispatch(ThunkLoadAllCommentByCurrent());
  }
 }, [dispatch, formType]);
 let theComment;
 if (formType === "Edit" && comment) theComment = return_comments[comment.id];

 useEffect(() => {
  if (formType === "Edit") {
   setComment_(theComment.comment);
  }
 }, [formType, theComment]);

 const handleSubmit = (e) => {
  e.preventDefault();
  setErrors({});
  if (formType === "Add") {
   return dispatch(
    ThunkAddAComment(
     {
      comment: comment_,
     },
     photoId
    )
   )
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      setErrors(data.errors);
     }
    });
  }
  if (formType === "Edit") {
   return dispatch(
    ThunkUpdateAComment(
     {
      comment: comment_,
     },
     theComment.id
    )
   )
    .then(closeModal)
    .catch(async (res) => {
     const data = await res.json();
     if (data && data.errors) {
      setErrors(data.errors);
     }
    });
  }
 };

 return (
  <>
   {formType === "Add" ? (
    <h1>Add a Comment</h1>
   ) : (
    <h1>Update info about a Comment</h1>
   )}
   <form onSubmit={handleSubmit}>
    <label>
     Comment
     <input
      type="text"
      value={comment_}
      onChange={(e) => setComment_(e.target.value)}
      required
     />
    </label>
    {errors.url && <p>{errors.url}</p>}

    <button type="submit">{formType === "Add" ? "Add" : "Update"}</button>
   </form>
  </>
 );
}

export default AddEditCommentFormModal;
