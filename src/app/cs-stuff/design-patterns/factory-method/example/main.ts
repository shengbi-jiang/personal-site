import BaseContext from './base-context';
import type Content from './content';
import ArticleContent from './article-content';
import ImageContent from './image-content';
import VideoContent from './video-content';

export default class Main extends BaseContext {
  private root?: HTMLElement;
  private articleContent = new ArticleContent(
    'Lorem Ipsum',
    'https://www.example.org/lorem-ipsum'
  );
  private imageContent = new ImageContent(
    'Mountain',
    'https://picsum.photos/seed/picsum/400/300'
  );
  private videoContent = new VideoContent(
    'BigBuckBunny',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  );

  constructor() {
    super();
    this.btnArticle.addEventListener(
      'click',
      this.toRender(this.articleContent)
    );
    this.btnImage.addEventListener('click', this.toRender(this.imageContent));
    this.btnVideo.addEventListener('click', this.toRender(this.videoContent));
  }

  private toRender(content: Content) {
    return () => {
      if (!this.root) {
        return;
      }
      this.root.replaceChildren(this.divButtonGroup, content.getElement());
    };
  }

  public execute(element: HTMLElement): void {
    this.root = element;
    this.root.style.height = '100%';
    this.root.style.display = 'flex';
    this.root.style.flexDirection = 'column';
    this.root.replaceChildren(this.divButtonGroup);
  }
}
