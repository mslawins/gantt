import * as _ from 'lodash';

export interface Point {
  x: number;
  y: number;
}

export interface LegendConfig {
  offset: number;
  padding: number;
  markerSize: number;
  markerRadius: number;
  markerTextOffset: number;
  textWidth: number;
}

export class Legend {
  constructor(private anchor: Point, private config: LegendConfig, private legendElementsAmount: number) {}

  getDimensions() {
    return {
      x: this.anchor.x + this.config.offset,
      y: this.anchor.y,
      width: this.config.offset + (2 * this.config.padding) + this.config.markerSize + this.config.markerTextOffset + this.config.textWidth,
      height: (this.config.padding * 2) + this.legendElementsAmount * (this.config.markerSize + this.config.markerTextOffset) - this.config.markerTextOffset,
    };
  }

  getMarkers() {
    let markers = [];

    _.forEach([0, 1, 2], index => {
      markers.push({
        x: this.anchor.x + this.config.offset + this.config.padding,
        y: this.anchor.y + this.config.padding + index * (this.config.markerSize + this.config.markerTextOffset),
        width: this.config.markerSize,
        height: this.config.markerSize,
        radius: this.config.markerRadius,
      });
    });

    return markers
  }

  getTexts() {
    let texts = [];

    _.forEach([0, 1, 2], index => {
      texts.push({
        x: this.anchor.x + this.config.offset + this.config.padding + this.config.markerSize + this.config.markerTextOffset,
        y: this.anchor.y + this.config.padding + index * (this.config.markerSize + this.config.markerTextOffset) + (this.config.markerSize / 2),
      });
    });

    return texts;
  }
}
