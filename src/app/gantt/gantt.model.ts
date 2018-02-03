import * as _ from 'lodash';

import { Task } from './task.model';

export class Gantt {
  constructor(private config: any, private tasksAmount: number) {}

  getDimensions() {
    const overallWidth = this.config.titleColumnWidth + (this.config.intervalsAmount * this.config.intervalColumnWidth);
    const overallHeight = this.config.headerHeight + (this.tasksAmount * this.config.rowHeight);

    let rowsDimensions = [];
    _.range(this.tasksAmount).forEach((index) => {
      rowsDimensions.push({
        x: 0,
        y: this.config.headerHeight + (index * this.config.rowHeight),
        width: overallWidth,
        height: this.config.rowHeight,
      });
    });

    let verticalBorders = [];
    _.range(this.config.intervalsAmount).forEach((index) => {
      verticalBorders.push({
        x: this.config.titleColumnWidth + (index * this.config.intervalColumnWidth),
        y: 0,
        width: this.config.verticalBorderWidth,
        height: overallHeight});
    });

    let horizontalBorders = [];
    _.range(this.tasksAmount).forEach((index) => {
      horizontalBorders.push({
        x: 0,
        y: this.config.headerHeight + (index * this.config.rowHeight),
        width: overallWidth,
        height: this.config.horizontalBorderHeight,
      });
    });


    return {
      overallWidth: overallWidth,
      overallHeight: overallHeight,
      headerWidth: overallWidth,
      headerHeight: this.config.headerHeight,
      rows: rowsDimensions,
      verticalBorders: verticalBorders,
      horizontalBorders: horizontalBorders,
    }
  }
}
