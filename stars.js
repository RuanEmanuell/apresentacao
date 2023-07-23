//FIREBASE CONFIG
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCK1W7xWyXc4XIL4doqCRGZRQf0lRkyUKQ",
    authDomain: "apresentacao-411b6.firebaseapp.com",
    projectId: "apresentacao-411b6",
    storageBucket: "apresentacao-411b6.appspot.com",
    messagingSenderId: "858644017236",
    appId: "1:858644017236:web:ca1156167079bd633c7dc1"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const userRates = collection(db, "stars");

//FIREBASE FUNCTIONS
let size = 0;

async function getUsersRates() {
    const userRates = collection(db, "stars");

    try {
        const querySnapshot = await getDocs(userRates);

        size = querySnapshot.size;
        querySnapshot.forEach((doc) => {
            createHTMLElement(doc.data());
        });
    } catch (error) {
        console.log("Erro ao recuperar os dados da coleção 'stars':", error);
    }

    if (size != 0) {
        createStars();
    }
}


var totalStars = 0;
var avgStars = 0;

function createHTMLElement(data) {
    totalStars += data.stars;
    avgStars = Math.round(totalStars / size);
}

function createStars() {
    const starDiv = document.createElement("div");
    const mediumStars = document.querySelector(".medium-stars");
    for (var i = 0; i < avgStars; i++) {
        let starElement = document.createElement("div");
        starElement.textContent = "★";
        starElement.classList.add("star");
        starElement.style.color = "yellow";
        mediumStars.appendChild(starElement);
    }
}


getUsersRates();

function goToRate() {
    location.replace("rate.html");
}

document.querySelector(".rate-button").addEventListener("click", goToRate);

