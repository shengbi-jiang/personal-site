import Point from '../../point';
import TickProvider from '../../tick-provider/tick-provider';
import Widget from '../../widgets/widget';
import { WidgetType } from '../../widgets/widget-factory';
import { WidgetBoard } from '../widget-board';

export default abstract class BoardState {
  protected readonly widgetBoard: WidgetBoard;
  protected readonly tickProvider: TickProvider;

  public constructor(widgetBoard: WidgetBoard, tickProvider: TickProvider) {
    this.widgetBoard = widgetBoard;
    this.tickProvider = tickProvider;
  }

  public abstract prepareAddingWidget(widgetType: WidgetType): void;
  public abstract prepareCloningWidget(widget: Widget): void;
  public abstract placeWidget(position: Point): void;
  public abstract removeWidget(widget: Widget): void;
  public abstract cancel(): void;
}
