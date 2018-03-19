import * as _ from 'lodash';

import { Point } from './point.model';
import { Task } from './task.model';

export interface GanttConfig {
  intervalsAmount: number;

  titleColumnWidth: number;
  intervalColumnWidth: number;

  headerHeight: number;
  rowHeight: number;

  verticalBorderWidth: number;
  horizontalBorderHeight: number;

  barRadius: number;

  upperLowerPadding: number;
  sidesPadding: number;
}

export class GanttGraph {
  constructor(
    private anchor: Point,
    private config: GanttConfig,
    private tasksAmount: number) {}

  getDimensions() {
    const overallWidth = this.config.titleColumnWidth + (this.config.intervalsAmount * this.config.intervalColumnWidth);
    const overallHeight = this.config.headerHeight + (this.tasksAmount * this.config.rowHeight);

    let rowsDimensions = [];
    _.range(this.tasksAmount).forEach((index) => {
      rowsDimensions.push({
        x: this.anchor.x,
        y: this.anchor.y + this.config.headerHeight + (index * this.config.rowHeight),
        width: overallWidth,
        height: this.config.rowHeight,
      });
    });

    let verticalBorders = [];
    _.range(this.config.intervalsAmount).forEach((index) => {
      verticalBorders.push({
        x: this.anchor.x + this.config.titleColumnWidth + (index * this.config.intervalColumnWidth),
        y: this.anchor.y,
        width: this.config.verticalBorderWidth,
        height: overallHeight});
    });

    let horizontalBorders = [];
    _.range(this.tasksAmount).forEach((index) => {
      horizontalBorders.push({
        x: this.anchor.x,
        y: this.anchor.y + this.config.headerHeight + (index * this.config.rowHeight),
        width: overallWidth,
        height: this.config.horizontalBorderHeight,
      });
    });

    let headerTextAnchors = [];
    _.range(this.config.intervalsAmount).forEach((index) => {
      headerTextAnchors.push({
        x: this.anchor.x + this.config.titleColumnWidth + (this.config.intervalColumnWidth * index) + (this.config.intervalColumnWidth / 2),
        y: this.anchor.y + this.config.headerHeight / 2,
      });
    });

    let titleTextAnchors = [];
    _.range(this.tasksAmount).forEach((index) => {
      titleTextAnchors.push({
        x: this.anchor.x + this.config.titleColumnWidth / 2,
        y: this.anchor.y + this.config.headerHeight + (this.config.rowHeight * index) + (this.config.rowHeight / 2),
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
      headerTextAnchors: headerTextAnchors,
      titleTextAnchors: titleTextAnchors,
    }
  }
}
