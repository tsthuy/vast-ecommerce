import {
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "sonner";

import { customErrorMessage } from "~/utils/custom-error.util";

import { useAuthStore } from "~/stores/auth.store";

import { auth, googleProvider } from "./firebase.lib";

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    toast.error(customErrorMessage(error));
  }
};

export const loginWithGoogle = async () => {
  try {
    googleProvider.setCustomParameters({
      prompt: "select_account",
    });

    const userCredential = await signInWithPopup(auth, googleProvider);
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    toast.error(customErrorMessage(error));
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().clearUser();
  } catch (error) {
    toast.error(customErrorMessage(error));
  }
};

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    console.log("signing up with email", email);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    toast.error(customErrorMessage(error));
  }
};

export const signUpWithPhone = async (phoneNumber: string, name: string) => {
  try {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    const otp = window.prompt("Enter the OTP sent to your phone:");
    if (!otp) throw new Error("OTP is required.");

    const userCredential = await confirmationResult.confirm(otp);

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    toast.error(customErrorMessage(error));
  }
};
