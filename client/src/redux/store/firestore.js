import firebase from 'firebase';
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCltbbOSCG8qz8Tji-yoEh42ODlhfUj2l0",
    authDomain: "firegram-208c0.firebaseapp.com",
    databaseURL: "https://firegram-208c0.firebaseio.com",
    projectId: "firegram-208c0",
    storageBucket: "firegram-208c0.appspot.com",
    messagingSenderId: "676559446086",
    appId: "1:676559446086:web:54e443f5a7af8b7c67aa47"
  };
  export const app = firebase.initializeApp(firebaseConfig)
  export const storageRef = firebase.storage();