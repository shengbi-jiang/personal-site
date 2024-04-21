import Rect from '../rect';
import ClockWidget from './clock-widget';
import ColorWidget from './color-widget';
import PictureWidget from './picture-widget';
import ReminderWidget from './reminder-widget';
import StopwatchWidget from './stopwatch-widget';
import { WidgetType } from './widget-factory';

export default class WidgetMeta {
  public static getWidgetSize(widgetType: WidgetType): Rect {
    switch (widgetType) {
      case WidgetType.Clock:
        return ClockWidget.size.clone();
      case WidgetType.Stopwatch:
        return StopwatchWidget.size.clone();
      case WidgetType.Reminder:
        return ReminderWidget.size.clone();
      case WidgetType.Picture:
        return PictureWidget.size.clone();
      case WidgetType.Color:
        return ColorWidget.size.clone();
      default:
        throw new Error(
          `WidgetMeta.getWidgetSize: unknown widget type ${widgetType}`
        );
    }
  }
}
