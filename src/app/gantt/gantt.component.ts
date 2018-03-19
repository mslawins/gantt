import { Component, OnInit, ViewChild } from '@angular/core';

import { ReImg } from 'foo/foo'; // TODO integrate with npm version when ready

import { Arrow } from './models/arrow.model';
import { Bar, BarGraph } from './models/bar.model';
import { GanttConfig, GanttGraph } from './models/gantt.model';
import { Point } from './models/point.model';
import { Release, ReleaseConfig, ReleaseGraph } from './models/release.model';
import { Task } from './models/task.model';

import * as Styles from './styles.model';

declare var Snap: any;

@Component({
  selector: 'ms-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
})
export class GanttComponent implements OnInit {
  arrow: Arrow;
  bar: BarGraph;
  canvas: any;
  gantt: GanttGraph;
  ganttAnchor: Point;
  ganttConfig: GanttConfig;
  releases: Release[];
  releaseAnchor: Point;
  releaseGraph: ReleaseGraph;
  releaseConfig: ReleaseConfig;
  tasks: Task[];
  timeIntervals: string[];

  @ViewChild('ganttHook') ganttHook;

  ngOnInit() {
    this.ganttConfig = {
      intervalsAmount: 12,

      titleColumnWidth: 150,
      intervalColumnWidth: 80,

      headerHeight: 80,
      rowHeight: 60,

      verticalBorderWidth: 1,
      horizontalBorderHeight: 1,

      barRadius: 4,

      upperLowerPadding: 15,
      sidesPadding: 10,
    };

    this.tasks = [
      {id: 0, name: 'feature1', start: 1, end: 4, span: 4, depends: []},
      {id: 1, name: 'feature2', start: 4, end: 4, span: 1, depends: []},
      {id: 2, name: 'feature3', start: 2, end: 8, span: 7, depends: []},
      {id: 3, name: 'feature4', start: 7, end: 10, span: 4, depends: []},
      {id: 4, name: 'feature5', start: 5, end: 12, span: 7, depends: []},
    ];

    this.timeIntervals = ['18.01', '18.02', '18.03', '18.04', '18.05', '18.06',
                          '18.07', '18.08', '18.09', '18.10', '18.11', '18.12'];

    this.releases = [
      {name: 'rel1', start: 1, end: 5, span: 5},
      {name: 'rel2', start: 4, end: 8, span: 5},
      {name: 'rel3', start: 7, end: 10, span: 4}];

    this.releaseAnchor = {x: 0, y: 0};
    this.releaseConfig = {
      padding: 10,
      barHeight: 18,
      barRadius: 4,
      offset: 1
    };

    this.releaseGraph = new ReleaseGraph(
      this.releaseAnchor,
      this.ganttConfig,
      this.releaseConfig,
      this.releases,
      this.timeIntervals);

    let releasesDimensions = this.releaseGraph.getOverallDimension();
    this.ganttAnchor = {x: 0, y: releasesDimensions.height};

    this.gantt = new GanttGraph(this.ganttAnchor, this.ganttConfig, this.tasks.length);
    this.bar = new BarGraph(this.ganttAnchor, this.ganttConfig, this.tasks);
    this.arrow = new Arrow(this.ganttConfig, this.tasks, this.bar.getBars());
    const ganttDimensions = this.gantt.getDimensions();

    this.canvas = Snap('.gantt');
    this.canvas.attr({
      width: ganttDimensions.overallWidth,
      height: ganttDimensions.overallHeight + releasesDimensions.height
    });
    this.canvas.rect(0, 0,
      ganttDimensions.overallWidth,
      ganttDimensions.overallHeight + releasesDimensions.height,
    ).attr(Styles.ganttBackground);

    this.drawReleases();
    this.drawGantt(ganttDimensions);
    this.drawBars();
    this.drawArrows();
  }

  drawReleases() {
    let dimensions = this.releaseGraph.getOverallDimension();
    let bars = this.releaseGraph.getBars();
    let borders = this.releaseGraph.getVerticalBorders();
    let texts = this.releaseGraph.getText();

    this.canvas.rect(dimensions.x, dimensions.y, dimensions.width, dimensions.height).attr(Styles.releasesBackground);

    borders.forEach(border => {
      this.canvas.rect(border.x, border.y, border.width, border.height).attr(Styles.ganttBorder);
    });

    bars.forEach(bar => {
      this.canvas.rect(bar.x, bar.y, bar.width, bar.height, bar.radius).attr(Styles.releasesBar);
    });

    texts.forEach((text, index) => {
      this.canvas.text(text.x, text.y, this.releases[index].name).attr(Styles.releaseText);
    });
  }

  drawGantt(dimensions) {
    this.canvas.rect(dimensions.x, dimensions.y, dimensions.overallWidth, dimensions.overallHeight).attr(Styles.ganttBackground);
    this.canvas.rect(dimensions.x, dimensions.y, dimensions.headerWidth, dimensions.headerHeight).attr(Styles.ganttHeader);

    dimensions.rows.forEach((row, index) => {
      if (index % 2 === 0) {
        this.canvas.rect(row.x, row.y, row.width, row.height).attr(Styles.ganttRow(Styles.lightColor));
      } else {
        this.canvas.rect(row.x, row.y, row.width, row.height).attr(Styles.ganttRow(Styles.darkColor));
      }
    });

    dimensions.verticalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).attr(Styles.ganttBorder);
    });

    dimensions.horizontalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).attr(Styles.ganttBorder);
    });

    dimensions.headerTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.timeIntervals[index]).attr(Styles.ganttText);
    });

    dimensions.titleTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.tasks[index].name).attr(Styles.ganttText);
    });
  }

  drawBars() {
    const bars: Bar[] = this.bar.getBars();
    bars.forEach((bar) => {
      this.canvas.rect(bar.x, bar.y, bar.width, bar.height, bar.radius).attr(Styles.ganttBar(Styles.barColors[0]));
    });
  }

  drawArrows() {
    const arrows = this.arrow.getArrows();
    arrows.forEach((path) => {
      this.canvas.path(path).addClass(Styles.arrow);
    });
  }

  onSaveClick() {
    ReImg.fromSvg(this.ganttHook.nativeElement).downloadPng();
  }
}
