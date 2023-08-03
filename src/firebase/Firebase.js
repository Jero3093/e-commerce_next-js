import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //Authentication
import { getFirestore } from "firebase/firestore"; //Firestore Database
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Firebase Authentication
export const auth = getAuth(app);

//Firestore Database
export const database = getFirestore(app);

//Firebase Storage
export const storage = getStorage(app);

//Upload Profile Image to Firebase Storage
export const UploadProfileImage = async (ProfileImg, CurrentUser) => {
  //Current User Logged Id
  const CurrentUserUID = CurrentUser.userId;

  //Reference to the Firebase User Image Storage and a unique id generated
  const UserImgStorage = ref(storage, `userImg/${CurrentUserUID}`);

  //Upload the selected image to the Storage with the same Id as the Current User
  if (ProfileImg) {
    try {
      await uploadBytes(UserImgStorage, ProfileImg).then((img) => {
        console.log("Your image has been uploaded", img);
      });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    console.log("Image has not been selected");
  }
};
