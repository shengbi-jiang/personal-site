import Point from '../point';
import Rect from '../rect';
import Widget from './widget';

export default class ClockWidget extends Widget {
  public static readonly size = new Rect(2, 1);

  private readonly text = document.createElement('p');

  public constructor(position?: Point) {
    super(ClockWidget.size, position);
    this.setContent(this.text);
    this.style();
    this.elapse();
  }

  protected style() {
    super.style();
    this.rootElement.style.display = 'flex';
    this.rootElement.style.justifyContent = 'center';
    this.rootElement.style.alignItems = 'center';
    this.text.style.fontFamily = 'monospace';
  }

  public elapse = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    this.text.textContent = `${hours}:${minutes}:${seconds}`;
  };

  public clone(): ClockWidget {
    return new ClockWidget(this._position);
  }
}
