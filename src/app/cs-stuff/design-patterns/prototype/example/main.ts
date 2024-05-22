import HtmlElementExecutionContext from '@/types/html-element-execution-context';
import DocumentManager from './document-manager';

export default class Main extends HtmlElementExecutionContext {
  private rootElement: Element | null = null;
  private documentManager: DocumentManager | null = null;

  public execute(element: Element): void {
    this.rootElement = element;
    this.documentManager = new DocumentManager();
    element.replaceChildren(this.documentManager.getElement());
  }

  public cleanUp(): void {
    this.rootElement?.replaceChildren();
    this.documentManager?.cleanUp();
  }
}
