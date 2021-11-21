import firebase from "firebase/app";
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"); // eslint-disable-line
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-messaging.js"); // eslint-disable-line
const firebaseConfig = {
  apiKey: "AIzaSyDY9cEIn84VNzPrryS-ndg4FX8ykCTUqHk",
  authDomain: "usdc-portal-dev.firebaseapp.com",
  databaseURL: "https://usdc-portal-dev.firebaseio.com",
  projectId: "usdc-portal-dev",
  storageBucket: "usdc-portal-dev.appspot.com",
  messagingSenderId: "849510829272",
  appId: "1:849510829272:web:b93c56c5eef44b7f011bad",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification("my notification title");
    });
  return promiseChain;
});
self.addEventListener("notificationclick", function (event) {
  console.log(event);
});

importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-app.js"); // eslint-disable-line
importScripts("https://www.gstatic.com/firebasejs/6.6.1/firebase-messaging.js"); // eslint-disable-line
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
