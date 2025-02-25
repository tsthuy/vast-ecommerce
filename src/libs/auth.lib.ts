import {
  createUserWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

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
    console.error("Error logging in:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    useAuthStore.getState().clearUser();
    console.log("out");
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const signUpWithEmail = async (
  name: string,
  email: string,
  password: string
) => {
  try {
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
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signUpWithPhone = async (phoneNumber: string, name: string) => {
  console.log(phoneNumber);

  try {
    // Initialize RecaptchaVerifier
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible", // or "normal" for visible reCAPTCHA
      }
    );

    // Send OTP to the user's phone
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );

    // Prompt the user to enter the OTP
    const otp = window.prompt("Enter the OTP sent to your phone:");
    if (!otp) throw new Error("OTP is required.");

    // Verify the OTP
    const userCredential = await confirmationResult.confirm(otp);

    // Update the user's profile with the display name
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // Update the Zustand store with the new user
    useAuthStore.getState().setUser(userCredential.user);
  } catch (error) {
    console.error("Error signing up with phone:", error);
    throw error;
  }
};
