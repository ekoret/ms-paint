import { Brush } from "./Brush";
import "./style.css";
import { Tooltip } from "./Tooltip";

// Init
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let mouseToolTipEnabled = true;
let brush;
const mousePos = {
  x: 0,
  y: 0,
};
let mouseToolTip: Tooltip | null = null;

const brushCanvas: HTMLCanvasElement | null =
  document.querySelector("#brush-canvas");

if (!brushCanvas) throw new Error("Missing brush canvas");

// Brush Canvas Settings
brushCanvas.width = WIDTH;
brushCanvas.height = HEIGHT;

const brushCtx = brushCanvas.getContext("2d");

if (!brushCtx) throw new Error("Missing brush context");

// Equipping and unequipping brush
brushCanvas.addEventListener("mouseenter", () => {
  console.log("Brush Equipped");
  brush = new Brush({ ...mousePos, size: 50 });

  if (mouseToolTipEnabled) {
    mouseToolTip = new Tooltip(mousePos.x, mousePos.y);
    mouseToolTip.attach(document.body);
  }
});
brushCanvas.addEventListener("mouseleave", () => {
  console.log("Brush Unequipped");
  brush = null;

  Tooltip.removeAll();
});

brushCanvas.addEventListener("mousemove", (event) => {
  const { x, y } = event;
  mousePos.x = x;
  mousePos.y = y;

  mouseToolTip?.update(x, y);
});

const animate = () => {
  requestAnimationFrame(animate);
};

animate();
