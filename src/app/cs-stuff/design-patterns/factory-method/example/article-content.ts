import Content from './content';

export default class ArticleContent extends Content {
  private readonly text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum mi et ligula interdum, eu convallis felis sollicitudin. Pellentesque nunc tortor, imperdiet vel aliquet.';

  public getContent(): HTMLElement {
    const paragraph = document.createElement('p');
    paragraph.textContent = this.text;
    return paragraph;
  }
}
