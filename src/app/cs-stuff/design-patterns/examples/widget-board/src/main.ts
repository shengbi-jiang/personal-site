import HtmlElementExecutionContext from '@/types/html-element-execution-context';
import { WidgetBoard } from './widget-board/widget-board';
import TickProvider from './tick-provider/tick-provider';

export default class Main extends HtmlElementExecutionContext {
  private root?: HTMLDivElement;
  private widgetBoard?: WidgetBoard;
  private tickProvider?: TickProvider;

  public execute(element: HTMLDivElement): void {
    this.tickProvider = new TickProvider();
    this.tickProvider.start();

    this.widgetBoard = new WidgetBoard(6, 6, this.tickProvider);
    this.root = element;
    this.root.replaceChildren(this.widgetBoard.getElement());
  }

  public cleanUp(): void {
    this.widgetBoard?.cleanUp();
    this.tickProvider?.stop();
  }
}
