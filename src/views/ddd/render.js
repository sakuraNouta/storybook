import * as d3 from 'd3';
import { draw, transition } from './renderUtils';

const salesData = [
  { label: 'Basic', color: '#3366CC', value: 75 },
  { label: 'Plus', color: '#DC3912', value: 25 }
  // { label: 'Lite', color: '#FF9900', value: 100 },
  // { label: 'Elite', color: '#109618' },
  // { label: 'Delux', color: '#990099' }
];
export default function pie(id, isChange) {
  (() => {
    d3.select(id).selectAll('svg').remove();
  })();

  const svg = d3
    .select(id)
    .append('svg')
    .attr('width', 700)
    .attr('height', 500);

  svg.append('g').attr('id', 'salesDonut');
  svg.append('g').attr('id', 'quotesDonut');
  if (isChange) {
    changeData();
  }
  draw('salesDonut', randomData(), 150, 150, 130 /** rx */, 40, 80, 0.4);
  // draw('quotesDonut', randomData(), 450, 150, 130 /** rx */, 100, 30, 0);
}
function changeData() {
  transition('salesDonut', randomData(), 130, 100, 30, 0.4);
  transition('quotesDonut', randomData(), 130, 100, 30, 0);
}

function randomData() {
  // return salesData.map(function (d) {
  //   return { label: d.label, value: 100 * Math.random(), color: d.color };
  // });
  return salesData;
}
