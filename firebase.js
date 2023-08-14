//import
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import {
  getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, getDoc, updateDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfox6C7DxztYke_IuiVxSHmIvPt8sQPOo",
  authDomain: "authentification-481ca.firebaseapp.com",
  databaseURL: "https://authentification-481ca-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "authentification-481ca",
  storageBucket: "authentification-481ca.appspot.com",
  messagingSenderId: "892397053285",
  appId: "1:892397053285:web:f6036655e910c2f454ed8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//make auth and firestore references
export const auth = getAuth(app);
const database = getFirestore(app);

export const authen = {
  signUp: (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const user = cred.user
      })
      .catch((error) => {
        console.log(error.code)
        console.log(error.message)
      })
  },
  login: (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        // Signed in 
        const user = credential.user;
        console.log(user)
        login.reset()
      })
      .catch((error) => {
        console.log( error.code)
        console.log( error.message)
      });
  },
  logOut: () => {
    signOut(auth).then(() => {
      console.log('logout')
    })
  },
  resetpassword:(email,)=>{sendPasswordResetEmail(auth, email)
  .then(() => {
    const user = auth.currentUser;
const newPassword = getASecureRandomPassword();

updatePassword(user, newPassword).then(() => {
  console.log( "Update successful.")
}).catch((error) => {
  console.log(error)
});
  })
  .catch((error) => {
    console.log(error.code);
    console.log(error.message);
  });
}}

export const crud = {
  addTask: (message) =>
    addDoc(collection(database, "card"), { message }),
  onGetTasks: (callback) =>
    onSnapshot(collection(database, "card"), callback),
  deleteTask: (id) => deleteDoc(doc(database, "card", id)),
  getTask: (id) => getDoc(doc(database, "card", id)),
  updateTask: (id, newFields) =>
    updateDoc(doc(database, "card", id), newFields)
}

