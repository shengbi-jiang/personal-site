import Point from '../point';
import Rect from '../rect';
import Widget from './widget';

export default class StopwatchWidget extends Widget {
  public static readonly size = new Rect(2, 1);
  private readonly textTime = document.createElement('p');
  private readonly divButtonGroup = document.createElement('div');
  private readonly btnPrimary = document.createElement('button');
  private readonly btnSecondary = document.createElement('button');
  private isRunning = false;
  private milliseconds = 0;

  public constructor(position?: Point) {
    super(StopwatchWidget.size, position);
    super.style();

    this.divButtonGroup.append(this.btnPrimary, this.btnSecondary);
    this.divButtonGroup.style.display = 'flex';
    this.divButtonGroup.style.gap = '4px';

    this.setContent(this.textTime, this.divButtonGroup);
    this.rootElement.style.display = 'flex';
    this.rootElement.style.flexDirection = 'column';
    this.rootElement.style.justifyContent = 'center';
    this.rootElement.style.alignItems = 'center';

    this.btnPrimary.addEventListener('click', this.startOrPause);
    this.btnSecondary.addEventListener('click', this.reset);
    this.reset();
  }

  private startOrPause = () => {
    if (this.isRunning) {
      this.isRunning = false;
      this.btnPrimary.textContent = 'Start';
      return;
    }
    this.isRunning = true;
    this.btnPrimary.textContent = 'Pause';
  };

  private reset = () => {
    this.isRunning = false;
    this.milliseconds = 0;
    this.textTime.textContent = '0h 00m 00s 000';
    this.btnPrimary.textContent = 'Start';
    this.btnSecondary.textContent = 'Reset';
  };

  private pad(wholeNumber: number, size: number): string {
    let result = wholeNumber.toString();
    while (result.length < size) {
      result = '0' + result;
    }
    return result;
  }

  public elapse = (elapsed: number) => {
    if (!this.isRunning) {
      return;
    }
    this.milliseconds += elapsed;
    const milliseconds = this.pad(this.milliseconds % 1000, 3);
    const seconds = this.pad(Math.floor(this.milliseconds / 1000) % 60, 2);
    const minutes = this.pad(Math.floor(this.milliseconds / 60_000) % 60, 2);
    const hours = Math.floor(this.milliseconds / 3_600_000);
    this.textTime.textContent = `${hours}h ${minutes}m ${seconds}s ${milliseconds}`;
  };

  public cleanUp(): void {
    this.btnPrimary.removeEventListener('click', this.startOrPause);
    this.btnSecondary.removeEventListener('click', this.reset);
  }

  public clone(): StopwatchWidget {
    const cloned = new StopwatchWidget(this._position);
    cloned.isRunning = this.isRunning;
    cloned.milliseconds = this.milliseconds;
    cloned.btnPrimary.textContent = this.isRunning ? 'Pause' : 'Start';
    return cloned;
  }
}
