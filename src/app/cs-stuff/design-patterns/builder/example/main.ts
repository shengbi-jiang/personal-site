import HtmlElementExecutionContext from '@/types/html-element-execution-context';
import CanvasGraphicsBuilder from './canvas-graphics-builder';
import VectorGraphicsBuilder from './vector-graphics-builder';
import Director from './director';

export default class Main extends HtmlElementExecutionContext {
  private root?: HTMLDivElement;
  private readonly divRadioGroup = document.createElement('div');
  private readonly divGraphics = document.createElement('div');

  private readonly canvasGraphicsBuilder = new CanvasGraphicsBuilder();
  private readonly vectorGraphicsBuilder = new VectorGraphicsBuilder();
  private readonly director = new Director(this.canvasGraphicsBuilder);

  public constructor() {
    super();
    this.divGraphics.style;
    this.divRadioGroup.style.marginBottom = '4px';
    this.divRadioGroup.append(
      this.createRadioInput('canvas', true),
      this.createRadioInput('svg')
    );
  }

  private createRadioInput(id: string, checked = false): HTMLLabelElement {
    const input = document.createElement('input');
    input.addEventListener('change', this.handleInputClick);
    input.id = id;
    input.name = 'mode';
    input.type = 'radio';
    input.checked = checked;
    input.style.marginRight = '4px';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.style.display = 'inline-block';
    label.style.marginRight = '8px';
    label.append(input, id);

    return label;
  }

  private handleInputClick = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.id === 'svg') {
      this.director.setBuilder(this.vectorGraphicsBuilder);
    } else {
      this.director.setBuilder(this.canvasGraphicsBuilder);
    }
    this.render();
  };

  private render() {
    if (!this.root) {
      return;
    }
    this.root.replaceChildren(this.divRadioGroup, this.director.build());
  }

  public execute(element: HTMLDivElement): void {
    this.root = element;
    this.root.style.display = 'flex';
    this.root.style.height = '100%';
    this.root.style.flexDirection = 'column';
    this.render();
  }
}
