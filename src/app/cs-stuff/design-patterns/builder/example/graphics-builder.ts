import type Point from './point';

export default interface GraphicsBuilder {
  reset(): void;
  setSize(width: number, height: number): void;
  addCircle(center: Point, radius: number, color: string): void;
  addRectangle(
    point: Point,
    width: number,
    height: number,
    color: string
  ): void;
  addTriangle(center: Point, length: number, color: string): void;
  getElement(): Element;
}
