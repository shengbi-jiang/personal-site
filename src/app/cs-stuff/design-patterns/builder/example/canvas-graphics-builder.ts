import type GraphicsBuilder from './graphics-builder';
import Point from './point';

export default class CanvasGraphicsBuilder implements GraphicsBuilder {
  private canvas = document.createElement('canvas');
  private context = this.canvas.getContext('2d')!;

  public constructor() {
    this.setStyle();
  }

  private setStyle() {
    this.canvas.style.border = '1px solid black';
    this.canvas.style.objectFit = 'contain';
    this.canvas.style.objectPosition = 'top left';
  }

  public reset(): void {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;
    this.setStyle();
  }

  public setSize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  public addCircle(center: Point, radius: number, color: string): void {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.context.fill();
  }

  public addRectangle(
    point: Point,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.fillStyle = color;
    this.context.fillRect(point.x, point.y, width, height);
  }

  public addTriangle(center: Point, length: number, color: string): void {
    const factor = Math.sqrt(3) / 4;
    const pointA = new Point(center.x, center.y - length * factor);
    const pointB = new Point(center.x - length / 2, center.y + length * factor);
    const pointC = new Point(center.x + length / 2, center.y + length * factor);
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.moveTo(pointA.x, pointA.y);
    this.context.lineTo(pointB.x, pointB.y);
    this.context.lineTo(pointC.x, pointC.y);
    this.context.closePath();
    this.context.fill();
  }

  public getElement(): Element {
    return this.canvas;
  }
}
