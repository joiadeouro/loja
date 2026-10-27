const firebaseConfig = {
  apiKey: "AIzaSyBkHt5Hqzg9FxcQXAzyx7M4OFEtmz1nBeo",
  authDomain: "joiadeouro-15c11.firebaseapp.com",
  projectId: "joiadeouro-15c11",
  storageBucket: "joiadeouro-15c11.firebasestorage.app",
  messagingSenderId: "124336415287",
  appId: "1:124336415287:web:dcc21e4009279e1a79d5b2"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const storage = firebase.storage();