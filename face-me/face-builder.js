// ─────────────────────────────────────────────
//  Face Builder  —  400 × 520 canvas
//
//  File naming: assets/{slot}/01.png … 10.png
//  Slots: hair · eyes · mouth · outfit
// ─────────────────────────────────────────────

const canvas = document.getElementById("faceCanvas");
const ctx = canvas.getContext("2d");

const W = canvas.width; // 400
const H = canvas.height; // 520
const CX = W / 2; // 200

// ── Skin tones (code-drawn head base) ─────────
const SKIN_TONES = ["#f5c9a0", "#e8a87c", "#c68642", "#8d5524", "#f1c27d"];
let skinIdx = 0;
const skin = () => SKIN_TONES[skinIdx];

function shade(hex, amt) {
  const n = parseInt(hex.replace("#", ""), 16);
  const c = (v) => Math.min(255, Math.max(0, v + amt));
  return `rgb(${c(n >> 16)},${c((n >> 8) & 0xff)},${c(n & 0xff)})`;
}

// ── Build slot options from numbered PNGs ──────
function makeSlot(folder) {
  return Array.from({ length: 10 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    const img = new Image();
    img.src = `assets/${folder}/${n}.png`;
    return { label: n, _img: img };
  });
}

const SLOTS = {
  brows: makeSlot("brows"),
  eyes: makeSlot("eyes"),
  mouth: makeSlot("mouth"),
  nose: makeSlot("nose"),
};

const SLOT_KEYS = ["brows", "eyes", "nose", "mouth"];
const DRAW_ORDER = ["nose", "brows", "eyes", "mouth"];

// ── State ──────────────────────────────────────
const state = {
  selections: Object.fromEntries(SLOT_KEYS.map((k) => [k, 0])),
};

// ── Base head (code-drawn so skin tone stays adjustable) ──

// ── Render ─────────────────────────────────────
function render() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "#F0ECD8";
  ctx.fillRect(0, 0, W, H);
  for (const key of DRAW_ORDER) {
    const img = SLOTS[key][state.selections[key]]._img;
    if (img.complete && img.naturalWidth) ctx.drawImage(img, 0, 0, W, H);
  }
}

// ── Preload then render ────────────────────────
const allImages = SLOT_KEYS.flatMap((k) => SLOTS[k].map((o) => o._img));
let loaded = 0;

allImages.forEach((img) => {
  img.onload = () => {
    if (++loaded === allImages.length) render();
  };
  img.onerror = () => {
    loaded++;
  }; // skip missing files gracefully
});

// ── Events ─────────────────────────────────────
document.querySelectorAll(".arr").forEach((btn) => {
  btn.addEventListener("click", () => {
    const cat = btn.dataset.cat;
    const dir = parseInt(btn.dataset.dir);
    const len = SLOTS[cat].length;
    state.selections[cat] = (state.selections[cat] + dir + len) % len;
    render();
  });
});

document.getElementById("randomBtn").addEventListener("click", () => {
  SLOT_KEYS.forEach((k) => {
    state.selections[k] = Math.floor(Math.random() * SLOTS[k].length);
  });
  skinIdx = Math.floor(Math.random() * SKIN_TONES.length);
  render();
});

document.getElementById("saveBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "my-face.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

// Arrow keys: ← → cycle current slot, ↑ ↓ switch slot
let activeSlot = 0;
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    const cat = SLOT_KEYS[activeSlot];
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const len = SLOTS[cat].length;
    state.selections[cat] = (state.selections[cat] + dir + len) % len;
    render();
  }
  if (e.key === "ArrowUp") activeSlot = (activeSlot - 1 + 4) % 4;
  if (e.key === "ArrowDown") activeSlot = (activeSlot + 1) % 4;
  const n = parseInt(e.key);
  if (n >= 1 && n <= 4) activeSlot = n - 1;
});
