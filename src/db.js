import { getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyD752ggs61ikLS7sSrGk5YiBpuE8lTnzFY",
  authDomain: "musicc-c1a72.firebaseapp.com",
  databaseURL: "https://musicc-c1a72-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "musicc-c1a72",
  storageBucket: "musicc-c1a72.firebasestorage.app",
  messagingSenderId: "281332801749",
  appId: "1:281332801749:web:b8e1452b0057202a61025c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
const authFirebase = getAuth(app);