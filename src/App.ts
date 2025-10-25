import { Brush } from "./Brush";
import { DOMHelper } from "./DOMHelper";
import { Tooltip } from "./Tooltip";

export class App {
  private brushCanvas: HTMLCanvasElement;
  private brushContext: CanvasRenderingContext2D;

  private brushSizeSlider: HTMLInputElement;

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

    this.brushSizeSlider = DOMHelper.getEl<HTMLInputElement>("#brush-size");

    this.resize();
    this.bindEvents();
  }

  private bindEvents() {
    // Reshape the canvas when window resizes
    window.addEventListener("resize", () => this.resize());

    // Create the brush and tool ti[]
    this.brushCanvas.addEventListener("mouseenter", (event) =>
      this.onEnter(event)
    );

    // Removes brush when leaving canvas
    this.brushCanvas.addEventListener("mouseleave", () => this.onLeave());

    // Update tooltip and mouse coordinates
    this.brushCanvas.addEventListener("mousemove", (event) =>
      this.onMove(event)
    );

    // Handles changing size of brush
    this.brushSizeSlider.addEventListener("change", (event) =>
      this.onBrushSizeChange(event)
    );
  }

  private onBrushSizeChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    if (this.brush) {
      this.brush.size = Number(value);
    }
  };

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

    this.brush = new Brush(this.brushContext, {
      x,
      y,
      size: Number(this.brushSizeSlider.value),
    });

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
