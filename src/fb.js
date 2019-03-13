import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyDzmvu0DvEQ8YGOA3CohNtz-tnjfHT9owM',
  authDomain: 'vuetify-base.firebaseapp.com',
  databaseURL: 'https://vuetify-base.firebaseio.com',
  projectId: 'vuetify-base',
  storageBucket: 'vuetify-base.appspot.com',
  messagingSenderId: '457696634453'
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

export default db;
