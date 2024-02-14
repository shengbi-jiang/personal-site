import BaseContext from './base-context';
import PlainElementFactory from './plain-element-factory';
import DesignedElementFactory from './designed-element-factory';
import TodoListContext from './todo-list-context';

class Main extends BaseContext {
  private rootElement: HTMLDivElement = document.createElement('div');

  private plainElementFactory = new PlainElementFactory();
  private designedElementFactory = new DesignedElementFactory();
  private context = new TodoListContext(this.plainElementFactory);

  execute(element: HTMLDivElement) {
    this.rootElement = element;
    this.btnPlain.addEventListener('click', this.handleBtnPlainClicked);
    this.btnDesigned.addEventListener('click', this.handlebtnDesignedClicked);
    this.render();
  }

  private handleBtnPlainClicked = () => {
    this.context.updateFactory(this.plainElementFactory);
    this.render();
  };

  private handlebtnDesignedClicked = () => {
    this.context.updateFactory(this.designedElementFactory);
    this.render();
  };

  private render() {
    this.rootElement.replaceChildren(
      this.divButtonGroup,
      this.context.createElement()
    );
  }

  cleanUp() {
    this.btnPlain.removeEventListener('click', this.handleBtnPlainClicked);
    this.btnDesigned.removeEventListener(
      'click',
      this.handlebtnDesignedClicked
    );
    this.rootElement.replaceChildren();
  }
}

export default Main;
