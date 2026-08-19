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

  const highlightsHTML = project.highlights
    .map((h) => `<li>${h}</li>`)
    .join("");

  const techHTML = project.techStack
    .map((t) => `<span class="tech-tag">${t}</span>`)
    .join("");

  detailContent.innerHTML = `
    <div class="detail-hero">
      <img src="${project.image}" alt="${project.title}" />
    </div>
    <div class="detail-content">
      <div class="detail-title">
        <h1>${project.title}</h1>
        <span class="category-badge">${project.category}</span>
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
      </div>
    </div>
  `;
})();
