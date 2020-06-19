import * as firebase from 'firebase';
import { FIREBASE_CONFIG } from '../config';



const config = FIREBASE_CONFIG

firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;
