import React, { useEffect, useState } from "react";
import "./Post.css";
import { db } from "./firebase";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";

function Post({ postId,user, username, caption, imageUrl }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp","desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
        
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({
          text:comment,
          username:user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        });
        setComment("")
}
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt="Remy Sharp"
          src="../images/avatar/1.png"
        />
        <h3>{username}</h3>
        {/* header avatara and username */}
      </div>

      <img className="post__image" src={imageUrl} alt="post" />

      {/* image */}
      <h4 className="post__text">
        {" "}
        <strong>{username} </strong> {caption}
      </h4>
      <div className="post_comments">
        {
          comments.map(comment => (
            <p>
              <strong>
                {comment.username} 
              </strong>
              {" "}
              {comment.text}
            </p>
          ))
        }
      </div>
      {
        user && (
<form className="post__commentBox">
        <input
          type="text"
          className="post__input"
          placeholder="Add a comment...."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled = {!comment} className="post__button" type="submit" onClick = {postComment}> Add

        </button>
      </form>
        )
      }
      

      {/* username and captions */}
    </div>
  );
}

export default Post;
