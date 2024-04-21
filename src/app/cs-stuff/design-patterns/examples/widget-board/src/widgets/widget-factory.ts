import ClockWidget from './clock-widget';
import ColorWidget from './color-widget';
import PictureWidget from './picture-widget';
import ReminderWidget from './reminder-widget';
import StopwatchWidget from './stopwatch-widget';
import Widget from './widget';

export enum WidgetType {
  Clock,
  Stopwatch,
  Reminder,
  Picture,
  Color,
}

export default class WidgetFactory {
  public create(widgetType: WidgetType): Widget {
    switch (widgetType) {
      case WidgetType.Clock:
        return new ClockWidget();
      case WidgetType.Stopwatch:
        return new StopwatchWidget();
      case WidgetType.Reminder:
        return new ReminderWidget();
      case WidgetType.Picture:
        return new PictureWidget();
      case WidgetType.Color:
        return new ColorWidget();
      default:
        throw new Error(
          `WidgetFactory: the widget type ${widgetType} is not implemented`
        );
    }
  }
}
