import React from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imageUrl }) {
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

      {/* username and captions */}
    </div>
  );
}

export default Post;
