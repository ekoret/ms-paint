import { Brush } from "./Brush";
import { DOMHelper } from "./DOMHelper";
import { Tooltip } from "./Tooltip";

export class App {
  private brushCanvas: HTMLCanvasElement;
  private brushContext: CanvasRenderingContext2D;

  private drawCanvas: HTMLCanvasElement;
  private drawContext: CanvasRenderingContext2D;

  private brushSizeSlider: HTMLInputElement;
  private hideTooltipButton: HTMLButtonElement;

  private canvasWrapper: HTMLDivElement;

  private brush: Brush | null = null;
  private tooltip: Tooltip | null = null;
  private showTooltip: boolean = true;
  private mouse = {
    x: 0,
    y: 0,
  };

  constructor(brushSelector: string, drawSelector: string) {
    this.brushCanvas = this.getCanvas(brushSelector);
    this.brushContext = this.getContext(this.brushCanvas);

    this.drawCanvas = this.getCanvas(drawSelector);
    this.drawContext = this.getContext(this.drawCanvas);

    this.canvasWrapper = DOMHelper.getEl<HTMLDivElement>(".canvas-wrapper");

    this.brushSizeSlider = DOMHelper.getEl<HTMLInputElement>("#brush-size");
    this.hideTooltipButton =
      DOMHelper.getEl<HTMLButtonElement>("#toggle-tooltip");

    this.resize();
    this.bindEvents();
  }

  private bindEvents() {
    // Reshape the canvas when window resizes
    window.addEventListener("resize", () => this.resize());

    // Create the brush and tool tip
    this.canvasWrapper.addEventListener("mouseenter", (event) =>
      this.onEnter(event)
    );

    // Removes brush when leaving canvas
    this.canvasWrapper.addEventListener("mouseleave", () => this.onLeave());

    // Update tooltip and mouse coordinates
    this.canvasWrapper.addEventListener("mousemove", (event) =>
      this.onMove(event)
    );

    // Handles changing size of brush
    this.brushSizeSlider.addEventListener("change", (event) =>
      this.onBrushSizeChange(event)
    );

    this.hideTooltipButton.addEventListener("click", () =>
      this.toggleTooltip()
    );

    // Handle changing brush state when holding
    this.canvasWrapper.addEventListener("mousedown", () => {
      this.brush?.setIsPressed(true);
    });
    this.canvasWrapper.addEventListener("mouseup", () => {
      this.brush?.setIsPressed(false);
    });
  }

  private toggleTooltip = () => {
    this.showTooltip = !this.showTooltip;
    this.hideTooltipButton.textContent = `${
      this.showTooltip ? "Hide" : "Show"
    } Tooltip`;
  };

  private onBrushSizeChange = (event: Event) => {
    const { value } = event.target as HTMLInputElement;
    if (this.brush) {
      this.brush.size = Number(value);
    }
  };

  public animate = () => {
    this.clearCanvas(this.brushContext);

    this.brush?.update(this.mouse.x, this.mouse.y);
    this.brush?.draw();

    requestAnimationFrame(this.animate);
  };

  public animateDraw = () => {
    if (this.brush?.isPressed) {
      this.drawContext.beginPath();
      this.drawContext.arc(
        this.brush!.x,
        this.brush!.y,
        this.brush!.size,
        0,
        Math.PI * 2
      );
      this.drawContext.closePath();
      this.drawContext.fillStyle = this.brush!.color;
      this.drawContext.fill();
    }
    requestAnimationFrame(this.animateDraw);
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

    /**
     * TODO: bug
     * keep mouse in canvas, refresh page,
     * dont move mouse.
     * the brush spawns at 0,0, when it should
     * be where the mouse is.
     */
    this.brush = new Brush(this.brushContext, {
      x,
      y,
      size: Number(this.brushSizeSlider.value),
    });

    if (this.showTooltip) {
      this.tooltip = new Tooltip(x, y, this.brush);
      this.tooltip?.attach();
    }
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.brushCanvas.width = width;
    this.brushCanvas.height = height;

    this.drawCanvas.width = width;
    this.drawCanvas.height = height;
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

  private clearCanvas(context: CanvasRenderingContext2D) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
}
