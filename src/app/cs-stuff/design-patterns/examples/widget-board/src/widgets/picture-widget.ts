import Point from '../point';
import Rect from '../rect';
import Widget from './widget';

export default class PictureWidget extends Widget {
  public static readonly size = new Rect(2, 2);

  private readonly lblGroup = document.createElement('label');
  private readonly iptOpen = document.createElement('input');
  private readonly spanHint = document.createElement('span');
  private readonly imgPicture = document.createElement('img');

  public constructor(position?: Point) {
    super(PictureWidget.size, position);
    this.spanHint.textContent = '> choose an image <';
    this.iptOpen.type = 'file';
    this.iptOpen.accept = '.png,.gif,.jpg,.jpeg';
    this.iptOpen.addEventListener('change', this.handleSelectFile);
    this.lblGroup.append(this.iptOpen, this.spanHint, this.imgPicture);
    this.setContent(this.lblGroup);
    this.style();
  }

  protected style() {
    super.style();
    this.lblGroup.style.display = 'flex';
    this.lblGroup.style.position = 'relative';
    this.lblGroup.style.width = '100%';
    this.lblGroup.style.height = '100%';
    this.lblGroup.style.justifyContent = 'center';
    this.lblGroup.style.alignItems = 'center';
    this.lblGroup.style.cursor = 'pointer';
    this.spanHint.style.display = 'flex';
    this.spanHint.style.position = 'absolute';
    this.spanHint.style.top = '0';
    this.spanHint.style.left = '0';
    this.spanHint.style.width = '100%';
    this.spanHint.style.height = '100%';
    this.spanHint.style.justifyContent = 'center';
    this.spanHint.style.alignItems = 'center';
    this.iptOpen.style.display = 'none';
    this.imgPicture.style.display = 'none';
    this.imgPicture.style.position = 'absolute';
    this.imgPicture.style.top = '0';
    this.imgPicture.style.left = '0';
    this.imgPicture.style.width = '100%';
    this.imgPicture.style.height = '100%';
    this.imgPicture.style.objectFit = 'cover';
    this.imgPicture.style.objectPosition = 'center center';
  }

  private handleSelectFile = () => {
    const file = this.iptOpen.files?.[0];
    if (!file) {
      return;
    }
    this.imgPicture.src = URL.createObjectURL(file);
    this.imgPicture.style.display = 'block';
  };

  public cleanUp(): void {
    this.iptOpen.removeEventListener('change', this.handleSelectFile);
  }

  public clone(): Widget {
    const cloned = new PictureWidget();
    cloned.imgPicture.style.display = this.imgPicture.style.display;
    cloned.imgPicture.src = this.imgPicture.src;
    return cloned;
  }
}
