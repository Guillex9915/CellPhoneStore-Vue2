// Conveniently import this file anywhere to use db

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPRHKzgwmPFzNouDEKvEwqL0D2BaowO_A",
  authDomain: "vue-proyecto-58359.firebaseapp.com",
  projectId: "vue-proyecto-58359",
  storageBucket: "vue-proyecto-58359.appspot.com",
  messagingSenderId: "744157139869",
  appId: "1:744157139869:web:116da5d3569b7164191574",
};
var app = firebase.initializeApp(firebaseConfig)

export const db = app.firestore()
export const st = app.storage()
