import Cloneable from './cloneable';

export default class Rect implements Cloneable<Rect> {
  public constructor(public width: number, public height: number) {}

  public clone(): Rect {
    return new Rect(this.width, this.height);
  }
}
