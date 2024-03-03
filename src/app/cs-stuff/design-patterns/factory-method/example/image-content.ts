import Content from './content';

export default class ImageContent extends Content {
  public getContent(): HTMLElement {
    const image = document.createElement('img');
    image.style.maxWidth = '100%';
    image.style.objectFit = 'contain';
    image.src = this.url;
    return image;
  }
}
