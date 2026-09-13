/* ==========================================================================
   Simon Fang Portfolio — Shared interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNavigation();
  setupProjectFilters();
  setupProjectDialog();
  setupHeroWaveform();
});

/* Mobile navigation
   ========================================================================== */

function setupMobileNavigation() {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#nav");

  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

/* Portfolio filters
   ========================================================================== */

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter");
  const projects = document.querySelectorAll(".project");

  if (!filterButtons.length || !projects.length) return;

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach(item => {
        const isSelected = item === button;

        item.classList.toggle("active", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });

      projects.forEach(project => {
        const categories = (project.dataset.category || "").split(" ");

        const shouldShow =
          selectedFilter === "all" ||
          categories.includes(selectedFilter);

        project.classList.toggle("hidden", !shouldShow);
      });
    });
  });
}

/* Project case-study dialog
   ========================================================================== */

function setupProjectDialog() {
  const dialog = document.querySelector("#project-dialog");
  const projects = document.querySelectorAll(".project");

  if (!dialog || !projects.length) return;

  const closeButton = dialog.querySelector(".dialog-close");
  const dialogType = dialog.querySelector(".dialog-type");
  const dialogTitle = dialog.querySelector("#dialog-title");
  const dialogBody = dialog.querySelector(".dialog-body");

  function openProject(project) {
    dialogType.textContent =
      project.querySelector(".project-type")?.textContent || "";

    dialogTitle.textContent =
      project.querySelector("h3")?.textContent || "";

    dialogBody.innerHTML =
      project.querySelector(".project-detail")?.innerHTML || "";

    dialog.showModal();
  }

  projects.forEach(project => {
    project.addEventListener("click", () => {
      openProject(project);
    });

    project.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(project);
      }
    });
  });

  closeButton?.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", event => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

/* Interactive hero waveform
   ========================================================================== */

function setupHeroWaveform() {
  const canvas = document.querySelector("#waveform");

  if (!canvas) return;

  const context = canvas.getContext("2d");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let pointerPosition = 0.5;
  let animationTime = 0;

  function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;

    context.setTransform(
      pixelRatio,
      0,
      0,
      pixelRatio,
      0,
      0
    );
  }

  function drawWaveform() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    context.clearRect(0, 0, width, height);

    context.strokeStyle = "rgba(200, 255, 86, 0.55)";
    context.lineWidth = 1.2;

    for (let layer = 0; layer < 4; layer += 1) {
      context.beginPath();

      for (let x = 0; x <= width; x += 5) {
        const envelope = Math.sin((Math.PI * x) / width);

        const firstWave =
          Math.sin(
            x * 0.017 +
            animationTime +
            layer * 1.7
          ) *
          18 *
          envelope;

        const secondWave =
          Math.sin(
            x * 0.004 -
            animationTime * 0.6
          ) *
          55 *
          envelope *
          (0.3 + pointerPosition * 0.7);

        const y =
          height * (0.49 + layer * 0.035) +
          firstWave +
          secondWave;

        if (x === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.stroke();
    }

    animationTime += 0.018;
    window.requestAnimationFrame(drawWaveform);
  }

  window.addEventListener("resize", resizeCanvas);

  window.addEventListener(
    "pointermove",
    event => {
      pointerPosition =
        event.clientY / window.innerHeight;
    },
    { passive: true }
  );

  resizeCanvas();

  if (!prefersReducedMotion.matches) {
    drawWaveform();
  }
}