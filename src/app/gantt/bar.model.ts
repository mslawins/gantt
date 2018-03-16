import * as _ from 'lodash';

import { Config } from './config.model';
import { Task } from './task.model';

export class Bar {
  constructor(private config: Config, private tasks: Task[]) {}

  getBars() {
    let rawBars = [];

    this.tasks.forEach((task, index) => {
      rawBars.push({
        x: this.config.titleColumnWidth + (task.subtasks[0].start * this.config.intervalColumnWidth),
        y: this.config.headerHeight + (index * this.config.rowHeight),
        width: task.subtasks[0].span * this.config.intervalColumnWidth,
        height: this.config.rowHeight,
        radius: this.config.barRadius,
      });
    });

    let bars = [];

    rawBars.forEach((bar) => {
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
