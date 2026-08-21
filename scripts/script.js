// === Navbar ===
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

// === Scroll Section ===
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

// === Dashboard ===
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

// === CV Modal ===
const cvBtn = document.querySelector('#cv-btn');
const cvSection = document.querySelector('#cv-modal');
const cvCloseBtn = document.querySelector('#close-cv-modal-btn');
const navbar = document.querySelector('.navbar');
let cvCloseTimeout = null;

cvBtn.addEventListener('click', () => {
  if (cvCloseTimeout) {
    clearTimeout(cvCloseTimeout);
    cvCloseTimeout = null;
  }

  cvSection.classList.remove('closing');

  // Compensate for missing scrollbar to avoid layout shift
  const scrollBarComp = window.innerWidth - document.documentElement.clientWidth;
  if (scrollBarComp > 0) {
    // store original inline padding-right so we can restore it
    document.body.dataset.bodyOriginalPaddingRight = document.body.style.paddingRight || '';
    document.body.style.paddingRight = `${scrollBarComp}px`;
    document.body.dataset.navbarOriginalPaddingRight = navbar.style.paddingRight || '';
    navbar.style.paddingRight = `${scrollBarComp}px`;
  }

  cvSection.style.display = 'block';
  // Disable scrolling when CV modal is open
  document.body.style.overflow = 'hidden';
});

cvCloseBtn.addEventListener('click', () => {
  if (cvSection.classList.contains('closing')) return;

  cvSection.classList.add('closing');

  // wait for close animation before hiding modal and restoring page layout
  cvCloseTimeout = setTimeout(() => {
    cvSection.style.display = 'none';
    cvSection.classList.remove('closing');

    // Enable scrolling when CV modal is closed
    document.body.style.overflow = 'auto';

    // restore original padding-right (if any)
    if (document.body.dataset.bodyOriginalPaddingRight !== undefined) {
      document.body.style.paddingRight = document.body.dataset.bodyOriginalPaddingRight;
      delete document.body.dataset.bodyOriginalPaddingRight;
    } else {
      document.body.style.paddingRight = '';
    }
    if (navbar.dataset.navbarOriginalPaddingRight !== undefined) {
      navbar.style.paddingRight = navbar.dataset.navbarOriginalPaddingRight;
      delete navbar.dataset.navbarOriginalPaddingRight;
    } else {
      navbar.style.paddingRight = '';
    }

    cvCloseTimeout = null;
  }, 220);

});

// === Music ===
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

// === Render Projects ===
function renderProjects() {
  const projectsGrid = document.getElementById('projects-grid');
  if (!projectsGrid || typeof projectsData === 'undefined') return;

  const categoryInternSVG = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 13.4225C12.5 13.7777 12.2203 14.0654 11.875 14.0654H8.125C7.77969 14.0654 7.5 13.7777 7.5 13.4225V11.494H0V17.2797C0 18.3083 0.875 19.2083 1.875 19.2083H18.125C19.125 19.2083 20 18.3083 20 17.2797V11.494H12.5V13.4225ZM18.125 5.06539H15V3.13682C15 2.10825 14.125 1.20825 13.125 1.20825H6.875C5.875 1.20825 5 2.10825 5 3.13682V5.06539H1.875C0.875 5.06539 0 5.96539 0 6.99397V10.2083H20V6.99397C20 5.96539 19.125 5.06539 18.125 5.06539ZM12.5 5.06539H7.5V3.77968H12.5V5.06539Z" fill="#20262E"/>
    </svg>
  `;

  const categoryUniSVG = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 9V17.5C0 17.7763 0.22375 18 0.5 18H3V8H1C0.447812 8 0 8.44782 0 9ZM11.25 7.5H10.5V6.25C10.5 6.11188 10.3881 6 10.25 6H9.75C9.61187 6 9.5 6.11188 9.5 6.25V8.25C9.5 8.38813 9.61187 8.5 9.75 8.5H11.25C11.3881 8.5 11.5 8.38813 11.5 8.25V7.75C11.5 7.61188 11.3881 7.5 11.25 7.5ZM15.5547 5.50125L10.5547 2.16782C10.3904 2.05839 10.1974 2 10 2C9.8026 2 9.60961 2.05839 9.44531 2.16782L4.44531 5.50125C4.30836 5.59256 4.19606 5.71626 4.11838 5.86137C4.0407 6.00648 4.00004 6.16853 4 6.33313V18H8V13.5C8 13.2238 8.22375 13 8.5 13H11.5C11.7763 13 12 13.2238 12 13.5V18H16V6.33344C16 5.99907 15.8328 5.68657 15.5547 5.50125ZM10 10C8.61937 10 7.5 8.88063 7.5 7.5C7.5 6.11938 8.61937 5 10 5C11.3806 5 12.5 6.11938 12.5 7.5C12.5 8.88063 11.3806 10 10 10ZM19 8H17V18H19.5C19.7763 18 20 17.7763 20 17.5V9C20 8.44782 19.5522 8 19 8Z" fill="#20262E"/>
    </svg>
  `;

  projectsGrid.innerHTML = projectsData
    .map((project) => {
      const isUni = project.category && project.category.toLowerCase().includes('uni');
      const hasRepo = project.repoUrl && project.repoUrl.trim() !== '';
      const hasLive = project.liveUrl && project.liveUrl.trim() !== '';
      const imageSrc = project.image || (project.images && project.images[0]) || '';

      return `
        <div class="project">
          <div class="picture">
            <img src="${imageSrc}" alt="${project.title}" />
          </div>
          <div class="bottom">
            <div class="desc">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>
            <div class="nav">
              <div class="project-link">
                <a
                  target="_blank"
                  href="${hasRepo ? project.repoUrl : '#'}"
                  class="repo ${hasRepo ? '' : 'disabled'}"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0.75C3.41625 0.75 0.5 3.66625 0.5 7.25C0.5 10.1412 2.38375 12.5925 4.965 13.4437C5.29 13.5037 5.4125 13.3037 5.4125 13.1312C5.4125 12.9775 5.40625 12.455 5.40375 11.7687C3.60625 12.1587 3.22875 10.9125 3.22875 10.9125C2.9325 10.1612 2.50875 9.9575 2.50875 9.9575C1.915 9.55125 2.5525 9.56 2.5525 9.56C3.20375 9.60625 3.54625 10.2312 3.54625 10.2312C4.12125 11.2175 5.065 10.9312 5.4375 10.7637C5.49625 10.3425 5.665 10.0562 5.8525 9.89375C4.4225 9.73125 2.915 9.17875 2.915 6.70375C2.915 6.0075 3.16375 5.42875 3.58 4.97375C3.51375 4.81125 3.29125 4.15 3.6425 3.26625C3.6425 3.26625 4.18375 3.09375 5.4125 3.93125C5.9275 3.7875 6.475 3.71625 7.025 3.715C7.575 3.71625 8.1225 3.7875 8.6375 3.93125C9.86625 3.09375 10.4075 3.26625 10.4075 3.26625C10.76 4.15 10.5375 4.81125 10.4712 4.97375C10.89 5.42875 11.135 6.0075 11.135 6.70375C11.135 9.185 9.62375 9.72875 8.18875 9.8875C8.42 10.0862 8.6275 10.4762 8.6275 11.0775C8.6275 11.9438 8.62 12.6462 8.62 13.1312C8.62 13.3062 8.74125 13.5087 9.07375 13.4425C11.6188 12.5887 13.5 10.1387 13.5 7.25C13.5 3.66625 10.5837 0.75 7 0.75Z" fill="white"/>
                  </svg>
                  <span class="btn-text">Repo</span>
                </a>
                <a
                  target="_blank"
                  href="${hasLive ? project.liveUrl : '#'}"
                  class="live ${hasLive ? '' : 'disabled'}"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 13.25C7.82076 13.25 8.63349 13.0883 9.39177 12.7742C10.1501 12.4602 10.8391 11.9998 11.4194 11.4194C11.9998 10.8391 12.4602 10.1501 12.7742 9.39177C13.0883 8.63349 13.25 7.82076 13.25 7C13.25 6.17924 13.0883 5.36651 12.7742 4.60823C12.4602 3.84994 11.9998 3.16095 11.4194 2.58058C10.8391 2.00022 10.1501 1.53984 9.39177 1.22575C8.63349 0.911661 7.82076 0.75 7 0.75M7 13.25C6.17924 13.25 5.36651 13.0883 4.60823 12.7742C3.84994 12.4602 3.16095 11.9998 2.58058 11.4194C2.00022 10.8391 1.53984 10.1501 1.22575 9.39177C0.911661 8.63349 0.75 7.82076 0.75 7C0.75 6.17924 0.911661 5.36651 1.22575 4.60823C1.53984 3.84994 2.00022 3.16095 2.58058 2.58058C3.16095 2.00022 3.84994 1.53984 4.60823 1.22575C5.36651 0.911661 6.17924 0.75 7 0.75M7 13.25C8.91736 13.25 9.73681 9.66458 9.73681 7C9.73681 4.33542 8.91736 0.75 7 0.75M7 13.25C5.08264 13.25 4.26319 9.66458 4.26319 7C4.26319 4.33542 5.08264 0.75 7 0.75M1.09722 4.91667H12.9028M1.09722 9.08333H12.9028" stroke="#20262E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span class="btn-text">Live</span>
                </a>
                <a
                  href="project-detail.html?id=${project.id}"
                  class="detail"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="white"/>
                  </svg>
                  <span class="btn-text">Detail</span>
                </a>
              </div>
              <div class="category">
                ${isUni ? categoryUniSVG : categoryInternSVG}
                <p>${project.category}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');
}

// Call renderProjects on load
renderProjects();
