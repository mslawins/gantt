import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';

import { ReImg } from 'foo/foo';

import { Arrow } from './arrow.model';
import { Config } from './config.model';
import { Bar } from './bar.model';
import { Gantt } from './gantt.model';
import { Task } from './task.model';
import { Legend, LegendConfig, Point } from './legend.model';

declare var Snap: any;

@Component({
  selector: 'ms-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GanttComponent implements OnInit {
  arrow: Arrow;
  bar: Bar;
  gantt: Gantt;
  config: Config;
  canvas: any;
  tasks: Task[];
  timeIntervals: string[];
  legend: Legend;
  legendConfig: LegendConfig;
  legendAnchor: Point;
  legendEntries: string[];

  @ViewChild('ganttHook') ganttHook;

  ngOnInit() {
    this.config = {
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

    this.legendConfig = {
      offset: 10,
      padding: 30,
      markerSize: 26,
      markerRadius: 4,
      markerTextOffset: 15,
      textWidth: 55,
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

    this.legendEntries = ['Entry1', 'Entry2', 'Entry3'];

    this.gantt = new Gantt(this.config, this.tasks.length);
    this.bar = new Bar(this.config, this.tasks);
    this.arrow = new Arrow(this.config, this.tasks, this.bar.getBars());

    const ganttDimensions = this.gantt.getDimensions();
    this.legendAnchor = {x: ganttDimensions.overallWidth, y: 0};
    this.legend = new Legend(this.legendAnchor, this.legendConfig, 3);
    const legendDimensions = this.legend.getDimensions();

    this.canvas = Snap('.gantt');
    this.canvas.attr({
      width: ganttDimensions.overallWidth + legendDimensions.width,
      height: ganttDimensions.overallHeight > legendDimensions.height ? ganttDimensions.overallHeight : legendDimensions.height});

    this.drawGantt(ganttDimensions);
    this.drawBars();
    this.drawArrows();
    this.drawLegend(legendDimensions);
  }

  drawGantt(dimensions) {
    this.canvas.rect(0, 0, dimensions.overallWidth, dimensions.overallHeight).addClass('background')
    this.canvas.rect(0, 0, dimensions.headerWidth, dimensions.headerHeight).addClass('header')

    dimensions.rows.forEach((row) => {
      this.canvas.rect(row.x, row.y, row.width, row.height).addClass('row');
    });

    dimensions.verticalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).addClass('vertical-border');
    });

    dimensions.horizontalBorders.forEach((border) => {
      this.canvas.rect(border.x, border.y, border.width, border.height).addClass('horizontal-border');
    });

    dimensions.headerTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.timeIntervals[index]).addClass('header-text');
    });

    dimensions.titleTextAnchors.forEach((anchor, index) => {
      this.canvas.text(anchor.x, anchor.y, this.tasks[index].name).addClass('title-text');
    });
  }

  drawBars() {
    const bars = this.bar.getBars();

    bars.forEach((bar) => {
      this.canvas.rect(bar.x, bar.y, bar.width, bar.height, bar.radius).addClass('bar');
    });
  }

  drawArrows() {
    const arrows = this.arrow.getArrows();

    arrows.forEach((path) => {
      this.canvas.path(path).addClass('arrow');
    });
  }

  drawLegend(dimensions) {
    this.canvas.rect(dimensions.x, dimensions.y, dimensions.width, dimensions.height).addClass('legend-background');

    const markers = this.legend.getMarkers();
    const texts = this.legend.getTexts();

    markers.forEach(marker => {
      this.canvas.rect(marker.x, marker.y, marker.width, marker.height, marker.radius).addClass('marker');
    });

    texts.forEach((text, index) => {
      this.canvas.text(text.x, text.y, this.legendEntries[index]).addClass('legend-text');
    });
  }

  onSaveClick() {
    ReImg.fromSvg(this.ganttHook.nativeElement).downloadPng();
  }
}
