import Clonable from './clonable';

export default class Document implements Clonable<Document> {
  private title: string = '';
  private content: string = '';

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getContent(): string {
    return this.content;
  }

  public setContent(content: string): void {
    this.content = content;
  }

  public clone(): Document {
    const cloned = new Document();
    cloned.title = this.title;
    cloned.content = this.content;
    return cloned;
  }
}
