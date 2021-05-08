import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore';



/**const firebaseConfig = {
    apiKey: "AIzaSyAQuZhqp2-qj4a8HFcGlyKxHRsSrS5hMCQ",
    authDomain: "instagramclone-reactnative.firebaseapp.com",
    projectId: "instagramclone-reactnative",
    storageBucket: "instagramclone-reactnative.appspot.com",
    messagingSenderId: "864958465280",
    appId: "1:864958465280:web:385f4251553c4e37491fe5"
  }; **/ 

  const firebaseConfig = {
    apiKey: "AIzaSyDJ-7ZD7ZSHAOvMrm1WvKW3GhfCLHqGirA",
    authDomain: "backend-endpointapi.firebaseapp.com",
    projectId: "backend-endpointapi",
    storageBucket: "backend-endpointapi.appspot.com",
    messagingSenderId: "451541370130",
    appId: "1:451541370130:web:76867b65adf1d8c86a1fcb"
  };
  
  let app;
  if (firebase.apps.length===0){
    app = firebase.initializeApp(firebaseConfig)
  }else{
    app = firebase.app()
  }

  const db=app.firestore();
  const auth = firebase.auth();

  export {db,auth}
