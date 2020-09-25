import React, { useState } from "react";
import { Button, Input, LinearProgress } from "@material-ui/core";
import { db, storage } from "./firebase";
import firebase from "firebase";
import "./Imageupload.css";

function Imageupload({ username }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (err) => {
        console.error(err);
        alert(err.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
            setProgress(0);
            setImage(null);
            setCaption("");
          });
      }
    );
  };
  return (
    <div className="imageupload">
      <LinearProgress
        className="imageupload__progress"
        value={progress}
        max="100"
      ></LinearProgress>
      <Input
        placeholder="Enter a caption..."
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <input type="file" onChange={handleChange} />

      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
}

export default Imageupload;
