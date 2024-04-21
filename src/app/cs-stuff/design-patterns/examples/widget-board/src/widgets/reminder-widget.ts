import Point from '../point';
import Rect from '../rect';
import Widget from './widget';

export default class ReminderWidget extends Widget {
  public static readonly size = new Rect(2, 1);

  private readonly spanName = document.createElement('span');
  private readonly taContent = document.createElement('textarea');

  public constructor(position?: Point) {
    super(ReminderWidget.size, position);
    this.spanName.textContent = 'Reminder';
    this.setContent(this.spanName, this.taContent);
    this.style();
  }

  protected style() {
    super.style();
    this.rootElement.style.display = 'flex';
    this.rootElement.style.justifyContent = 'center';
    this.rootElement.style.alignItems = 'flex-start';
    this.rootElement.style.flexDirection = 'column';
    this.spanName.style.fontSize = '0.75rem';
    this.spanName.style.padding = '2px 0 2px 4px';
    this.taContent.style.width = '100%';
    this.taContent.style.background = 'rgb(255, 220, 173)';
    this.taContent.style.border = '1px solid rgb(255, 210, 150)';
    this.taContent.style.borderRadius = '0 0 4px 4px';
    this.taContent.style.padding = '2px 4px';
    this.taContent.style.flexGrow = '1';
    this.taContent.style.resize = 'none';
    this.taContent.style.outline = 'none';
  }

  public clone(): ReminderWidget {
    const cloned = new ReminderWidget();
    cloned.taContent.value = this.taContent.value;
    return cloned;
  }
}
