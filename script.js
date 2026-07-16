/* =========================================================
   DIARRA ALIFA PRATAMA — PORTFOLIO
   script.js
   ========================================================= */

/* ---------------------------------------------------------
   1) CONFIG — replace with your own GitHub username
   --------------------------------------------------------- */
const GITHUB_USERNAME = "InterSky-Codex"; // <-- REPLACE THIS with your actual GitHub username
const MAX_REPOS_VISIBLE = 6; // how many repo cards to show before "Show more"

/* Approximate colors for common languages, used for the small
   language dot on each repo card (falls back to a neutral gray). */
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Go: "#00ADD8",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Vue: "#41b883",
  Jupyter: "#DA5B0B",
};
const DEFAULT_LANG_COLOR = "#8A8A85";

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initNavbarScrollState();
  initSectionSpy();
  initRouteLineAutoHide();
  initMobileNavCollapse();
  initScrollReveal();
  initBackToTop();
  initGithubRepos();
});

/* ---------------------------------------------------------
   Footer year
   --------------------------------------------------------- */
function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   Navbar background/border once the page has scrolled
   --------------------------------------------------------- */
function initNavbarScrollState() {
  const nav = document.getElementById("mainNav");
  if (!nav) return;

  const toggle = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ---------------------------------------------------------
   Highlight the active section in both the top navbar and
   the vertical "route line" as the user scrolls.
   --------------------------------------------------------- */
function initSectionSpy() {
  const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
  if (sections.length === 0) return;

  const navLinks = Array.from(document.querySelectorAll('#mainNavList [data-section]'));
  const routeStops = Array.from(document.querySelectorAll(".route-stop[data-section]"));

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === id);
    });
    routeStops.forEach((stop) => {
      const isActive = stop.dataset.section === id;
      stop.classList.toggle("active", isActive);
      if (isActive) {
        stop.setAttribute("aria-current", "true");
      } else {
        stop.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

function initRouteLineAutoHide() {
  const routeLine = document.querySelector(".route-line");
  if (!routeLine) return;

  let hideTimer = null;
  const hideRouteLine = () => routeLine.classList.add("collapsed");
  const resetRouteLine = () => {
    routeLine.classList.remove("collapsed");
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hideRouteLine, 5000);
  };

  resetRouteLine();
  routeLine.addEventListener("mouseenter", resetRouteLine);
  routeLine.addEventListener("mouseleave", () => {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hideRouteLine, 5000);
  });
}

/* ---------------------------------------------------------
   Collapse the mobile navbar automatically after a link tap
   --------------------------------------------------------- */
function initMobileNavCollapse() {
  const collapseEl = document.getElementById("navMenu");
  if (!collapseEl || typeof bootstrap === "undefined") return;

  const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
  collapseEl.querySelectorAll(".nav-link, .btn").forEach((link) => {
    link.addEventListener("click", () => {
      if (collapseEl.classList.contains("show")) bsCollapse.hide();
    });
  });
}

/* ---------------------------------------------------------
   Simple fade/slide-in reveal for elements marked .reveal
   --------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll(".reveal");
  if (items.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.revealDelay || 0;
          setTimeout(() => entry.target.classList.add("is-visible"), Number(delay));
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   Back-to-top button
   --------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("is-visible", window.scrollY > 500),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   2) GITHUB REPOSITORIES — Fetch API
   Calls https://api.github.com/users/{GITHUB_USERNAME}/repos
   and renders the result as a grid of cards.
   --------------------------------------------------------- */
function initGithubRepos() {
  const grid = document.getElementById("repo-grid");
  const status = document.getElementById("repo-status");
  const profileLink = document.getElementById("repo-profile-link");
  if (!grid || !status) return;

  if (profileLink) {
    profileLink.href = `https://github.com/${GITHUB_USERNAME}`;
  }

  renderSkeletons(grid, 6);
  status.textContent = "Loading repositories…";
  status.classList.remove("is-error");

  fetchRepos()
    .then((repos) => {
      const cleaned = repos
        .filter((repo) => !repo.fork) // skip forks, only show original work
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

      if (cleaned.length === 0) {
        grid.innerHTML = "";
        status.textContent = "No public repositories found yet.";
        return;
      }

      status.textContent = `Showing ${Math.min(cleaned.length, MAX_REPOS_VISIBLE)} of ${cleaned.length} public repositories.`;
      renderRepoCards(grid, cleaned);
    })
    .catch((err) => {
      console.error("Failed to load GitHub repositories:", err);
      grid.innerHTML = "";
      status.classList.add("is-error");
      status.innerHTML = `Couldn't load repositories right now (${escapeHtml(err.message)}). `;

      const retryBtn = document.createElement("button");
      retryBtn.type = "button";
      retryBtn.className = "btn btn-outline-ink btn-sm rounded-0 ms-2";
      retryBtn.textContent = "Retry";
      retryBtn.addEventListener("click", () => initGithubRepos());
      status.appendChild(retryBtn);
    });
}

async function fetchRepos() {
  if (!GITHUB_USERNAME || GITHUB_USERNAME === "GITHUB_USERNAME") {
    throw new Error("Set your GITHUB_USERNAME at the top of script.js");
  }

  const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?sort=updated&direction=desc&per_page=100`;
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error("GitHub user not found");
    if (response.status === 403) throw new Error("GitHub API rate limit reached, try again later");
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Unexpected response from GitHub API");
  return data;
}

function renderSkeletons(grid, count) {
  grid.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="repo-skeleton">
        <div class="skeleton-line" style="width: 60%;"></div>
        <div class="skeleton-line" style="width: 90%;"></div>
        <div class="skeleton-line" style="width: 75%;"></div>
        <div class="skeleton-line" style="width: 40%;"></div>
      </div>
    `;
    grid.appendChild(col);
  }
}

function renderRepoCards(grid, repos) {
  grid.innerHTML = "";

  const visible = repos.slice(0, MAX_REPOS_VISIBLE);
  const remaining = repos.slice(MAX_REPOS_VISIBLE);

  visible.forEach((repo) => grid.appendChild(buildRepoCard(repo)));

  if (remaining.length > 0) {
    const moreWrap = document.createElement("div");
    moreWrap.className = "col-12 text-center mt-2";
    moreWrap.innerHTML = `
      <button type="button" class="btn btn-outline-ink rounded-0 px-4 py-2" id="showMoreRepos">
        Show ${remaining.length} more
      </button>
    `;
    grid.appendChild(moreWrap);

    document.getElementById("showMoreRepos").addEventListener("click", (e) => {
      remaining.forEach((repo) => grid.insertBefore(buildRepoCard(repo), moreWrap));
      moreWrap.remove();
      e.target.blur();
    });
  }
}

function buildRepoCard(repo) {
  const col = document.createElement("div");
  col.className = "col-md-6 col-lg-4 reveal is-visible";

  const language = repo.language || "N/A";
  const langColor = LANGUAGE_COLORS[language] || DEFAULT_LANG_COLOR;
  const description = repo.description ? escapeHtml(repo.description) : "No description provided.";
  const updated = repo.pushed_at
    ? new Date(repo.pushed_at).toLocaleDateString(undefined, { year: "numeric", month: "short" })
    : "";

  col.innerHTML = `
    <a class="repo-card text-decoration-none" href="${repo.html_url}" target="_blank" rel="noopener" aria-label="View ${escapeHtml(repo.name)} on GitHub">
      <div class="repo-card-header">
        <span class="repo-name">${escapeHtml(repo.name)}</span>
        <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
      </div>
      <p class="repo-desc">${description}</p>
      <div class="repo-footer">
        <span class="repo-lang">
          <span class="lang-dot" style="background:${langColor};"></span>${escapeHtml(language)}
        </span>
        <span class="repo-stats">
          <span><i class="bi bi-star"></i> ${repo.stargazers_count ?? 0}</span>
          ${updated ? `<span>${updated}</span>` : ""}
        </span>
      </div>
    </a>
  `;
  return col;
}

/* Basic HTML-escaping for text coming back from the API */
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}
