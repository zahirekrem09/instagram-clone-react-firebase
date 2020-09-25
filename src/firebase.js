import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCMk932VmSB3aeGEfE_iKXes740qt8KfSc",
  authDomain: "instagram-clone-react-ae5e9.firebaseapp.com",
  databaseURL: "https://instagram-clone-react-ae5e9.firebaseio.com",
  projectId: "instagram-clone-react-ae5e9",
  storageBucket: "instagram-clone-react-ae5e9.appspot.com",
  messagingSenderId: "548560131706",
  appId: "1:548560131706:web:e97686faddf9b835270dc3",
  measurementId: "G-JDZDQX4CW6",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


