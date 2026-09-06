# Splash Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a full-screen overlay splash screen in `index.html` that hides after core assets (fonts & hero image) are loaded.

**Architecture:** Pure CSS overlay + Vanilla JS loader event listeners (`document.fonts.ready` & hero image load check) with a safety timeout fallback.

**Tech Stack:** Vanilla HTML5, CSS3, JavaScript.

## Global Constraints
- Pure vanilla JS and CSS. No extra external libraries or dependencies.
- Modular CSS import in `styles/style.css`.

---

### Task 1: Add Splash Screen Stylesheet & Import

**Files:**
- Create: `styles/splash.css`
- Modify: `styles/style.css:15`

- [ ] **Step 1: Create `styles/splash.css`**

```css
#splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #20262e;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #ffffff;
  opacity: 1;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}

#splash-screen.hide {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.splash-content {
  text-align: center;
}

.splash-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #ffffff;
}

.splash-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

- [ ] **Step 2: Import `splash.css` in `styles/style.css`**

Add line `@import url("./splash.css");` at the bottom of `styles/style.css`.

- [ ] **Step 3: Commit CSS changes**

```bash
git add styles/splash.css styles/style.css
git commit -m "style: add splash screen CSS layout and animation"
```

---

### Task 2: Add Splash Screen HTML Markup & Script Logic

**Files:**
- Modify: `index.html:21`
- Modify: `scripts/script.js:1-10`

- [ ] **Step 1: Add HTML Markup in `index.html`**

Insert right after `<body>`:
```html
    <!-- Splash Screen -->
    <div id="splash-screen">
      <div class="splash-content">
        <h2 class="splash-title">Juan Dio</h2>
        <div class="splash-spinner"></div>
      </div>
    </div>
```

- [ ] **Step 2: Add Splash Dismiss Logic in `scripts/script.js`**

Add at the top of `scripts/script.js`:
```javascript
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
const fallbackTimeout = 2500;

function checkCoreResourcesLoaded() {
  const heroImg = document.querySelector('#dashboard img');
  const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();

  const heroImgPromise = new Promise((resolve) => {
    if (!heroImg || heroImg.complete) {
      resolve();
    } else {
      heroImg.addEventListener('load', resolve);
      heroImg.addEventListener('error', resolve);
    }
  });

  Promise.all([fontPromise, heroImgPromise]).then(() => {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
    setTimeout(dismissSplash, remainingTime);
  });
}

// Fallback timer
const fallbackTimer = setTimeout(dismissSplash, fallbackTimeout);

if (document.readyState === 'complete') {
  checkCoreResourcesLoaded();
} else {
  window.addEventListener('load', () => {
    clearTimeout(fallbackTimer);
    checkCoreResourcesLoaded();
  });
}
```

- [ ] **Step 3: Commit HTML and JS changes**

```bash
git add index.html scripts/script.js
git commit -m "feat: add splash screen HTML overlay and load handler script"
```
