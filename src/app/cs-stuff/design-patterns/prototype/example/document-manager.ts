import type Document from './document';
import DocumentEditor from './document-editor';
import DocumentList from './document-list';

export default class DocumentManager {
  private divContainer: HTMLDivElement = document.createElement('div');
  private documentList = new DocumentList();
  private documentEditor = new DocumentEditor();

  public constructor() {
    this.documentList.setResetHandler(this.resetEditor.bind(this));
    this.documentList.setSelectDocumentHandler(this.loadDocument.bind(this));
    this.documentEditor.setSaveHandler(this.handleSaveDocument);

    this.divContainer.style.display = 'grid';
    this.divContainer.style.gridTemplateColumns = '40% 60%';
    this.divContainer.style.gap = '4px';
    this.divContainer.style.padding = '8px';
    this.divContainer.append(
      this.documentList.getElement(),
      this.documentEditor.getElement()
    );
  }

  private resetEditor() {
    this.documentEditor.setEnabled(false);
  }

  private loadDocument(document: Document) {
    this.documentEditor.setEnabled(true);
    this.documentEditor.load(document);
  }

  private handleSaveDocument = (title: string, content: string) => {
    this.documentList.updateCurrentSelectedDocument(title, content);
  };

  public cleanUp() {
    this.documentList.cleanUp();
    this.documentEditor.cleanUp();
  }

  public getElement(): HTMLDivElement {
    return this.divContainer;
  }
}
