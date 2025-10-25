export class Tooltip {
  public x: number;
  public y: number;
  public element: HTMLDivElement;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;

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
    tooltip.style.left = `${this.x + 25}px`;
    tooltip.textContent = `x:${this.x}, y:${this.y}`;

    return tooltip;
  }

  public update(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x + 25}px`;
    this.element.textContent = `x: ${this.x}, y: ${this.y}`;
  }

  public attach(parent: HTMLElement = document.body) {
    parent.prepend(this.element);
  }

  public static removeAll() {
    document.querySelectorAll(".tooltip").forEach((el) => el.remove());
  }
}
