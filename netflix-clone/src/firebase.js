import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC8fIpLFI_ufaJaLIZ41c1bBhed568gzU",
  authDomain: "netflix-clone-45f75.firebaseapp.com",
  projectId: "netflix-clone-45f75",
  storageBucket: "netflix-clone-45f75.firebasestorage.app",
  messagingSenderId: "639697207355",
  appId: "1:639697207355:web:e946a113f152f40ab61c1e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
