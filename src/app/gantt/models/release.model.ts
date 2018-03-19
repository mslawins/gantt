import * as _ from 'lodash';

import { GanttConfig } from './gantt.model';
import { Bar } from './bar.model';
import { Point } from './point.model';

export interface Release {
  name: string;
  start: number;
  end: number;
  span: number;
}

export interface ReleaseConfig {
  padding: number;
  barHeight: number;
  barRadius: number;
  offset: number;
}

export class ReleaseGraph {
  height: number;
  bars: Bar[];
  overall: any;
  verticalBorders: any;
  texts: any;

  constructor(
    private anchor: Point,
    private ganttConfig: GanttConfig,
    private releaseConfig: ReleaseConfig,
    private releases: Release[],
    private timeIntervals: string[]) {

    this.height = (this.releases.length * this.releaseConfig.barHeight) + (this.releases.length + 1) * this.releaseConfig.padding;

    this.overall = {
      x: this.anchor.x,
      y: this.anchor.y,
      width: this.ganttConfig.titleColumnWidth + this.timeIntervals.length * this.ganttConfig.intervalColumnWidth,
      height: this.height,
    }

    let rawBars = []
    _.forEach(this.releases, (release, index) => {
      rawBars.push({
        x: this.anchor.x + this.ganttConfig.titleColumnWidth + (release.start * this.ganttConfig.intervalColumnWidth),
        y: this.anchor.y + this.releaseConfig.padding + (this.releaseConfig.padding + this.releaseConfig.barHeight) * index,
        width: release.span * this.ganttConfig.intervalColumnWidth,
        height: this.releaseConfig.barHeight,
        radius: this.releaseConfig.barRadius,
      });
    });

    this.bars = [];
    _.forEach(rawBars, (bar, index) => {
      this.bars.push({
        x: bar.x + this.ganttConfig.sidesPadding,
        y: bar.y,
        width: bar.width - (2 * this.ganttConfig.sidesPadding),
        height: bar.height,
        radius: bar.radius,
      });
    });

    this.verticalBorders = [];
    _.range(this.timeIntervals.length).forEach((index) => {
      this.verticalBorders.push({
        x: this.anchor.x + this.ganttConfig.titleColumnWidth + (index * this.ganttConfig.intervalColumnWidth),
        y: this.anchor.y,
        width: this.ganttConfig.verticalBorderWidth,
        height: this.height});
    });

    this.texts = [];
    _.forEach(this.releases, (release, index) => {
      this.texts.push({
        x: this.bars[index].x + (this.bars[index].width / 2),
        y: this.bars[index].y + (this.bars[index].height / 2) + this.releaseConfig.offset,
      });
    });
  }

  getOverallDimension() {
    return this.overall;
  }

  getVerticalBorders() {
    return this.verticalBorders;
  }

  getBars() {
    return this.bars;
  }

  getText() {
    return this.texts;
  }
}
