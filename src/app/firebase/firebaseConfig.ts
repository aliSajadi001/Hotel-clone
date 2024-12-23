"use client"

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FAIRBASE_API_KEY ,
  authDomain: "hotel-clone-c0aae.firebaseapp.com",
  projectId: "hotel-clone-c0aae",
  storageBucket: "hotel-clone-c0aae.firebasestorage.app",
  messagingSenderId: "241990026881",
  appId: "1:241990026881:web:84ab4b701273fd7cb06f80"
};

export const app = initializeApp(firebaseConfig);