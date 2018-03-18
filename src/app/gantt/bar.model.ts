import * as _ from 'lodash';

import { Config } from './config.model';
import { Point } from './point.model';
import { Task } from './task.model';

export class Bar {
  constructor(
    private anchor: Point,
    private config: Config,
    private tasks: Task[]) {}

  getBars() {
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
