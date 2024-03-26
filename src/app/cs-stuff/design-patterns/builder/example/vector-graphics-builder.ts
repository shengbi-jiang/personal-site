import type GraphicsBuilder from './graphics-builder';
import Point from './point';

export default class VectorGraphicsBuilder implements GraphicsBuilder {
  private readonly svgURI = 'http://www.w3.org/2000/svg';
  private svg = this.createSvg();

  private createSvg() {
    const svg = document.createElementNS(this.svgURI, 'svg');
    svg.style.minHeight = '0';
    svg.style.border = '1px solid black';
    return svg;
  }

  public reset(): void {
    this.svg = this.createSvg();
  }

  public setSize(width: number, height: number): void {
    this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  }

  public addCircle(center: Point, radius: number, color: string): void {
    const circle = document.createElementNS(this.svgURI, 'circle');
    circle.setAttribute('cx', center.x.toString());
    circle.setAttribute('cy', center.y.toString());
    circle.setAttribute('r', radius.toString());
    circle.setAttribute('fill', color);
    this.svg.appendChild(circle);
  }

  public addRectangle(
    point: Point,
    width: number,
    height: number,
    color: string
  ): void {
    const rect = document.createElementNS(this.svgURI, 'rect');
    rect.setAttribute('x', point.x.toString());
    rect.setAttribute('y', point.y.toString());
    rect.setAttribute('width', width.toString());
    rect.setAttribute('height', height.toString());
    rect.setAttribute('fill', color);
    this.svg.appendChild(rect);
  }

  public addTriangle(center: Point, length: number, color: string): void {
    const factor = Math.sqrt(3) / 4;
    const pointA = new Point(center.x, center.y - length * factor);
    const pointB = new Point(center.x - length / 2, center.y + length * factor);
    const pointC = new Point(center.x + length / 2, center.y + length * factor);
    const polygon = document.createElementNS(this.svgURI, 'polygon');
    polygon.setAttribute(
      'points',
      `${pointA.x}, ${pointA.y} ${pointB.x}, ${pointB.y} ${pointC.x}, ${pointC.y}`
    );
    polygon.setAttribute('fill', color);
    this.svg.appendChild(polygon);
  }

  public getElement(): Element {
    return this.svg;
  }
}
