import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4tXjp6yj6W7JD5jC3mRxVYHcmjiZZHGM",
    authDomain: "ab-coin-695f3.firebaseapp.com",
    databaseURL: "https://ab-coin-695f3-default-rtdb.firebaseio.com",
    projectId: "ab-coin-695f3",
    storageBucket: "ab-coin-695f3.firebasestorage.app",
    messagingSenderId: "373438391512",
    appId: "1:373438391512:web:b7f29d02587d48c130a3ad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to get Telegram User Info
function getTelegramUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = {
        id: urlParams.get("id"),
        firstName: urlParams.get("first_name"),
        lastName: urlParams.get("last_name"),
        username: urlParams.get("username"),
        isPremium: urlParams.get("is_premium") === "true",
    };
    return user;
}

// Save User Info to Firebase
function saveUserToFirebase(user) {
    const userRef = ref(db, `users/${user.id}`);
    set(userRef, {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        username: user.username || "No Username",
        isPremium: user.isPremium,
        abCoin: getLocalABCoin() || 0, // Include current AB Coins if any
    });
}

// Get AB Coin from Local Storage
function getLocalABCoin() {
    return parseInt(localStorage.getItem("abCoin")) || 0;
}

// Save AB Coin to Local Storage
function saveABCoinToLocalStorage(amount) {
    localStorage.setItem("abCoin", amount);
}

// Main Function
document.addEventListener("DOMContentLoaded", () => {
    const user = getTelegramUserInfo();

    if (user.id) {
        saveUserToFirebase(user); // Save data to Firebase

        // Display User Info
        console.log(`Name: ${user.firstName} ${user.lastName}`);
        console.log(`Username: ${user.username}`);
        console.log(`Premium User: ${user.isPremium}`);
        console.log(`AB Coin: ${getLocalABCoin()}`);
    } else {
        console.error("Unable to fetch Telegram user information. Make sure this is opened via Telegram.");
    }
});