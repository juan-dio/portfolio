// === Splash Screen Handler ===
const splashScreen = document.querySelector('#splash-screen');

function dismissSplash() {
  if (!splashScreen || splashScreen.classList.contains('hide')) return;
  splashScreen.classList.add('hide');
  setTimeout(() => {
    if (splashScreen && splashScreen.parentNode) {
      splashScreen.parentNode.removeChild(splashScreen);
    }
  }, 500);
}

const startTime = Date.now();
const minDisplayTime = 500;
const fallbackTimeout = 3000;
let fallbackTimer = setTimeout(dismissSplash, fallbackTimeout);

function checkCoreResourcesLoaded(heroImgEl) {
  const fontPromise = document.fonts
    ? Promise.all([
        document.fonts.load('300 1rem "Poppins"'),
        document.fonts.load('400 1rem "Poppins"'),
        document.fonts.load('500 1rem "Poppins"'),
        document.fonts.load('600 1rem "Poppins"'),
        document.fonts.ready,
      ])
    : Promise.resolve();

  const heroImgPromise = new Promise((resolve) => {
    if (!heroImgEl || heroImgEl.complete) {
      resolve();
    } else {
      heroImgEl.addEventListener('load', resolve, { once: true });
      heroImgEl.addEventListener('error', resolve, { once: true });
    }
  });

  Promise.all([fontPromise, heroImgPromise]).then(() => {
    clearTimeout(fallbackTimer);
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
    setTimeout(dismissSplash, remainingTime);
  });
}

// Navbar
const header = document.querySelector('header');
const projectNavbarItems = document.querySelector('.project-navbar-items');
const fixedNav = header ? header.offsetTop : 0;

window.addEventListener('scroll', () => {
  if (window.scrollY > fixedNav) {
    projectNavbarItems.classList.add('border');
  } else {
    projectNavbarItems.classList.remove('border');
  }
});

// === Project Detail Page ===
(function () {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");
  const detailContent = document.getElementById("detail-content");

  function renderNotFound() {
    if (!detailContent) return;
    detailContent.innerHTML = `
      <div class="detail-not-found">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist or has been removed.</p>
        <a href="index.html#projects">Back to Projects</a>
      </div>
    `;
    dismissSplash();
  }

  if (!projectId) {
    renderNotFound();
    return;
  }

  if (typeof projectsData === "undefined") {
    renderNotFound();
    return;
  }

  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    renderNotFound();
    return;
  }

  document.title = `${project.title} | Juan Dio`;

  const hasRepo = project.repoUrl && project.repoUrl.trim() !== "";
  const hasLive = project.liveUrl && project.liveUrl.trim() !== "";
  const hasFigma = project.figmaUrl && project.figmaUrl.trim() !== "";
  const isFigmaOnly = hasFigma && !hasRepo && !hasLive;

  const highlightsHTML = project.highlights
    .map((h) => `<li>${h}</li>`)
    .join("");

  const techHTML = project.techStack
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  const images = (project.images && project.images.length > 0) ? project.images : [project.image];

  let heroHTML = "";
  if (images.length > 1) {
    const slidesHTML = images
      .map((img, index) => `<img src="${img}" alt="${project.title} - Image ${index + 1}" class="carousel-slide ${index === 0 ? "active" : ""}" ${index > 0 ? 'loading="lazy"' : ''} />`)
      .join("");

    const dotsHTML = images
      .map((_, index) => `<button class="carousel-dot ${index === 0 ? "active" : ""}" data-index="${index}" aria-label="Slide ${index + 1}"></button>`)
      .join("");

    heroHTML = `
      <div class="detail-carousel">
        <div class="carousel-track">
          ${slidesHTML}
        </div>
        <button class="carousel-btn prev" aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="carousel-btn next" aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="carousel-dots">
          ${dotsHTML}
        </div>
      </div>
    `;
  } else {
    heroHTML = `
      <div class="detail-hero">
        <img src="${images[0]}" alt="${project.title}" />
      </div>
    `;
  }

  const isUniProject = project.category && project.category.toLowerCase().includes("uni");
  const isDummyProject = project.category && project.category.toLowerCase().includes("dummy");

  const categoryIconSVG = isUniProject
    ? `<svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 9V17.5C0 17.7763 0.22375 18 0.5 18H3V8H1C0.447812 8 0 8.44782 0 9ZM11.25 7.5H10.5V6.25C10.5 6.11188 10.3881 6 10.25 6H9.75C9.61187 6 9.5 6.11188 9.5 6.25V8.25C9.5 8.38813 9.61187 8.5 9.75 8.5H11.25C11.3881 8.5 11.5 8.38813 11.5 8.25V7.75C11.5 7.61188 11.3881 7.5 11.25 7.5ZM15.5547 5.50125L10.5547 2.16782C10.3904 2.05839 10.1974 2 10 2C9.8026 2 9.60961 2.05839 9.44531 2.16782L4.44531 5.50125C4.30836 5.59256 4.19606 5.71626 4.11838 5.86137C4.0407 6.00648 4.00004 6.16853 4 6.33313V18H8V13.5C8 13.2238 8.22375 13 8.5 13H11.5C11.7763 13 12 13.2238 12 13.5V18H16V6.33344C16 5.99907 15.8328 5.68657 15.5547 5.50125ZM10 10C8.61937 10 7.5 8.88063 7.5 7.5C7.5 6.11938 8.61937 5 10 5C11.3806 5 12.5 6.11938 12.5 7.5C12.5 8.88063 11.3806 10 10 10ZM19 8H17V18H19.5C19.7763 18 20 17.7763 20 17.5V9C20 8.44782 19.5522 8 19 8Z"
          fill="#20262E"
        />
      </svg>`
    : (isDummyProject
      ? `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_81_163)">
            <path d="M4.96484 5.3894C5.01562 5.69019 5.27734 5.91675 5.58984 5.91675H6.23438C6.61719 5.91675 6.92187 5.58472 6.87109 5.21362C6.72266 4.11206 6.23047 3.09644 5.44141 2.29565C4.87891 1.72144 4.51953 0.994873 4.41016 0.205811C4.36719 -0.102783 4.10156 -0.333252 3.78125 -0.333252H3.14062C2.75781 -0.333252 2.46094 -0.0012207 2.50391 0.369873C2.65625 1.61597 3.20703 2.7644 4.08984 3.66675C4.55859 4.14331 4.85938 4.74097 4.96484 5.3894ZM9.33984 5.3894C9.39062 5.69019 9.65234 5.91675 9.96484 5.91675H10.6094C10.9922 5.91675 11.2969 5.58472 11.2461 5.21362C11.0977 4.11206 10.6055 3.09644 9.81641 2.29565C9.25391 1.72144 8.89453 0.994873 8.78516 0.205811C8.74219 -0.102783 8.47656 -0.333252 8.15625 -0.333252H7.51562C7.13281 -0.333252 6.83203 -0.0012207 6.87891 0.369873C7.03125 1.61597 7.58203 2.7644 8.46484 3.66675C8.93359 4.14331 9.23438 4.74097 9.33984 5.3894ZM15.625 7.16675H1.25C0.558594 7.16675 0 7.72534 0 8.41675V15.9167C0 17.9871 1.67969 19.6667 3.75 19.6667H11.25C13.3203 19.6667 15 17.9871 15 15.9167H15.625C18.0391 15.9167 20 13.9558 20 11.5417C20 9.12769 18.0391 7.16675 15.625 7.16675ZM15.625 13.4167H15V9.66675H15.625C16.6602 9.66675 17.5 10.5066 17.5 11.5417C17.5 12.5769 16.6602 13.4167 15.625 13.4167Z" fill="#20262E"/>
          </g>
          <defs>
            <clipPath id="clip0_81_163">
              <rect width="20" height="20" fill="white"/>
            </clipPath>
          </defs>
        </svg>`
      : `<svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 13.4225C12.5 13.7777 12.2203 14.0654 11.875 14.0654H8.125C7.77969 14.0654 7.5 13.7777 7.5 13.4225V11.494H0V17.2797C0 18.3083 0.875 19.2083 1.875 19.2083H18.125C19.125 19.2083 20 18.3083 20 17.2797V11.494H12.5V13.4225ZM18.125 5.06539H15V3.13682C15 2.10825 14.125 1.20825 13.125 1.20825H6.875C5.875 1.20825 5 2.10825 5 3.13682V5.06539H1.875C0.875 5.06539 0 5.96539 0 6.99397V10.2083H20V6.99397C20 5.96539 19.125 5.06539 18.125 5.06539ZM12.5 5.06539H7.5V3.77968H12.5V5.06539Z"
            fill="#20262E"
          />
        </svg>`);

  detailContent.innerHTML = `
    ${heroHTML}
    <div class="detail-content">
      <div class="detail-title">
        <h1>${project.title}</h1>
        <div class="category">
          ${categoryIconSVG}
          <p>${project.category}</p>
        </div>
      </div>

      <p class="detail-description">${project.description}</p>

      <div class="detail-section">
        <h2>Key Highlights</h2>
        <ul class="detail-highlights">
          ${highlightsHTML}
        </ul>
      </div>

      <div class="detail-section">
        <h2>Tech Stack</h2>
        <div class="detail-tech-stack">
          ${techHTML}
        </div>
      </div>

      <div class="detail-links">
        ${isFigmaOnly ? `
          <a
            target="_blank"
            href="${project.figmaUrl}"
            class="figma"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.25 8.75H7M5.25 8.75C4.90388 8.75 4.56554 8.85264 4.27775 9.04493C3.98997 9.23722 3.76566 9.51053 3.63321 9.8303C3.50076 10.1501 3.4661 10.5019 3.53363 10.8414C3.60115 11.1809 3.76782 11.4927 4.01256 11.7374C4.25731 11.9822 4.56913 12.1488 4.90859 12.2164C5.24806 12.2839 5.59993 12.2492 5.9197 12.1168C6.23947 11.9843 6.51278 11.76 6.70507 11.4722C6.89736 11.1845 7 10.8461 7 10.5V8.75M5.25 8.75C4.78587 8.75 4.34075 8.56563 4.01256 8.23744C3.68438 7.90925 3.5 7.46413 3.5 7C3.5 6.53587 3.68438 6.09075 4.01256 5.76256C4.34075 5.43437 4.78587 5.25 5.25 5.25M7 8.75V7M5.25 5.25H7M5.25 5.25C4.78587 5.25 4.34075 5.06563 4.01256 4.73744C3.68438 4.40925 3.5 3.96413 3.5 3.5C3.5 3.03587 3.68438 2.59075 4.01256 2.26256C4.34075 1.93437 4.78587 1.75 5.25 1.75H7M7 7V5.25M7 7C7 7.34612 7.10264 7.68446 7.29493 7.97225C7.48722 8.26003 7.76053 8.48434 8.0803 8.61679C8.40008 8.74924 8.75194 8.7839 9.09141 8.71637C9.43088 8.64885 9.7427 8.48218 9.98744 8.23744C10.2322 7.99269 10.3989 7.68087 10.4664 7.34141C10.5339 7.00194 10.4992 6.65007 10.3668 6.3303C10.2343 6.01053 10.01 5.73722 9.72225 5.54493C9.43446 5.35264 9.09612 5.25 8.75 5.25M7 7C7 6.53587 7.18437 6.09075 7.51256 5.76256C7.84075 5.43437 8.28587 5.25 8.75 5.25M7 5.25V1.75M7 5.25H8.75M7 1.75H8.75C9.21413 1.75 9.65925 1.93437 9.98744 2.26256C10.3156 2.59075 10.5 3.03587 10.5 3.5C10.5 3.96413 10.3156 4.40925 9.98744 4.73744C9.65925 5.06563 9.21413 5.25 8.75 5.25" stroke="white" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Figma Prototype
          </a>
        ` : `
          <a
            target="_blank"
            href="${hasRepo ? project.repoUrl : "#"}"
            class="repo ${hasRepo ? "" : "disabled"}"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0.75C3.41625 0.75 0.5 3.66625 0.5 7.25C0.5 10.1412 2.38375 12.5925 4.965 13.4437C5.29 13.5037 5.4125 13.3037 5.4125 13.1312C5.4125 12.9775 5.40625 12.455 5.40375 11.7687C3.60625 12.1587 3.22875 10.9125 3.22875 10.9125C2.9325 10.1612 2.50875 9.9575 2.50875 9.9575C1.915 9.55125 2.5525 9.56 2.5525 9.56C3.20375 9.60625 3.54625 10.2312 3.54625 10.2312C4.12125 11.2175 5.065 10.9312 5.4375 10.7637C5.49625 10.3425 5.665 10.0562 5.8525 9.89375C4.4225 9.73125 2.915 9.17875 2.915 6.70375C2.915 6.0075 3.16375 5.42875 3.58 4.97375C3.51375 4.81125 3.29125 4.15 3.6425 3.26625C3.6425 3.26625 4.18375 3.09375 5.4125 3.93125C5.9275 3.7875 6.475 3.71625 7.025 3.715C7.575 3.71625 8.1225 3.7875 8.6375 3.93125C9.86625 3.09375 10.4075 3.26625 10.4075 3.26625C10.76 4.15 10.5375 4.81125 10.4712 4.97375C10.89 5.42875 11.135 6.0075 11.135 6.70375C11.135 9.185 9.62375 9.72875 8.18875 9.8875C8.42 10.0862 8.6275 10.4762 8.6275 11.0775C8.6275 11.9438 8.62 12.6462 8.62 13.1312C8.62 13.3062 8.74125 13.5087 9.07375 13.4425C11.6188 12.5887 13.5 10.1387 13.5 7.25C13.5 3.66625 10.5837 0.75 7 0.75Z" fill="white"/>
            </svg>
            Repository
          </a>
          <a
            target="_blank"
            href="${hasLive ? project.liveUrl : "#"}"
            class="live ${hasLive ? "" : "disabled"}"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13.25C7.82076 13.25 8.63349 13.0883 9.39177 12.7742C10.1501 12.4602 10.8391 11.9998 11.4194 11.4194C11.9998 10.8391 12.4602 10.1501 12.7742 9.39177C13.0883 8.63349 13.25 7.82076 13.25 7C13.25 6.17924 13.0883 5.36651 12.7742 4.60823C12.4602 3.84994 11.9998 3.16095 11.4194 2.58058C10.8391 2.00022 10.1501 1.53984 9.39177 1.22575C8.63349 0.911661 7.82076 0.75 7 0.75M7 13.25C6.17924 13.25 5.36651 13.0883 4.60823 12.7742C3.84994 12.4602 3.16095 11.9998 2.58058 11.4194C2.00022 10.8391 1.53984 10.1501 1.22575 9.39177C0.911661 8.63349 0.75 7.82076 0.75 7C0.75 6.17924 0.911661 5.36651 1.22575 4.60823C1.53984 3.84994 2.00022 3.16095 2.58058 2.58058C3.16095 2.00022 3.84994 1.53984 4.60823 1.22575C5.36651 0.911661 6.17924 0.75 7 0.75M7 13.25C8.91736 13.25 9.73681 9.66458 9.73681 7C9.73681 4.33542 8.91736 0.75 7 0.75M7 13.25C5.08264 13.25 4.26319 9.66458 4.26319 7C4.26319 4.33542 5.08264 0.75 7 0.75M1.09722 4.91667H12.9028M1.09722 9.08333H12.9028" stroke="#20262E" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Live Demo
          </a>
        `}
      </div>
    </div>
  `;

  // Initialize Carousel Logic if carousel exists
  if (images.length > 1) {
    const slides = document.querySelectorAll(".carousel-slide");
    const dots = document.querySelectorAll(".carousel-dot");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");
    let currentSlide = 0;

    function showSlide(index) {
      if (index < 0) {
        currentSlide = slides.length - 1;
      } else if (index >= slides.length) {
        currentSlide = 0;
      } else {
        currentSlide = index;
      }

      slides.forEach((slide, idx) => {
        slide.classList.toggle("active", idx === currentSlide);
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentSlide);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showSlide(currentSlide + 1);
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener("click", (e) => {
        const index = parseInt(e.target.getAttribute("data-index"), 10);
        showSlide(index);
      });
    });
  }

  // Check core resources (first image + fonts)
  const firstImageEl = detailContent.querySelector('.carousel-slide, .detail-hero img');
  checkCoreResourcesLoaded(firstImageEl);
})();
