import Document from './document';
import type { EventHandler } from './types';

export default class DocumentItem {
  private document: Document;
  private liContainer: HTMLLIElement = global.document.createElement('li');
  private spanTitle: HTMLSpanElement = global.document.createElement('span');
  private btnClone: HTMLButtonElement = global.document.createElement('button');
  private btnDelete: HTMLButtonElement =
    global.document.createElement('button');
  private selected: boolean = false;
  private hovering: boolean = false;

  private cloneHandler: EventHandler | null = null;
  private deleteHandler: EventHandler | null = null;
  private clickHandler: EventHandler | null = null;

  public constructor(document: Document) {
    this.document = document;
    this.spanTitle.textContent = document.getTitle();
    this.btnClone.textContent = 'c';
    this.btnDelete.textContent = 'x';
    this.btnClone.addEventListener('click', this.handleBtnCloneClick);
    this.btnDelete.addEventListener('click', this.handleBtnDeleteClick);

    this.liContainer.append(this.spanTitle, this.btnClone, this.btnDelete);
    this.liContainer.addEventListener('mouseenter', this.handleMouseEnter);
    this.liContainer.addEventListener('mouseleave', this.handleMouseLeave);
    this.style();
  }

  private style() {
    this.liContainer.style.display = 'flex';
    this.liContainer.style.padding = '4px 8px';
    this.liContainer.style.marginTop = '4px';
    this.liContainer.style.alignItems = 'center';
    this.liContainer.style.cursor = 'pointer';
    this.spanTitle.style.marginRight = 'auto';
    this.btnClone.style.display = 'none';
    this.btnClone.style.width = '20px';
    this.btnClone.style.marginRight = '4px';
    this.btnDelete.style.display = 'none';
    this.btnDelete.style.width = '20px';
    this.updateBackground();
  }

  private handleMouseEnter = () => {
    this.hovering = true;
    this.btnClone.style.display = 'block';
    this.btnDelete.style.display = 'block';
    this.updateBackground();
  };

  private handleMouseLeave = () => {
    this.hovering = false;
    this.btnClone.style.display = 'none';
    this.btnDelete.style.display = 'none';
    this.updateBackground();
  };

  private updateBackground = () => {
    if (this.selected) {
      this.liContainer.style.background = this.hovering ? '#fff6d9' : '#e8dcb5';
    } else {
      this.liContainer.style.background = this.hovering ? '#ededed' : '#e3e3e3';
    }
  };

  public setTitle(title: string) {
    this.document.setTitle(title);
    this.spanTitle.textContent = title;
  }

  public setContent(content: string) {
    this.document.setContent(content);
  }

  public getDocument(): Document {
    return this.document;
  }

  public setSelected(selected: boolean): void {
    this.selected = selected;
    this.updateBackground();
  }

  private handleBtnCloneClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.cloneHandler?.();
  };

  private handleBtnDeleteClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.deleteHandler?.();
  };

  public setCloneHandler(handler: EventHandler) {
    this.cloneHandler = handler;
  }

  public setDeleteHandler(handler: EventHandler) {
    this.deleteHandler = handler;
  }

  public setClickHandler(handler: EventHandler) {
    this.liContainer.addEventListener('click', handler);
  }

  public cleanUp() {
    this.liContainer.removeEventListener('mouseenter', this.handleMouseEnter);
    this.liContainer.removeEventListener('mouseleave', this.handleMouseLeave);
    if (this.cloneHandler) {
      this.btnClone.removeEventListener('click', this.handleBtnCloneClick);
      this.cloneHandler = null;
    }
    if (this.deleteHandler) {
      this.btnDelete.removeEventListener('click', this.handleBtnDeleteClick);
      this.deleteHandler = null;
    }
    if (this.clickHandler) {
      this.liContainer.removeEventListener('click', this.clickHandler);
      this.clickHandler = null;
    }
  }

  public getElement(): HTMLLIElement {
    return this.liContainer;
  }
}
