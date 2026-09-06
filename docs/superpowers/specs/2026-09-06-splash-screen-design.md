# Design Spec: Splash Screen

## Overview
A lightweight splash screen overlay for `index.html` that hides automatically once core UI dependencies (HTML, CSS, Fonts, and Hero Image) are loaded.

## Component & Architecture
1. **`index.html` Overlay Markup**:
   - Ditempatkan tepat setelah pembuka `<body>`.
   - `<div id="splash-screen"><div class="splash-content"><h2>Juan Dio</h2><div class="spinner"></div></div></div>`

2. **`styles/splash.css`**:
   - Fixed position, full viewport overlay (`z-index: 9999`).
   - Smooth fade-out animation using CSS opacity transition (`0.5s ease`).
   - Impory di `styles/style.css`.

3. **`scripts/script.js`**:
   - Logika penanganan dismiss splash screen.
   - Menunggu `document.fonts.ready` + pemuatan `hero1.png`.
   - Minimum visible duration (500ms) untuk mencegah flickering.
   - Safety fallback timeout (2500ms) jika ada keterlambatan jaringan.

## Behavior
- Resource gambar lain (seperti gambar project) dan audio berjalan secara paralel/lazy-loading di latar belakang tanpa menahan penutupan splash screen.
