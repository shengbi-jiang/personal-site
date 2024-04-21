import Cloneable from '../cloneable';
import Point from '../point';
import type Rect from '../rect';

type DragEventHandler = (event: DragEvent) => void;
type ClickEventHandler = (event: MouseEvent) => void;

export default abstract class Widget implements Cloneable<Widget> {
  protected _position: Point;
  protected _size: Rect;
  protected rootElement: HTMLDivElement;
  private header: HTMLDivElement;
  private btnClone: HTMLButtonElement;
  private btnRemove: HTMLButtonElement;

  private dragEventHandler: DragEventHandler | null = null;
  private btnCloneClickHandler: ClickEventHandler | null = null;
  private btnRemoveClickHandler: ClickEventHandler | null = null;

  public constructor(size: Rect, position: Point = new Point(0, 0)) {
    this._position = position.clone();
    this._size = size.clone();

    this.btnClone = document.createElement('button');
    this.btnClone.textContent = '+';
    this.btnClone.style.display = 'flex';
    this.btnClone.style.width = '1rem';
    this.btnClone.style.height = '1rem';
    this.btnClone.style.justifyContent = 'center';
    this.btnClone.style.alignItems = 'center';

    this.btnRemove = document.createElement('button');
    this.btnRemove.textContent = '✖';
    this.btnRemove.style.display = 'flex';
    this.btnRemove.style.width = '1rem';
    this.btnRemove.style.height = '1rem';
    this.btnRemove.style.paddingBottom = '2px';
    this.btnRemove.style.marginLeft = '0.25rem';
    this.btnRemove.style.justifyContent = 'center';
    this.btnRemove.style.alignItems = 'center';

    this.header = document.createElement('div');
    this.header.append(this.btnClone, this.btnRemove);
    this.header.style.display = 'flex';
    this.header.style.position = 'absolute';
    this.header.style.top = '0';
    this.header.style.left = '0';
    this.header.style.width = '100%';
    this.header.style.padding = '2px 2px 0 2px';
    this.header.style.justifyContent = 'flex-end';
    this.header.style.alignItems = 'flex-start';

    this.rootElement = document.createElement('div');
    this.rootElement.draggable = true;
    this.rootElement.style.position = 'relative';
    this.rootElement.appendChild(this.header);
    this.updateGridPosition();
  }

  public getPosition(): Point {
    return this._position.clone();
  }

  public setPosition(value: Point): void {
    this._position = value.clone();
    this.updateGridPosition();
  }

  public getSize(): Rect {
    return this._size.clone();
  }

  protected style() {
    this.rootElement.style.background = 'white';
    this.rootElement.style.border = '1px solid black';
    this.rootElement.style.borderRadius = '4px';
  }

  protected setContent(...content: HTMLElement[]) {
    this.rootElement.replaceChildren(...content, this.header);
  }

  private updateGridPosition() {
    const { x, y } = this._position;
    const { width, height } = this._size;
    this.rootElement.style.gridColumn = `${x + 1} / span ${width}`;
    this.rootElement.style.gridRow = `${y + 1} / span ${height}`;
  }

  public setDragStartEventHandler(handler: DragEventHandler) {
    if (this.dragEventHandler) {
      this.rootElement.removeEventListener('dragstart', this.dragEventHandler);
    }
    this.dragEventHandler = handler;
    this.rootElement.addEventListener('dragstart', handler);
  }

  public removeDragStartEventHandler() {
    if (!this.dragEventHandler) {
      return;
    }
    this.rootElement.removeEventListener('dragstart', this.dragEventHandler);
    this.dragEventHandler = null;
  }

  public setBtnCloneEventHandler(handler: ClickEventHandler) {
    if (this.btnCloneClickHandler) {
      this.btnClone.removeEventListener('click', this.btnCloneClickHandler);
    }
    this.btnCloneClickHandler = handler;
    this.btnClone.addEventListener('click', handler);
  }

  public setBtnRemoveEventHandler(handler: ClickEventHandler) {
    if (this.btnRemoveClickHandler) {
      this.btnRemove.removeEventListener('click', this.btnRemoveClickHandler);
    }
    this.btnRemoveClickHandler = handler;
    this.btnRemove.addEventListener('click', handler);
  }

  public elapse(milliseconds: number) {
    // do nothing by default
  }

  public getElement(): HTMLElement {
    return this.rootElement;
  }

  public cleanUp() {
    if (this.dragEventHandler) {
      this.rootElement.removeEventListener('dragstart', this.dragEventHandler);
      this.dragEventHandler = null;
    }
    if (this.btnCloneClickHandler) {
      this.btnClone.removeEventListener('click', this.btnCloneClickHandler);
      this.btnCloneClickHandler = null;
    }
    if (this.btnRemoveClickHandler) {
      this.btnRemove.removeEventListener('click', this.btnRemoveClickHandler);
      this.btnRemoveClickHandler = null;
    }
  }

  public abstract clone(): Widget;
}
