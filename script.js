const softwareItems = [
  {
    title: "Full Body Anatomy Viewer",
    category: "Anatomy",
    type: "3D Viewer",
    description: "Explore a full human model with selectable anatomy systems, labels, and clinical context.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Training"]
  },
  {
    title: "Cardiovascular System",
    category: "Anatomy",
    type: "System View",
    description: "Review cardiac and vascular anatomy with focused structure visibility and 3D navigation.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Physiology", "Training"]
  },
  {
    title: "Echo Orientation Vignette",
    category: "Imaging",
    type: "Echo",
    description: "A short interactive vignette for linking ultrasound views to 3D cardiac anatomy.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Imaging", "Training"]
  },
  {
    title: "Procedure Planning Viewer",
    category: "Procedure",
    type: "Planning",
    description: "Review anatomy, device positioning concepts, and spatial relationships for procedural learning.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Procedure", "Training"]
  },
  {
    title: "Respiratory System Review",
    category: "Anatomy",
    type: "System View",
    description: "Explore airways, lungs, and related thoracic structures in a focused 3D vignette.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Physiology"]
  },
  {
    title: "Nervous System Review",
    category: "Anatomy",
    type: "System View",
    description: "Inspect major nervous system structures with simple labels and clean spatial navigation.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Training"]
  },
  {
    title: "Musculoskeletal System Review",
    category: "Anatomy",
    type: "System View",
    description: "View bones and muscles with simplified layers for education and quick structural review.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Training"]
  },
  {
    title: "Digestive System Review",
    category: "Anatomy",
    type: "System View",
    description: "Navigate core digestive structures with a plain 3D viewer and clinically relevant labels.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Anatomy", "Physiology"]
  },
  {
    title: "Clinical Scenario Vignette",
    category: "Scenario",
    type: "Case",
    description: "A short case-based medical scenario designed for fast clinical learning and discussion.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Scenario", "Training"]
  },
  {
    title: "Emergency Response Simulation",
    category: "Scenario",
    type: "Simulation",
    description: "A guided vignette for practicing clinical decision-making in an emergency scenario.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Scenario", "Training"]
  },
  {
    title: "Hemodynamics Visualization",
    category: "Physiology",
    type: "Simulation",
    description: "Visualize pressure, flow, valve timing, and cardiac cycle mechanics in a compact 3D scene.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Physiology", "Training"]
  },
  {
    title: "Device Education Viewer",
    category: "Procedure",
    type: "Device",
    description: "Understand device anatomy relationships and deployment concepts through a short interactive module.",
    link: "projects/my-webgl-build/index.html",
    tags: ["Procedure", "Training"]
  }
];

const grid = document.getElementById("softwareGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function createCard(item) {
  const tagText = item.tags.join(" / ");

  return `
    <a class="card" href="${item.link}" aria-label="Open ${item.title}">
      <div class="thumb">
        <div class="thumb-pattern"></div>
        <div class="thumb-visual">
          <div class="medical-icon"></div>
        </div>
        <div class="badge-row">
          <span class="badge">${item.category}</span>
          <span class="badge">${item.type}</span>
        </div>
        <div class="play-pill">Open Vignette</div>
      </div>

      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div class="card-description">${item.description}</div>
        <div class="meta">
          <span>${tagText}</span>
          <strong>Open</strong>
        </div>
      </div>
    </a>
  `;
}

function matchesFilter(item) {
  if (activeFilter === "all") return true;

  return item.tags.includes(activeFilter) ||
    item.category === activeFilter ||
    item.type === activeFilter;
}

function matchesSearch(item, query) {
  if (!query) return true;

  const searchable = [
    item.title,
    item.category,
    item.type,
    item.description,
    item.tags.join(" ")
  ].join(" ").toLowerCase();

  return searchable.includes(query.toLowerCase());
}

function renderGrid() {
  const query = searchInput.value.trim();

  const filteredItems = softwareItems.filter(item => {
    return matchesFilter(item) && matchesSearch(item, query);
  });

  grid.innerHTML = filteredItems.map(createCard).join("");
  resultCount.textContent = `${filteredItems.length} vignette${filteredItems.length === 1 ? "" : "s"}`;
  emptyState.style.display = filteredItems.length === 0 ? "block" : "none";
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button");

  if (!button) return;

  activeFilter = button.dataset.filter;

  document.querySelectorAll(".filter-button").forEach(filterButton => {
    filterButton.classList.toggle("active", filterButton === button);
  });

  renderGrid();
});

searchInput.addEventListener("input", renderGrid);

renderGrid();
