import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCvAH0AJ91IK0_-61xetNsQUOyjI5fCqwU",
    authDomain: "class-demo-luke.firebaseapp.com",
    databaseURL: "https://class-demo-luke.firebaseio.com",
    projectId: "class-demo-luke",
    storageBucket: "class-demo-luke.appspot.com",
    messagingSenderId: "721659111351",
    appId: "1:721659111351:web:87a471a9aef0fb8fa7ea32"
};

const fire=firebase.initializeApp(firebaseConfig);


export default fire;