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

//RATE CONFIG
var starNumber = 0;
var clicked = false;

function rate() {
  let stars = document.querySelectorAll(".star");

  document.querySelector(".initial").style.display = "none";
  document.querySelector(".rating").style.display = "none";
  document.querySelector(".rates").style.display = "none";
  document.querySelector(".after").style.display = "block";
  document.querySelector(".rate").style.marginTop = "10%";

  stars.forEach((star, index) => {
    stars[index].addEventListener("mouseover", () => {
      if (!clicked) {
        for (var i = 0; i <= index; i++) {
          stars[i].style.color = "yellow";
        }
      }
    }
    )
    stars[index].addEventListener("mouseout", () => {
      if (!clicked) {
        for (var i = index; i >= 0; i--) {
          stars[i].style.color = "black";
        }
      }
    }
    )
    stars[index].addEventListener("click", () => {
      starNumber = index + 1;
      clicked = true;
      for (var i = 0; i < 5; i++) {
        stars[i].style.color = "black";
      }
      for (var i = 0; i <= index; i++) {
        stars[i].style.color = "yellow";
      }
    }
    )
  }
  )
}


function removeName() {
  document.querySelector(".typename").style.display = "none";
}

function removeStar() {
  document.querySelector(".selectstar").style.display = "none";
}


function sendRate() {
  let name = document.querySelector(".name").value;
  let comment = document.querySelector(".txtarea").value;

  if (name != "" && starNumber != 0) {
    addDoc(userRates, {
      name: name,
      stars: starNumber,
      comment: comment,
    })
      .then(async (docRef) => {
        console.log("Document added with ID: ", docRef.id);
        location.replace("index.html");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });

  } else {
    if (name == "") {
      document.querySelector(".typename").style.display = "block";
      setTimeout(removeName, 5000);
    }

    if (starNumber == 0) {
      document.querySelector(".selectstar").style.display = "block";
      setTimeout(removeStar, 5000);
    }
  }

}



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
  const itemDiv = document.createElement("div");
  itemDiv.classList.add("item");

  const nameElement = document.createElement("h2");
  nameElement.textContent = data.name;
  itemDiv.appendChild(nameElement);

  const starsElement = document.createElement("div");
  starsElement.classList.add("stars");

  for (var i = 0; i < data.stars; i++) {
    let starElement = document.createElement("div");
    starElement.textContent = "★";
    starElement.classList.add("star");
    starElement.style.color = "yellow";
    starsElement.appendChild(starElement);
  }


  totalStars += data.stars;
  avgStars = Math.round(totalStars / size);



  itemDiv.appendChild(starsElement);
  const commentElement = document.createElement("h3");
  commentElement.textContent = data.comment;
  itemDiv.appendChild(commentElement);
  if (document.querySelector(".initial button") != null) {
    const listaItens = document.querySelector(".item-list");
    listaItens.appendChild(itemDiv);
  }
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

if (document.querySelector(".rate-button") != null) {
  document.querySelector(".rate-button").addEventListener("click", goToRate);
}

if (document.querySelector(".after button") != null) {
  document.querySelector(".after button").addEventListener("click", sendRate);
}

if (document.querySelector(".initial button") != null) {
  document.querySelector(".initial button").addEventListener("click", rate);
}