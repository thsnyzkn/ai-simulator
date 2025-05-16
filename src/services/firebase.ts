
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUy-oJGDkS_qjlQdvksar5h2a3voJiOUM",
  authDomain: "hexa-ai-d3ddc.firebaseapp.com",
  projectId: "hexa-ai-d3ddc",
  storageBucket: "hexa-ai-d3ddc.firebasestorage.app",
  messagingSenderId: "210263961421",
  appId: "1:210263961421:web:d5fd741cc7101b5a8d5104",
  measurementId: "G-DVXE8WX1KM"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };