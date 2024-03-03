export default abstract class Content {
  public constructor(
    private readonly title: string,
    protected readonly url: string
  ) {}

  public abstract getContent(): HTMLElement;

  public getElement(): HTMLDivElement {
    const divContainer = document.createElement('div');
    const h3Title = document.createElement('h3');
    const content = this.getContent();
    h3Title.textContent = this.title;
    divContainer.append(h3Title, content);
    divContainer.style.display = 'flex';
    divContainer.style.flexGrow = '1';
    divContainer.style.flexDirection = 'column';
    divContainer.style.minHeight = '0';
    return divContainer;
  }
}
