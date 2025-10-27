import { App } from "./App";
import "./style.css";
import "./custom.scss";

const BRUSH_SELECTOR = "#brush-canvas";
const DRAW_SELECTOR = "#draw-canvas";

const app = new App(BRUSH_SELECTOR, DRAW_SELECTOR);

app.animate();
app.animateDraw();
