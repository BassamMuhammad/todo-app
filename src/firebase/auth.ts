import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { changeUser } from "../redux/features/userSlice";
import { initializeFirebaseApp } from "./config";

initializeFirebaseApp();
const auth = getAuth();

export const signup = async (email: string, password: string) => {
  const credentials = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return credentials.user.uid;
};

export const onFirebaseAuthChange = (dispatch: (param: any) => void) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    dispatch(changeUser(user ? user.uid : null));
  });
};
