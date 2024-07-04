import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDrpqQJ4-W74TXKjzL3nPt0SBcVadXZo-8",
  authDomain: "examen-1-607b5.firebaseapp.com",
  databaseURL: "https://examen-1-607b5-default-rtdb.firebaseio.com",
  projectId: "examen-1-607b5",
  storageBucket: "examen-1-607b5.appspot.com",
  messagingSenderId: "163649672988",
  appId: "1:163649672988:web:cfd6f30d80c764059a4cd9",
  measurementId: "G-M0ZV0HW15Y"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };