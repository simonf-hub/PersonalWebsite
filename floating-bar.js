(() => {
  const style = document.createElement("style");

  style.textContent = `
    .floating-rail {
      position: fixed;
      right: 0;
      top: 50%;
      z-index: 18;
      display: flex;
      align-items: center;
      transform: translateY(-50%) translateX(calc(100% - 48px));
      transition: transform 0.32s cubic-bezier(.2, .8, .2, 1);
    }

    .floating-rail.is-open {
      transform: translateY(-50%) translateX(0);
    }

    .rail-toggle {
      width: 48px;
      height: 58px;
      border: 1px solid rgba(238, 240, 233, 0.22);
      border-right: 0;
      background: #c8ff56;
      color: #090b10;
      cursor: pointer;
      font: 600 1.25rem "DM Mono", monospace;
      display: grid;
      place-items: center;
    }

    .rail-toggle:hover,
    .rail-toggle:focus-visible {
      background: #eef0e9;
      outline: none;
    }

    .rail-toggle span {
      display: block;
      transition: transform 0.32s;
    }

    .floating-rail.is-open .rail-toggle span {
      transform: rotate(180deg);
    }

    .rail-panel {
      min-width: 40px;
      padding: 10px;
      background: rgba(9, 11, 16, 0.94);
      border: 1px solid rgba(238, 240, 233, 0.22);
      backdrop-filter: blur(18px);
    }

    .rail-label {
      margin: 4px 8px 10px;
      color: #777;
      font: 10px "DM Mono", monospace;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .rail-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 11px 9px;
      color: #eef0e9;
      text-decoration: none;
      font: 11px "DM Mono", monospace;
      text-transform: uppercase;
      transition: color 0.2s, background 0.2s;
    }

    .rail-link:hover,
    .rail-link:focus-visible {
      color: #c8ff56;
      background: rgba(255, 255, 255, 0.06);
      outline: none;
    }

    .rail-icon {
      width: 27px;
      height: 27px;
      display: grid;
      place-items: center;
      border: 1px solid rgba(238, 240, 233, 0.24);
      font-size: 9px;
    }

    @media (max-width: 760px) {
      .floating-rail {
        top: auto;
        bottom: 24px;
        transform: translateX(calc(100% - 44px));
      }

      .floating-rail.is-open {
        transform: translateX(0);
      }

      .rail-toggle {
        width: 44px;
        height: 52px;
      }

      .rail-panel {
        min-width: 165px;
      }
    }
  `;

  document.head.appendChild(style);

  const rail = document.createElement("aside");

  rail.className = "floating-rail";
  rail.setAttribute("aria-label", "Social links");

  rail.innerHTML = `
    <button
      class="rail-toggle"
      type="button"
      aria-expanded="false"
      aria-label="Open social links"
    >
      <span>←</span>
    </button>

    <div class="rail-panel">
      <p class="rail-label">Find me online</p>
      <a
        class="rail-link"
        href="https://www.linkedin.com/in/siheng7fang"
        target="_blank"
        rel="noreferrer"
      >
        <i class="fa-brands fa-linkedin"></i>
        LinkedIn
      </a>

      <a
        class="rail-link"
        href="https://www.instagram.com/simon7fang/"
        target="_blank"
        rel="noreferrer"
      >
        <i class="fa-brands fa-instagram"></i>
        Instagram
      </a>

      <a
        class="rail-link"
        href="https://open.spotify.com/artist/73ZlMeb2YOVsfy6nCmjIn3"
        target="_blank"
        rel="noreferrer"
      >
        <i class="fa-brands fa-spotify"></i>
        Spotify
      </a>

       <a
        class="rail-link"
        href="https://music.apple.com/ca/artist/simoni%E8%8E%AB%E5%B0%BC/1704818552"
        target="_blank"
        rel="noreferrer"
      >
        <i class="fa-solid fa-music"></i>
        Apple Music
      </a>

      <a
        class="rail-link"
        href="https://youtube.com/playlist?list=OLAK5uy_kDOIX_6NCLoGuz0YLyv54Z_WVKFf-YEEA&si=j8MP61WNu4O-9Orn"
        target="_blank"
        rel="noreferrer"
      >
        <i class="fa-brands fa-youtube"></i>
        YouTube
      </a>

    
    </div>
  `;

  document.body.appendChild(rail);

  const toggle = rail.querySelector(".rail-toggle");

  function setOpen(open) {
    rail.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute(
      "aria-label",
      open ? "Close social links" : "Open social links"
    );
  }

  toggle.addEventListener("click", () => {
    setOpen(!rail.classList.contains("is-open"));
  });

  document.addEventListener("click", event => {
    if (!rail.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      setOpen(false);
      toggle.focus();
    }
  });
})();