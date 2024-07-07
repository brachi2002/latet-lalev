import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqC_uP2BUVjnDpcOA0M0d5GyzaQtVEf6w",
    authDomain: "project-d56a6.firebaseapp.com",
    projectId: "project-d56a6",
    storageBucket: "project-d56a6.appspot.com",
    messagingSenderId: "759765952973",
    appId: "1:759765952973:web:bd8d170e35a026707b3c84",
    measurementId: "G-W4YNM2BSGH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
