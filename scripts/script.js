// Navbar
const navbarContainer = document.querySelector('.navbar .container');
const navbarItems = document.querySelector('.navbar .container .items');
const navBtn = document.querySelector('#nav-btn');
const nav = document.querySelector('nav');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const header = document.querySelector('header');
const fixedNav = header.offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY > fixedNav) {
    navbarContainer.classList.add('border');
  } else {
    navbarContainer.classList.remove('border');
  }
});

navBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
});

// Scroll Section
const SECTIONS = {
  dashboard: document.querySelector('#dashboard'),
  about: document.querySelector('#about'),
  experience: document.querySelector('#experience'),
  skills: document.querySelector('#skills'),
  projects: document.querySelector('#projects'),
};

const OFFSET = 80;
let currentPosition = 'dashboard';

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Update current position
  Object.entries(SECTIONS).forEach(([name, element]) => {
    if (scrollY >= element.offsetTop - OFFSET) {
      currentPosition = name;
    }
  });

  // Update active link
  document.querySelectorAll('.navbar nav ul li a').forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentPosition}`;
    link.classList.toggle('active', isActive);
  });
});

// DASHBOARD
// const sentence = document.querySelector('#sentence');

// const text = ["Informatics Engineering", "Software Developer", "Web Developer"];
// let i = 0;
// let j = 0;

// setInterval(() => {
//   if (j < text[i].length) {
//     sentence.innerHTML += text[i].charAt(j);
//     j++;
//     if (j == text[i].length) {
//       setTimeout(() => {
//         sentence.innerHTML = '';
//         setTimeout(() => {
//           j = 0;
//           i++;
//           if (i == text.length) {
//             i = 0;
//           }
//         }, 1500)
//       }, 1500);
//     }
//   }
// }, 200);


// SKILLS
// const logo = document.querySelector('.skills-logo').cloneNode(true);
// document.querySelector('.skills-logo-container').appendChild(logo);
