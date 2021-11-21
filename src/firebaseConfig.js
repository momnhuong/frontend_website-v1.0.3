import firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyDY9cEIn84VNzPrryS-ndg4FX8ykCTUqHk",
  authDomain: "usdc-portal-dev.firebaseapp.com",
  databaseURL: "https://usdc-portal-dev.firebaseio.com",
  projectId: "usdc-portal-dev",
  storageBucket: "usdc-portal-dev.appspot.com",
  messagingSenderId: "849510829272",
  appId: "1:849510829272:web:b93c56c5eef44b7f011bad",
});
const messaging = initializedFirebaseApp.messaging();

export default messaging;
