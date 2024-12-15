const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden');

hiddenElements.forEach((el) => observer.observe(el))

// NAVBAR
window.onscroll = () => {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.scrollY > fixedNav) {
    header.classList.add('header-fixed');
  } else {
    header.classList.remove('header-fixed');
  }
}

const navBtn = document.querySelector('#nav-btn');

navBtn.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');
  navBtn.classList.toggle('active');
});

// DASHBOARD
const sentence = document.querySelector('#sentence');

const text = ["Informatics Engineering", "Software Developer", "Web Developer"];
let i = 0;
let j = 0;

setInterval(() => {
  if (j < text[i].length) {
    sentence.innerHTML += text[i].charAt(j);
    j++;
    if (j == text[i].length) {
      setTimeout(() => {
        sentence.innerHTML = '';
        setTimeout(() => {
          j = 0;
          i++;
          if (i == text.length) {
            i = 0;
          }
        }, 1500)
      }, 1500);
    }
  }
}, 200);


// SKILLS
// const logo = document.querySelector('.skills-logo').cloneNode(true);
// document.querySelector('.skills-logo-container').appendChild(logo);
