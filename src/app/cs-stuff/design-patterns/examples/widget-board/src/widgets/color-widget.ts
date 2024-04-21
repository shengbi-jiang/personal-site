import Point from '../point';
import Rect from '../rect';
import Widget from './widget';

export default class ColorWidget extends Widget {
  public static readonly size = new Rect(1, 1);

  private readonly lblBlock = document.createElement('label');
  private readonly iptColor = document.createElement('input');
  private readonly spanText = document.createElement('span');

  public constructor(position?: Point) {
    super(ColorWidget.size, position);
    this.iptColor.type = 'color';
    this.iptColor.addEventListener('change', this.handleColorChange);
    this.spanText.textContent = '> pick a color <';
    this.lblBlock.append(this.iptColor, this.spanText);
    this.setContent(this.lblBlock);
    this.style();
  }

  public style() {
    super.style();
    this.lblBlock.style.display = 'flex';
    this.lblBlock.style.position = 'relative';
    this.lblBlock.style.width = '100%';
    this.lblBlock.style.height = '100%';
    this.lblBlock.style.background = 'white';
    this.lblBlock.style.borderRadius = '4px';
    this.lblBlock.style.justifyContent = 'center';
    this.lblBlock.style.alignItems = 'center';
    this.lblBlock.style.cursor = 'pointer';
    this.iptColor.style.display = 'none';
    this.spanText.style.fontSize = '0.75rem';
  }

  private handleColorChange = () => {
    this.lblBlock.style.background = this.iptColor.value;
    this.spanText.textContent = '';
  };

  public cleanUp(): void {
    this.iptColor.removeEventListener('change', this.handleColorChange);
  }

  public clone(): ColorWidget {
    const cloned = new ColorWidget();
    cloned.lblBlock.style.backgroundColor = this.lblBlock.style.backgroundColor;
    cloned.spanText.textContent = this.spanText.textContent;
    return cloned;
  }
}
