interface BrushSettings {
  x: number;
  y: number;
  size: number;
}

export class Brush {
  public ctx: CanvasRenderingContext2D;
  public x: number;
  public y: number;
  public size: number;

  constructor(ctx: CanvasRenderingContext2D, settings: BrushSettings) {
    this.ctx = ctx;
    this.x = settings.x;
    this.y = settings.y;
    this.size = settings.size;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = "white";
    this.ctx.fill();
  }

  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
