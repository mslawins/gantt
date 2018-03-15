const veryDarkColor = '#dedede';
export const darkColor = '#f1f1f1';
export const lightColor = '#f9f9f9';

export const barColors = ['#ec644b', '#2980b9', '#27ae60'];

const textColor = '#333';
const fontSize = '14';
const fontFamily = "'Lato', serif";
const arrowWidth = '2';

// gantt
export const ganttBackground = {
  fill: '#fff',
}

export const ganttHeader = {
  fill: lightColor,
}

export const ganttRow = (color) => {
  return {fill: color}
}

export const ganttBorder = {
  fill: veryDarkColor,
}

export const ganttText = {
  textAnchor: 'middle',
  alignmentBaseline: 'middle',
  fontSize: fontSize,
  fill: textColor,
  fontFamily: fontFamily,
}

export const ganttBar = (color) => {
  return {fill: color};
}

// arrow
export const arrow = {
  fill: 'none',
  stroke: textColor,
  strokeWidth: arrowWidth,
}

// legend
export const legendBackground = {
  fill: lightColor,
}

export const legendMarker = (color) => {
  return {fill: color };
}

export const legendText = {
  textAnchor: 'start',
  alignmentBaseline: 'middle',
  fontSize: fontSize,
  fill: textColor,
  fontFamily: fontFamily,
}
