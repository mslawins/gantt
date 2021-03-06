declare var Snap: any;

import { Bar } from './bar.model';
import { GanttConfig } from './gantt.model';
import { Task } from './task.model';

export class Arrow {
  constructor(private config: GanttConfig, private tasks: Task[], private bars: Bar[]) {}

  getArrows() {
    let arrows = [];

    this.tasks.forEach((task) => {
      task.depends.forEach((depends) => {
        arrows.push(this.calculateArrow(
          task,
          this.tasks[depends],
          this.bars[task.id],
          this.bars[depends]
        ));
      });
    });

    return arrows;
  }

  private calculateArrow(sourceTask, destinationTask, sourceBar, destinationBar) {
    let start = {x: sourceBar.x + (sourceBar.width / 2), y: sourceBar.y + sourceBar.height};
    let end = {x: destinationBar.x, y: destinationBar.y + (destinationBar.height / 2)};

    const isDestinationPointBeforeSourcePoint = () => destinationBar.x < sourceBar.x && start.x > sourceBar.x;

    while (isDestinationPointBeforeSourcePoint()) {
      start.x -= 1;
    }

    let isSourceBelowDestination = sourceTask.id > destinationTask.id;

    let arrowCurve = 2;
    let clockwise = isSourceBelowDestination ? 1 : 0;
    let curveY = isSourceBelowDestination ? -arrowCurve : arrowCurve;
    let offset = isSourceBelowDestination ? end.y + arrowCurve : end.y - arrowCurve;

    let path;
    if (destinationBar.x > sourceBar.x) {
      path = Snap.format(
        'M {start_x} {start_y} V {offset} a {curve} {curve} 0 0 {clockwise} {curve} {curve_y} L {end_x} {end_y} m -5 -5 l 5 5 l -5 5',
        {
          start_x: start.x,
          start_y: start.y,
          end_x: end.x,
          end_y: end.y,
          offset: offset,
          curve: arrowCurve,
          clockwise: clockwise,
          curve_y: curveY,
        });
    } else if (destinationBar.x < sourceBar.x) {
      start.x += 5;
      path = Snap.format(`M {start_x} {start_y} v {down_1} a {curve} {curve} 0 0 1 -{curve} {curve} H {left} a {curve} {curve} 0 0 {clockwise} -{curve} {curve_y} V {down_2} a {curve} {curve} 0 0 {clockwise} {curve} {curve_y} L {end_x} {end_y} m -5 -5 l 5 5 l -5 5`,
        {
          start_x: start.x,
          start_y: start.y,
          end_x: end.x,
          end_y: end.y,
          down_1: this.config.sidesPadding / 2 - arrowCurve,
          down_2: destinationBar.y + destinationBar.height / 2 - curveY,
          left: destinationBar.x - this.config.sidesPadding,
          offset: offset,
          curve: arrowCurve,
          clockwise: clockwise,
          curve_y: curveY
        });
    }

    return path;
  }
}
