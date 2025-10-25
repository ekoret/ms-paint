import { Brush } from "./Brush";
import { DOMHelper } from "./DOMHelper";
import { Tooltip } from "./Tooltip";

export class App {
  private brushCanvas: HTMLCanvasElement;
  private brushContext: CanvasRenderingContext2D;

  private brush: Brush | null = null;
  private tooltip: Tooltip | null = null;
  private showToolTip: boolean = true;
  private mouse = {
    x: 0,
    y: 0,
  };

  constructor(brushSelector: string) {
    this.brushCanvas = this.getCanvas(brushSelector);
    this.brushContext = this.getContext(this.brushCanvas);

    this.resize();
    this.bindEvents();
  }

  private bindEvents() {
    window.addEventListener("resize", () => this.resize());

    this.brushCanvas.addEventListener("mouseenter", (event) =>
      this.onEnter(event)
    );

    this.brushCanvas.addEventListener("mouseleave", () => this.onLeave());

    this.brushCanvas.addEventListener("mousemove", (event) =>
      this.onMove(event)
    );
  }

  public animate = () => {
    this.brushContext.clearRect(
      0,
      0,
      this.brushCanvas.width,
      this.brushCanvas.height
    );

    this.brush?.update(this.mouse.x, this.mouse.y);
    this.brush?.draw();

    requestAnimationFrame(this.animate);
  };

  private onMove(event: MouseEvent) {
    const { x, y } = event;
    this.mouse.x = x;
    this.mouse.y = y;

    this.tooltip?.update(x, y);
  }

  private onLeave() {
    console.log("Brush Unequipped");
    this.brush = null;
    Tooltip.removeAll();
  }

  private onEnter(event: MouseEvent) {
    console.log("Brush Equipped");
    const { x, y } = event;

    this.brush = new Brush(this.brushContext, { x, y, size: 50 });

    if (this.showToolTip) {
      this.tooltip = new Tooltip(x, y);
      this.tooltip?.attach();
    }
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.brushCanvas.width = width;
    this.brushCanvas.height = height;
  }

  private getContext(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error(`Missing context for: ${canvas}`);
    return context;
  }

  private getCanvas(selector: string) {
    const el = DOMHelper.getEl<HTMLCanvasElement>(selector);
    if (!el) throw new Error(`Missing canvas: ${selector}`);
    return el;
  }
}
