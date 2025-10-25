interface BrushSettings {
  x: number;
  y: number;
  size: number;
}

export class Brush {
  public x: number;
  public y: number;
  public size: number;

  constructor(settings: BrushSettings) {
    this.x = settings.x;
    this.y = settings.y;
    this.size = settings.size;
  }
}
