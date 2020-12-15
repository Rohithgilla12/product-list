import firebase from 'firebase/app';
import 'firebase/firestore';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID ?? '', process.env.REACT_APP_ALGOLIA_API_KEY ?? '');

const firebaseConfig = {
	apiKey: "AIzaSyDUPQY-xTwyL3MUDczzfY79D35FGHqcoLQ",
	authDomain: "zipfinder-1c2ac.firebaseapp.com",
	databaseURL: "https://zipfinder-1c2ac.firebaseio.com",
	projectId: "zipfinder-1c2ac",
	storageBucket: "zipfinder-1c2ac.appspot.com",
	messagingSenderId: "978974681036",
	appId: "1:978974681036:web:c605f186fda4b872bd9f69"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({
	cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence()

export const firestoreInstance = firebase.firestore();

export const algoliaIndex = client.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME ?? '');
