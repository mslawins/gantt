import * as _ from 'lodash';

import { GanttConfig } from './gantt.model';
import { Point } from './point.model';
import { Task } from './task.model';

export interface Bar {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export class BarGraph {
  constructor(
    private anchor: Point,
    private config: GanttConfig,
    private tasks: Task[]) {}

  getBars(): Bar[] {
    let rawBars = [];
    _.forEach(this.tasks, (task, index) => {
      rawBars.push({
        x: this.anchor.x + this.config.titleColumnWidth + (task.start * this.config.intervalColumnWidth),
        y: this.anchor.y + this.config.headerHeight + (index * this.config.rowHeight),
        width: task.span * this.config.intervalColumnWidth,
        height: this.config.rowHeight,
        radius: this.config.barRadius,
      });
    });

    let bars = [];
    _.forEach(rawBars, (bar) => {
      bars.push({
        x: bar.x + this.config.sidesPadding,
        y: bar.y + this.config.upperLowerPadding,
        width: bar.width - 2 * this.config.sidesPadding,
        height: bar.height - 2 * this.config.upperLowerPadding,
        radius: bar.radius,
      });
    });

    return bars;
  }
}
