import Document from './document';
import DocumentItem from './document-item';
import { EventHandler } from './types';

type Callback = (document: Document) => void;

export default class DocumentList {
  private readonly sampleDocument: Document = new Document();

  private ulDocumentList: HTMLUListElement = document.createElement('ul');
  private btnNew: HTMLButtonElement = document.createElement('button');

  private selectDocumentHandler: Callback | null = null;
  private resetHandler: EventHandler | null = null;

  private documentItems: DocumentItem[] = [];
  private selectedItem: DocumentItem | null = null;

  public constructor() {
    this.sampleDocument.setTitle('Sample');
    this.sampleDocument.setContent('Sample Content');
    this.ulDocumentList.style.listStyle = 'none';
    this.buildNewButton();
  }

  private buildNewButton() {
    this.btnNew.textContent = 'New';
    this.btnNew.addEventListener('click', this.handleCreateDocument.bind(this));
    this.ulDocumentList.appendChild(this.createNewDocsButtonItem(this.btnNew));
  }

  private createNewDocsButtonItem(button: HTMLButtonElement) {
    const newDocsButtonItem = document.createElement('li');
    newDocsButtonItem.appendChild(button);
    return newDocsButtonItem;
  }

  private createItem(document: Document) {
    const newItem = new DocumentItem(document);
    newItem.setClickHandler(() => this.handleSelectItem(newItem));
    newItem.setCloneHandler(() => this.handleCloneDocument(newItem));
    newItem.setDeleteHandler(() => this.handleDeleteDocument(newItem));
    this.documentItems.push(newItem);
    this.ulDocumentList.appendChild(newItem.getElement());
  }

  private handleCreateDocument() {
    this.createItem(this.sampleDocument.clone());
  }

  private handleCloneDocument = (item: DocumentItem) => {
    this.createItem(item.getDocument().clone());
  };

  private handleDeleteDocument = (item: DocumentItem) => {
    const index = this.documentItems.findIndex((i) => i === item);
    if (index < 0) {
      return;
    }
    if (this.selectedItem === item) {
      this.selectedItem = null;
      this.resetHandler?.();
    }
    this.ulDocumentList.removeChild(item.getElement());
    this.documentItems.splice(index, 1);
    item.cleanUp();
  };

  private handleSelectItem = (item: DocumentItem) => {
    if (this.selectedItem) {
      this.selectedItem.setSelected(false);
    }
    this.selectDocumentHandler?.(item.getDocument());
    this.selectedItem = item;
    item.setSelected(true);
  };

  public setSelectDocumentHandler(handler: Callback) {
    this.selectDocumentHandler = handler;
  }

  public setResetHandler(handler: EventHandler) {
    this.resetHandler = handler;
  }

  public updateCurrentSelectedDocument(title: string, content: string) {
    if (!this.selectedItem) {
      return;
    }
    this.selectedItem.setTitle(title);
    this.selectedItem.setContent(content);
  }

  public cleanUp(): void {
    this.documentItems.forEach((item) => item.cleanUp());
    this.btnNew.removeEventListener('click', this.handleCreateDocument);
    this.selectDocumentHandler = null;
    this.resetHandler = null;
  }

  public getElement(): HTMLUListElement {
    return this.ulDocumentList;
  }
}
