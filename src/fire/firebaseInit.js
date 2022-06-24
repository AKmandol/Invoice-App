
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

import "firebase/firestore";

var firebaseConfig = {
  
  apiKey: "AIzaSyAhbVHciyN8q9dib40dTA1APTVePLRiUMM",

  authDomain: "invoice-app-7659d.firebaseapp.com",

  databaseURL: "https://invoice-app-7659d-default-rtdb.firebaseio.com",

  projectId: "invoice-app-7659d",

  storageBucket: "invoice-app-7659d.appspot.com",

  messagingSenderId: "752554239025",

  appId: "1:752554239025:web:2a9fe8e76e7c5b52c3e110"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore (app);


export default db;

