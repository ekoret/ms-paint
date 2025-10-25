import { Brush } from "./Brush";
import "./style.css";
import { Tooltip } from "./Tooltip";

// Init
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let mouseToolTipEnabled = true;
let brush: Brush | null;
let mouseToolTip: Tooltip | null = null;
let mousePos = {
  x: 0,
  y: 0,
};

const brushCanvas: HTMLCanvasElement | null =
  document.querySelector("#brush-canvas");

if (!brushCanvas) throw new Error("Missing brush canvas");

// Brush Canvas Settings
brushCanvas.width = WIDTH;
brushCanvas.height = HEIGHT;

const brushCtx = brushCanvas.getContext("2d");

if (!brushCtx) throw new Error("Missing brush context");

// Equipping and unequipping brush
brushCanvas.addEventListener("mouseenter", (event) => {
  const { x, y } = event;
  console.log("Brush Equipped");
  brush = new Brush(brushCtx, { x, y, size: 50 });

  if (mouseToolTipEnabled) {
    mouseToolTip = new Tooltip(x, y);
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

const animateBrush = () => {
  brushCtx.clearRect(0, 0, brushCanvas.width, brushCanvas.height);

  brush?.update(mousePos.x, mousePos.y);
  brush?.draw();

  requestAnimationFrame(animateBrush);
};

animateBrush();
