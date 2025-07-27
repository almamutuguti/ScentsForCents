// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLTJOLN8t1x4rh289lIYu2zcVeB3cqpD4",
    authDomain: "auth-c9942.firebaseapp.com",
    projectId: "auth-c9942",
    storageBucket: "auth-c9942.firebasestorage.app",
    messagingSenderId: "429528280035",
    appId: "1:429528280035:web:8ba5dab0220a3f89deced6",
    measurementId: "G-50MFXE4D5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const signupForm = document.getElementById('signup-form');
const statusMessage = document.getElementById('statusMessage');
const signupButton = document.getElementById('signup-button');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    // Disable button and show loading state
    signupButton.disabled = true;
    signupButton.textContent = 'Signing Up...';
    statusMessage.textContent = '';
    statusMessage.className = 'text-sm';

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // Now update the profile with the username
            return updateProfile(user, {
                displayName: username
            });
        })
        .then(() => {
            // Profile updated successfully, now redirect
            window.location.href = 'index.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            let errorMessage = error.message;

            // Provide more user-friendly error messages
            if (errorCode === 'auth/email-already-in-use') {
                errorMessage = 'This email address is already in use by another account.';
            } else if (errorCode === 'auth/weak-password') {
                errorMessage = 'The password is too weak. Please use at least 6 characters.';
            } else if (errorCode === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            }

            statusMessage.textContent = errorMessage;
            statusMessage.className = 'text-sm text-red-600 dark:text-red-400';
        })
        .finally(() => {
            // Re-enable the button
            signupButton.disabled = false;
            signupButton.textContent = 'Sign Up';
        });
});