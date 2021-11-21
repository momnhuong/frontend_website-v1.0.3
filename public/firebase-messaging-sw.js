importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);

var firebaseConfig = {
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
  console.log(payload);
  const notification = JSON.parse(payload);
  const notificationOption = {
    // body: notification.body,
    icon: notification.icon,
  };
  return self.registration.showNotification(
    payload.notification.title,
    notificationOption
  );
});
