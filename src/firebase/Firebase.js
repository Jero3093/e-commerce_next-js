import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; //Authentication
import { getFirestore } from "firebase/firestore"; //Firestore Database
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyDH-xT3pggeDdabKSAqzyOQqxK-WtWhG00",
  authDomain: "e-commerce-nextjs-e7f31.firebaseapp.com",
  projectId: "e-commerce-nextjs-e7f31",
  storageBucket: "e-commerce-nextjs-e7f31.appspot.com",
  messagingSenderId: "148990088347",
  appId: "1:148990088347:web:ec9793a40e6e6f2191623e",
  measurementId: "G-PF3DTTF4FL",
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
