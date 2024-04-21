import type Cloneable from './cloneable';

export default class Point implements Cloneable<Point> {
  public constructor(public x: number, public y: number) {}

  public clone(): Point {
    return new Point(this.x, this.y);
  }
}
