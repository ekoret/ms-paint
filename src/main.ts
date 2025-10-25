import { DOMHelper } from "./DOMHelper";
import "./style.css";

const dom = new DOMHelper();

const drawCanvas = dom.getEl<HTMLCanvasElement>("#draw-canvas");
if (!drawCanvas) throw new Error("Missing draw canvas");

const drawCtx = drawCanvas.getContext("2d");
if (!drawCtx) throw new Error("Missing draw context");

drawCanvas.width = window.innerWidth;
drawCanvas.height = window.innerHeight;

drawCanvas.addEventListener("resize", () => {
  drawCanvas.width = window.innerWidth;
  drawCanvas.height = window.innerHeight;
});

const animate = () => {
  // Background
  drawCtx.fillStyle = "#111";
  drawCtx.fillRect(0, 0, drawCanvas.width, drawCanvas.height);

  requestAnimationFrame(animate);
};

animate();
