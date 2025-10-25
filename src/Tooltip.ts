import type { Brush } from "./Brush";

export class Tooltip {
  public x: number;
  public y: number;
  public element: HTMLDivElement;
  public brush: Brush;

  constructor(x: number, y: number, brush: Brush) {
    this.x = x;
    this.y = y;
    this.brush = brush;

    this.element = this.createMousePosToolTip();
  }

  createMousePosToolTip() {
    const tooltip = document.createElement("div");
    tooltip.classList.add("tooltip");
    tooltip.style.position = "absolute";
    tooltip.style.border = "1px solid white";
    tooltip.style.padding = "0.25rem 0.3rem";
    tooltip.style.borderRadius = "8px";
    tooltip.style.top = `${this.x}px`;
    tooltip.style.left = `${this.x + 25 + this.brush.size}px`;
    tooltip.textContent = `x:${this.x}, y:${this.y}, brush_size: ${this.brush.size}`;

    return tooltip;
  }

  public update(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x + this.brush.size}px`;
    this.element.innerHTML = `x:${this.x}, y:${this.y}<br>brush_size: ${this.brush.size}`;
  }

  public attach(parent: HTMLElement = document.body) {
    parent.prepend(this.element);
  }

  public static removeAll() {
    document.querySelectorAll(".tooltip").forEach((el) => el.remove());
  }
}
