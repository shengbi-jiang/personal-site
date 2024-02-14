import HtmlElementExecutionContext from '@/types/html-element-execution-context';

class BaseContext extends HtmlElementExecutionContext {
  protected divButtonGroup: HTMLDivElement;
  protected btnPlain: HTMLButtonElement;
  protected btnDesigned: HTMLButtonElement;

  constructor() {
    super();
    this.divButtonGroup = document.createElement('div');
    this.divButtonGroup.style.display = 'flex';

    this.btnPlain = document.createElement('button');
    this.btnPlain.textContent = 'Plain';
    this.btnPlain.style.marginRight = '0.5rem';
    this.divButtonGroup.appendChild(this.btnPlain);

    this.btnDesigned = document.createElement('button');
    this.btnDesigned.textContent = 'Designed';

    this.divButtonGroup.appendChild(this.btnDesigned);
  }
}

export default BaseContext;
