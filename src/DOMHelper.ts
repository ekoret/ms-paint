export class DOMHelper {
  public static getEl<T extends Element = Element>(
    identifier: string
  ): T | null {
    return document.querySelector(identifier) as T | null;
  }
}
