import { GanttConfig } from './../models/gantt.model';
import { Point } from './../models/point.model';

export const ganttConfig: GanttConfig = {
  intervalsAmount: 12,

  titleColumnWidth: 150,
  intervalColumnWidth: 50,

  headerHeight: 100,
  rowHeight: 80,

  verticalBorderWidth: 1,
  horizontalBorderHeight: 1,

  barRadius: 3,

  upperLowerPadding: 15,
  sidesPadding: 10,
};

export const anchor: Point = {x: 10, y: 10};
