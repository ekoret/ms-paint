export class DOMHelper {
  public static getEl<T extends Element = Element>(selector: string): T {
    const el = document.querySelector(selector) as T | null;
    if (!el) throw new Error(`Could not get element: ${selector}`);
    return el;
  }
}
