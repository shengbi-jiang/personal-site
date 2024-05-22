import type Document from './document';

type SaveHandler = (title: string, content: string) => void;

export default class DocumentEditor {
  private divContainer: HTMLDivElement = document.createElement('div');
  private lblTitle: HTMLLabelElement = document.createElement('label');
  private iptTitle: HTMLInputElement = document.createElement('input');
  private lblContent: HTMLLabelElement = document.createElement('label');
  private taraContent: HTMLTextAreaElement = document.createElement('textarea');
  private btnSave: HTMLButtonElement = document.createElement('button');

  private saveHandler: SaveHandler | null = null;

  public constructor() {
    this.divContainer = document.createElement('div');
    this.buildTitleField();
    this.buildContentField();
    this.buildSaveButton();
    this.divContainer.append(this.lblTitle, this.lblContent, this.btnSave);
    this.divContainer.style.display = 'flex';
    this.divContainer.style.flexDirection = 'column';

    this.setEnabled(false);
  }

  private buildTitleField() {
    this.lblTitle.textContent = 'Title:';
    this.lblTitle.style.display = 'flex';
    this.lblTitle.style.flexDirection = 'column';
    this.iptTitle.style.width = '100%';
    this.lblTitle.appendChild(this.iptTitle);
  }

  private buildContentField() {
    this.lblContent.textContent = 'Content:';
    this.lblContent.style.display = 'flex';
    this.lblContent.style.flexDirection = 'column';
    this.taraContent.style.width = '100%';
    this.taraContent.style.resize = 'none';
    this.lblContent.appendChild(this.taraContent);
  }

  private buildSaveButton() {
    this.btnSave.textContent = 'Save';
    this.btnSave.style.width = 'max-content';
    this.btnSave.style.marginTop = '4px';
    this.btnSave.addEventListener('click', this.handleBtnSaveClick);
  }

  private handleBtnSaveClick = () => {
    this.saveHandler?.(this.iptTitle.value, this.taraContent.value);
  };

  public setSaveHandler(handler: SaveHandler) {
    this.saveHandler = handler;
  }

  public load(document: Document) {
    this.iptTitle.value = document.getTitle();
    this.taraContent.value = document.getContent();
  }

  public setEnabled(enabled: boolean) {
    console.log(enabled);
    this.divContainer.style.display = enabled ? 'flex' : 'none';
  }

  public cleanUp() {
    this.btnSave.removeEventListener('click', this.handleBtnSaveClick);
    this.saveHandler = null;
  }

  public getElement(): HTMLDivElement {
    return this.divContainer;
  }
}
