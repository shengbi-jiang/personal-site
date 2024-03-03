import HtmlElementExecutionContext from '@/types/html-element-execution-context';

export default class BaseContext extends HtmlElementExecutionContext {
  protected divButtonGroup = document.createElement('div');
  protected btnArticle = document.createElement('button');
  protected btnImage = document.createElement('button');
  protected btnVideo = document.createElement('button');

  constructor() {
    super();
    this.btnArticle.textContent = 'Article';
    this.btnImage.textContent = 'Image';
    this.btnVideo.textContent = 'Video';
    this.divButtonGroup.style.display = 'flex';
    this.divButtonGroup.style.gap = '4px';
    this.divButtonGroup.style.marginBottom = '8px';
    this.divButtonGroup.append(this.btnArticle, this.btnImage, this.btnVideo);
  }
}
