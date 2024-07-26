

const loader = document.querySelector('.loader')
const card = document.querySelector('.card')
const username = document.querySelector('.username')

const profileImage = document.querySelector('.profile-image')
const linkName = document.querySelector('.link-name')
const linkUrl = document.getElementById('linkUrl')
const linkCard = document.querySelector('.inner-card')


function applyData(data){
    username.innerText = data.username
  
    profileImage.src = data.profileImage
    console.log(data.socialLinks)
    data.socialLinks.map(link=>{
        linkCard.innerHTML = linkCard.innerHTML + 
        `<a id="linkUrl" class="link-div" href="${link.linkUrl}">
            <img src="icons/${link.linkName}.png" alt="" class="icon">
            <h2 class="link-name">${link?.linkName}</h2>
        </a>`
    })    
}




function fetchData (){
    loader.style.display = 'block'
    fetch('https://api.npoint.io/2a7f0442599f0a78a72a')
            .then(data=>data.json())
            .then(data=>{
                loader.style.display = 'none'
                card.style.display = 'block'
                applyData(data)
            })
}

fetchData()



// element toggle function

// sentence for random
const sentences = [
  "Web Developer.",
  "Video Editor.",
  "Professional Programmer.",
  "Computer Engineer"
];

// typewriter intro
const typewriterElement = document.getElementById('typewriter');

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile

// Function to shuffle the array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}
// Shuffle the sentences array
shuffle(sentences);

let partIndex = 0;
let sentenceIndex = 0;
let currentSentence = '';
let isDeleting = false;
const typeSpeed = 150;
const deleteSpeed = 75;
const delayBetweenSentences = 2000;

// add automatic changer
function type() {
  const fullSentence = sentences[sentenceIndex];
  if (isDeleting) {
      currentSentence = fullSentence.substring(0, currentSentence.length - 1);
  } else {
      currentSentence = fullSentence.substring(0, currentSentence.length + 1);
  }
  
  typewriterElement.textContent = currentSentence;

  let speed = isDeleting ? deleteSpeed : typeSpeed;

  if (!isDeleting && currentSentence === fullSentence) {
      speed = delayBetweenSentences;
      isDeleting = true;
  } else if (isDeleting && currentSentence === '') {
      isDeleting = false;
      sentenceIndex = (sentenceIndex + 1) % sentences.length;
      if (sentenceIndex === 0) shuffle(sentences); // Shuffle again after one loop
      speed = typeSpeed;
  }

  setTimeout(type, speed);
}

type();
