const softwareItems = [
  {
    title: "Echo Training Simulator",
    category: "Imaging",
    type: "Unity WebGL",
    description: "Interactive echocardiography training environment for learning cardiac views, anatomy, and spatial orientation.",
    link: "projects/echo-training-simulator/index.html",
    tags: ["Imaging", "Training", "XR"]
  },
  {
    title: "Cardiac Anatomy Explorer",
    category: "Anatomy",
    type: "3D Education",
    description: "A real-time 3D anatomy module for exploring cardiac chambers, valves, vessels, and structural relationships.",
    link: "projects/cardiac-anatomy-explorer/index.html",
    tags: ["Anatomy", "Training", "XR"]
  },
  {
    title: "Electrophysiology Mapping Demo",
    category: "Simulation",
    type: "EP Module",
    description: "Visualizes cardiac activation, conduction pathways, propagation timing, and ECG relationships in 3D.",
    link: "projects/electrophysiology-mapping-demo/index.html",
    tags: ["Simulation", "Training"]
  },
  {
    title: "Procedure Planning Viewer",
    category: "Procedure",
    type: "Planning",
    description: "Prototype viewer for reviewing patient-specific anatomy, device positioning concepts, and procedural workflows.",
    link: "projects/procedure-planning-viewer/index.html",
    tags: ["Procedure", "Simulation", "XR"]
  },
  {
    title: "TEE View Trainer",
    category: "Imaging",
    type: "TEE",
    description: "Browser-based transesophageal echo view training with interactive probe movement and anatomical correlation.",
    link: "projects/tee-view-trainer/index.html",
    tags: ["Imaging", "Training"]
  },
  {
    title: "TTE Probe Positioning Lab",
    category: "Imaging",
    type: "TTE",
    description: "Training tool for transthoracic probe placement, view acquisition, and spatial understanding of cardiac windows.",
    link: "projects/tte-probe-positioning-lab/index.html",
    tags: ["Imaging", "Training"]
  },
  {
    title: "Intracardiac Echo Orientation",
    category: "Imaging",
    type: "ICE",
    description: "Interactive intracardiac echo orientation module for procedural education and internal cardiac navigation.",
    link: "projects/intracardiac-echo-orientation/index.html",
    tags: ["Imaging", "Procedure", "Training"]
  },
  {
    title: "Hemodynamics Visualization Lab",
    category: "Simulation",
    type: "Physiology",
    description: "Visualizes pressure, volume, flow, valve timing, and cardiac cycle mechanics in a synchronized 3D environment.",
    link: "projects/hemodynamics-visualization-lab/index.html",
    tags: ["Simulation", "Anatomy", "Training"]
  },
  {
    title: "Surgical Anatomy Review",
    category: "Anatomy",
    type: "Review",
    description: "A structured anatomy review experience for exploring clinically relevant landmarks and spatial relationships.",
    link: "projects/surgical-anatomy-review/index.html",
    tags: ["Anatomy", "Procedure", "Training"]
  },
  {
    title: "Immersive Skills Scenario",
    category: "XR",
    type: "Scenario",
    description: "Prototype immersive learning scenario for step-based clinical skill rehearsal and guided software interaction.",
    link: "projects/immersive-skills-scenario/index.html",
    tags: ["XR", "Simulation", "Training"]
  },
  {
    title: "Device Education Viewer",
    category: "Procedure",
    type: "Device Training",
    description: "Interactive device education module for understanding deployment concepts, anatomy, and procedural context.",
    link: "projects/device-education-viewer/index.html",
    tags: ["Procedure", "Training", "Simulation"]
  },
  {
    title: "Emergency Response Simulation",
    category: "Simulation",
    type: "Scenario",
    description: "A simulation-focused WebGL module for practicing clinical decision-making in guided emergency scenarios.",
    link: "projects/emergency-response-simulation/index.html",
    tags: ["Simulation", "Training", "XR"]
  }
];

const grid = document.getElementById("softwareGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");

let activeFilter = "all";

function createCard(item, index) {
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
        <div class="play-pill">Launch WebGL</div>
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

  resultCount.textContent = `${filteredItems.length} application${filteredItems.length === 1 ? "" : "s"}`;

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