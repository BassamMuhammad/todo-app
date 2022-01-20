import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDA608sjlFyrXonpnmW-NsGwb8qcUjOOHs",
  authDomain: "todo-app-89d13.firebaseapp.com",
  projectId: "todo-app-89d13",
  storageBucket: "todo-app-89d13.appspot.com",
  messagingSenderId: "378866792068",
  appId: "1:378866792068:web:a27bd0f2f9091ff457f4d1",
};

export const initializeFirebaseApp = () => {
  if (getApps().length === 0) initializeApp(firebaseConfig);
};
