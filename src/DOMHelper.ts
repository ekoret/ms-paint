export class DOMHelper {
  public static getEl<T extends Element = Element>(selector: string): T {
    const el = document.querySelector(selector) as T | null;
    if (!el) throw new Error(`Could not get element: ${selector}`);
    return el;
  }

  public static createSwatch(color: string) {
    const swatch = document.createElement("div");
    swatch.classList.add("swatch");
    swatch.style.backgroundColor = color;
    return swatch;
  }
}
