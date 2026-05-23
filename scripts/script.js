// Navbar

const navbarContainer = document.querySelector('.navbar-container');
const navbarItems = document.querySelector('.navbar-items');
const navBtn = document.querySelector('#nav-btn');
const nav = document.querySelector('nav');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const header = document.querySelector('header');
const fixedNav = header.offsetTop;

window.addEventListener('scroll', () => {
  if (window.scrollY > fixedNav) {
    navbarContainer.classList.add('border');
    navbarItems.classList.add('border');
  } else {
    navbarContainer.classList.remove('border');
    navbarItems.classList.remove('border');
  }
});

navBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburgerMenu.classList.toggle('active');
  navbarItems.classList.toggle('bordernav');
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

// Dashboard

const sentence = document.querySelector('#sentence');
const inputCursor = document.querySelector('.input-cursor');

const text = ["Software Developer", "Web Developer", "Backend Developer", "Frontend Developer", "Fullstack Developer", "UI/UX Designer"];
let i = 0;
let j = 0;
setInterval(() => {
  if (j < text[i].length) {
    sentence.innerHTML += text[i].charAt(j);
    j++;
    if (j == text[i].length) {
      inputCursor.classList.add('blinking');
      setTimeout(() => {
        sentence.innerHTML = '';
        setTimeout(() => {
          inputCursor.classList.remove('blinking');
          j = 0;
          i++;
          if (i == text.length) i = 0;
        }, 1500);
      }, 3000);
    }
  }
}, 200);

// CV Modal

const cvBtn = document.querySelector('#cv-btn');
const cvSection = document.querySelector('#cv-modal');
const cvCloseBtn = document.querySelector('#close-cv-modal-btn');

cvBtn.addEventListener('click', () => {
  cvSection.style.display = 'block';
  // Disable scrolling when CV modal is open
  document.body.style.overflow = 'hidden';
});

cvCloseBtn.addEventListener('click', () => {
  cvSection.style.display = 'none';
  // Enable scrolling when CV modal is closed
  document.body.style.overflow = 'auto';
});

// Music

const audio = document.querySelector('#background-music');
const playBtn = document.querySelector('.music-toggle');
const musicOnIcon = document.querySelector('#music-on');
const musicOffIcon = document.querySelector('#music-off');
const songTitleContainer = document.querySelector('.song-title-container');
const songTitle = document.querySelector('.song-title');
let songTitleTimeout = null;

const directory = 'assets/musics/';
const playlist = ['Paramore - The Only Exception', 'Galileo Galilei - Aoi Shiori', 'Sukima Switch - Line'];
let currentTrack = 0;

function showSongTitle(title) {
  if (!songTitleContainer || !songTitle) return;

  // clear any previous hide timer
  if (songTitleTimeout) {
    clearTimeout(songTitleTimeout);
    songTitleTimeout = null;
  }

  songTitle.innerHTML = `Now playing <span class="title">${title}</span>`;

  // Jika animasi sudah ditampilkan, jangan restart - biarkan terus berjalan
  if (!songTitleContainer.classList.contains('show')) {
    songTitleContainer.classList.add('show');
  }

  // Hide after 10s unless reset by another call
  songTitleTimeout = setTimeout(() => {
    songTitleContainer.classList.remove('show');
    songTitleTimeout = null;
  }, 10000);
}

audio.src = directory + playlist[currentTrack] + '.mp3';
audio.type = 'audio/mpeg';
audio.volume = 0.5;

// Ensure icons reflect initial playback state
if (musicOnIcon && musicOffIcon) {
  if (audio.paused) {
    musicOnIcon.style.display = 'none';
    musicOffIcon.style.display = 'block';
  } else {
    musicOnIcon.style.display = 'block';
    musicOffIcon.style.display = 'none';
  }
}

showSongTitle(playlist[currentTrack]);

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    showSongTitle(playlist[currentTrack]);
    musicOnIcon.style.display = 'block';
    musicOffIcon.style.display = 'none';
  } else {
    audio.pause();
    // hide title immediately when pausing and clear timer
    if (songTitleTimeout) {
      clearTimeout(songTitleTimeout);
      songTitleTimeout = null;
    }
    // Shrink container while animation keeps running
    if (songTitleContainer) songTitleContainer.classList.remove('show');
    if (musicOnIcon && musicOffIcon) {
      musicOnIcon.style.display = 'none';
      musicOffIcon.style.display = 'block';
    }
  }
});

audio.addEventListener('ended', function () {
  currentTrack++;
  if (currentTrack >= playlist.length) currentTrack = 0;
  audio.src = directory + playlist[currentTrack] + '.mp3';
  audio.play();
  showSongTitle(playlist[currentTrack]);
});