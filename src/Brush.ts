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
  public isPressed: boolean;
  public color: string = "white";

  constructor(ctx: CanvasRenderingContext2D, settings: BrushSettings) {
    this.ctx = ctx;
    this.x = settings.x;
    this.y = settings.y;
    this.size = settings.size;
    this.isPressed = false;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setIsPressed(isPressed: boolean) {
    console.log(isPressed ? "Brush is drawing" : "Brush stopped drawing");
    this.isPressed = isPressed;
  }
}
