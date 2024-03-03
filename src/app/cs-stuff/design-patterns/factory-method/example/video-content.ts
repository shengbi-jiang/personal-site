import Content from './content';

export default class VideoContent extends Content {
  public getContent(): HTMLElement {
    const video = document.createElement('video');
    const source = document.createElement('source');
    const fallback = document.createTextNode(
      'Your browser does not support the video tag.'
    );
    source.src = this.url;
    video.controls = true;
    video.style.minHeight = '0';
    video.style.background = 'black';
    video.style.objectFit = 'contain';
    video.appendChild(source);
    video.appendChild(fallback);
    return video;
  }
}
