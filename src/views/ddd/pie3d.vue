<template>
  <div class="test">
    <div id="test"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

const data = randomData();

var _data = d3
  .pie()
  .sort(null)
  .value(function (d) {
    return d.value;
  })(data);

_data
  .map(d => d.startAngle)
  .map(d => (d / Math.PI) * 180)
  .map(d => Math.round(d));

_data
  .map(d => d.endAngle)
  .map(d => (d / Math.PI) * 180)
  .map(d => Math.round(d));

const salesData = [
  { label: 'Basic', color: '#E8BE00', value: 0.21 },
  { label: 'Plus', color: '#F18100', value: 0.05 },
  { label: 'Lite', color: '#007D83', value: 0.06 },
  { label: 'Elite', color: '#94688B', value: 0.08 },
  { label: 'Delux', color: '#98BE00', value: 0.208 }
];

function pieCornerSurface(d, rx, ry, h) {
  //  Calculating corner left surface key points
  var sxFirst = ir * rx * Math.cos(d.startAngle);
  var syFirst = ir * ry * Math.sin(d.startAngle);
  var sxSecond = rx * Math.cos(d.startAngle);
  var sySecond = ry * Math.sin(d.startAngle);
  var sxThird = sxSecond;
  var syThird = sySecond + h;
  var sxFourth = sxFirst;
  var syFourth = syFirst + h;

  // Creating custom path based on calculation
  return `
				M ${sxFirst} ${syFirst} 
				L ${sxSecond} ${sySecond}
				L ${sxThird} ${syThird} 
				L ${sxFourth} ${syFourth}
				z
	    `;
}

function pieCorner(d, rx, ry, h) {
  //  Calculating  right corner surface key points
  var sxFirst = ir * rx * Math.cos(d.endAngle);
  var syFirst = ir * ry * Math.sin(d.endAngle);
  var sxSecond = rx * Math.cos(d.endAngle);
  var sySecond = ry * Math.sin(d.endAngle);
  var sxThird = sxSecond;
  var syThird = sySecond + h;
  var sxFourth = sxFirst;
  var syFourth = syFirst + h;

  // Creating custom path based on calculation
  return `
				M ${sxFirst} ${syFirst} 
				L ${sxSecond} ${sySecond}
				L ${sxThird} ${syThird} 
				L ${sxFourth} ${syFourth}
				z
				`;
}

_data = d3
  .pie()
  .sort(null)
  .value(function (d) {
    return d.value;
  })(data)
  .map(d => {
    return Object.assign(d, {
      startAngle: d.startAngle + (Math.PI * 2 * (rotation % 360)) / 360,
      endAngle: d.endAngle + (Math.PI * 2 * (rotation % 360)) / 360
    });
  });

pieCorners = _data.map(d => pieCorner(d, rx + 0.5, ry + 0.5, h, ir));

JSON.stringify(_data);

function getPercent(d) {
  return d.endAngle - d.startAngle > 0.2
    ? Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10 +
        '%'
    : '';
}

function pieInner(d, rx, ry, h, ir) {
  // Normalize angles before we start any calculations
  var startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
  var endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

  // Take care of corner cases
  if (d.startAngle > Math.PI * 2 && d.endAngle < Math.PI * 3) {
    return '';
  }

  if (
    d.startAngle >= Math.PI * 2 &&
    d.endAngle >= Math.PI * 2 &&
    d.endAngle <= Math.PI * 3
  ) {
    return '';
  }

  // Reassign startAngle  and endAngle based on their positions
  if (d.startAngle <= Math.PI && d.endAngle > Math.PI * 2) {
    startAngle = Math.PI;
    endAngle = 2 * Math.PI;
  }
  if (d.startAngle > Math.PI && d.endAngle >= Math.PI * 3) {
    endAngle = 2 * Math.PI;
  }
  if (
    d.startAngle > Math.PI &&
    d.endAngle > Math.PI * 2 &&
    d.endAngle < Math.PI * 3
  ) {
    endAngle = 2 * Math.PI;
  }
  if (
    d.startAngle > Math.PI &&
    d.startAngle < Math.PI * 2 &&
    d.endAngle > Math.PI * 3
  ) {
    endAngle = 2 * Math.PI;
    startAngle = Math.PI;
  }
  if (
    d.startAngle > Math.PI &&
    d.startAngle < Math.PI * 2 &&
    d.endAngle > Math.PI * 3
  ) {
    endAngle = 2 * Math.PI;
    startAngle = Math.PI;
  }
  if (
    d.startAngle > Math.PI &&
    d.startAngle < Math.PI * 2 &&
    d.endAngle > Math.PI * 3
  ) {
    startAngle = Math.PI;
    endAngle = Math.PI + (d.endAngle % Math.PI);
  }
  if (
    d.startAngle > Math.PI * 2 &&
    d.startAngle < Math.PI * 3 &&
    d.endAngle > Math.PI * 3
  ) {
    startAngle = Math.PI;
    endAngle = Math.PI + (d.endAngle % Math.PI);
  }
  if (d.startAngle > Math.PI * 3 && d.endAngle > Math.PI * 3) {
    startAngle = d.startAngle % (Math.PI * 2);
    endAngle = d.endAngle % (Math.PI * 2);
  }

  // Calculating shape key points
  var sx = ir * rx * Math.cos(startAngle),
    sy = ir * ry * Math.sin(startAngle),
    ex = ir * rx * Math.cos(endAngle),
    ey = ir * ry * Math.sin(endAngle);

  // Creating custom path  commands based on calculation
  var ret = [];
  ret.push(
    'M',
    sx,
    sy,
    'A',
    ir * rx,
    ir * ry,
    '0 0 1',
    ex,
    ey,
    'L',
    ex,
    h + ey,
    'A',
    ir * rx,
    ir * ry,
    '0 0 0',
    sx,
    h + sy,
    'z'
  );

  // If shape is big enough, that it needs two separate outer shape , then draw second shape as well
  if (
    d.startAngle > Math.PI &&
    d.startAngle < Math.PI * 2 &&
    d.endAngle > Math.PI * 3
  ) {
    startAngle = d.startAngle % (Math.PI * 2);
    endAngle = Math.PI * 2;
    sx = ir * rx * Math.cos(startAngle);
    sy = ir * ry * Math.sin(startAngle);
    ex = ir * rx * Math.cos(endAngle);
    ey = ir * ry * Math.sin(endAngle);
    ret.push(
      'M',
      sx,
      sy,
      'A',
      ir * rx,
      ir * ry,
      '0 0 1',
      ex,
      ey,
      'L',
      ex,
      h + ey,
      'A',
      ir * rx,
      ir * ry,
      '0 0 0',
      sx,
      h + sy,
      'z'
    );
  }

  // Assemble shape commands
  return ret.join(' ');
}

function pieOuter(d, rx, ry, h) {
  // Process corner Cases
  if (
    d.endAngle == Math.PI * 2 &&
    d.startAngle > Math.PI &&
    d.startAngle < Math.PI * 2
  ) {
    return '';
  }
  if (
    d.startAngle > Math.PI * 3 &&
    d.startAngle < Math.PI * 4 &&
    d.endAngle > Math.PI * 3 &&
    d.endAngle <= Math.PI * 4
  ) {
    return '';
  }

  // Reassign startAngle  and endAngle based on their positions
  var startAngle = d.startAngle;
  var endAngle = d.endAngle;
  if (d.startAngle > Math.PI && d.startAngle < Math.PI * 2) {
    startAngle = Math.PI;
    if (d.endAngle > Math.PI * 2) {
      startAngle = 0;
    }
  }
  if (d.endAngle > Math.PI && d.endAngle < Math.PI * 2) {
    endAngle = Math.PI;
  }
  if (d.startAngle > Math.PI * 2) {
    startAngle = d.startAngle % (Math.PI * 2);
  }
  if (d.endAngle > Math.PI * 2) {
    endAngle = d.endAngle % (Math.PI * 2);
    if (d.startAngle <= Math.PI) {
      endAngle = Math.PI;
      startAngle = 0;
    }
  }
  if (d.endAngle > Math.PI * 3) {
    endAngle = Math.PI;
  }
  if (d.startAngle < Math.PI && d.endAngle >= 2 * Math.PI) {
    endAngle = Math.PI;
    startAngle = d.startAngle;
  }

  // Calculating shape key points
  var sx = rx * Math.cos(startAngle),
    sy = ry * Math.sin(startAngle),
    ex = rx * Math.cos(endAngle),
    ey = ry * Math.sin(endAngle);

  // Creating custom path  commands based on calculation
  var ret = [];
  ret.push(
    'M',
    sx,
    h + sy,
    'A',
    rx,
    ry,
    '0 0 1',
    ex,
    h + ey,
    'L',
    ex,
    ey,
    'A',
    rx,
    ry,
    '0 0   0',
    sx,
    sy,
    'z'
  );

  // If shape is big enough, that it needs two separate outer shape , then draw second shape as well
  if (d.startAngle < Math.PI && d.endAngle >= 2 * Math.PI) {
    startAngle = 0;
    endAngle = d.endAngle;
    sx = rx * Math.cos(startAngle);
    sy = ry * Math.sin(startAngle);
    ex = rx * Math.cos(endAngle);
    ey = ry * Math.sin(endAngle);
    ret.push(
      'M',
      sx,
      h + sy,
      'A',
      rx,
      ry,
      '0 0 1',
      ex,
      h + ey,
      'L',
      ex,
      ey,
      'A',
      rx,
      ry,
      '0 0   0',
      sx,
      sy,
      'z'
    );
  }

  // Assemble shape commands
  return ret.join(' ');
}

function pieTop(d, rx, ry, ir) {
  // If angles are equal, then we got nothing to draw
  if (d.endAngle - d.startAngle == 0) return 'M 0 0';

  // Calculating shape key points
  var sx = rx * Math.cos(d.startAngle),
    sy = ry * Math.sin(d.startAngle),
    ex = rx * Math.cos(d.endAngle),
    ey = ry * Math.sin(d.endAngle);

  // Creating custom path based on calculation
  var ret = [];
  ret.push(
    'M',
    sx,
    sy,
    'A',
    rx,
    ry,
    '0',
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    '1',
    ex,
    ey,
    'L',
    ir * ex,
    ir * ey
  );
  ret.push(
    'A',
    ir * rx,
    ir * ry,
    '0',
    d.endAngle - d.startAngle > Math.PI ? 1 : 0,
    '0',
    ir * sx,
    ir * sy,
    'z'
  );
  return ret.join(' ');
}

function changeData() {
  transition('salesDonut', randomData(), 130, 100, 30, 0.4);
  transition('quotesDonut', randomData(), 130, 100, 30, 0);
}

function randomData() {
  return salesData;
}

function draw(
  id,
  data,
  x /*center x*/,
  y /*center y*/,
  rx /*radius x*/,
  ry /*radius y*/,
  h /*height*/,
  ir /*inner radius*/,
  partial
) {
  var slices = d3
    .select('#' + id)
    .append('g')
    .attr('transform', 'translate(' + x + ',' + y + ')')
    .attr('class', 'slices');

  const cornerSliceElements = slices
    .selectAll('.cornerSlices')
    .data(_data.map(d => Object.assign({}, d)))
    .enter()
    .append('path')
    .attr('class', 'cornerSlices')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .attr('d', function (d) {
      return pieCorner(d, rx - 0.5, ry - 0.5, h);
    })
    .each(function (d) {
      this._current = d;
    })
    .attr('opacity', (d, i) => (i || !partial ? 1 : 0))
    .classed('slice-sort', true)
    .style('stroke', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    });

  //--------------
  const cornerSliceSurfaceElements = slices
    .selectAll('.cornerSlicesSurface')
    .data(_data.map(d => Object.assign({}, d)))
    .enter()
    .append('path')
    .attr('class', 'cornerSlicesSurface')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .attr('d', function (d) {
      return pieCornerSurface(d, rx - 0.5, ry - 0.5, h);
    })
    .each(function (d) {
      this._current = d;
    })
    .attr('opacity', (d, i) => (i || !partial ? 1 : 0))
    .classed('slice-sort', true)
    .style('stroke', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    });

  slices
    .selectAll('.innerSlice')
    .data(_data.map(d => Object.assign({}, d)))
    .enter()
    .append('path')
    .attr('class', 'innerSlice')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(2);
    })
    .attr('d', function (d) {
      return pieInner(d, rx + 0.5, ry + 0.5, h, ir);
    })
    .each(function (d) {
      this._current = d;
    })
    .attr('opacity', (d, i) => (i || !partial ? 1 : 0))
    .classed('slice-sort', true)
    .style('stroke', function (d) {
      return d3.hsl(d.data.color).darker(2);
    });

  cornerSliceElements.sort(function (a, b) {
    const angleA = a.endAngle;
    const angleB = b.endAngle;
    return Math.sin(angleA) <= Math.sin(angleB) ? -1 : 1;
  });

  cornerSliceSurfaceElements.sort(function (a, b) {
    const angleA = a.startAngle;
    const angleB = b.startAngle;
    return Math.sin(angleA) <= Math.sin(angleB) ? -1 : 1;
  });

  slices.selectAll('.slice-sort').sort(function (a, b) {
    const first = slices
      .selectAll('.slice-sort')
      .filter(d => d == a)
      .node();
    const second = slices
      .selectAll('.slice-sort')
      .filter(d => d == b)
      .node();
    return first.getBoundingClientRect().top <
      second.getBoundingClientRect().top
      ? -1
      : 1;
  });

  slices
    .selectAll('.outerSlice')
    .data(_data)
    .enter()
    .append('path')
    .attr('class', 'outerSlice')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .attr('d', function (d) {
      return pieOuter(d, rx - 0.5, ry - 0.5, h);
    })
    .each(function (d) {
      this._current = d;
    })
    //.style("stroke", function(d) { return d3.hsl(d.data.color).darker(0.7); })
    .attr('opacity', (d, i) => (i || !partial ? 1 : 0)); //

  slices
    .selectAll('.topSlice')
    .data(_data)
    .enter()
    .append('path')
    .attr('class', 'topSlice')
    .style('fill', function (d) {
      return d.data.color;
    })
    .style('stroke', function (d) {
      return d.data.color;
    })
    .attr('d', function (d) {
      return pieTop(d, rx, ry, ir);
    })
    .each(function (d) {
      this._current = d;
    })
    .attr('opacity', (d, i) => (i || !partial ? 1 : 0));

  /*
		slices.selectAll(".percent").data(_data).enter().append("text").attr("class", "percent")
				.attr('text-anchor',d=>{
       const centerAngle = ((d.startAngle + d.endAngle) / 2) % (Math.PI * 2);
      	if (centerAngle % (Math.PI * 2) >= Math.PI/2 && centerAngle % (Math.PI * 2) < Math.PI/2*3) {
							return 'middle'
					}
      return "middle"
      
    })
				.text((d) => d.data.label + ' (' + Math.round(d.value * 100) + '%)')
        .attr('font-size',10)
				.attr('transform', (d) => {
					const centerAngle = ((d.startAngle + d.endAngle) / 2) % (Math.PI * 2);
					const radianNumber = 180 / Math.PI;

					console.log(centerAngle * radianNumber, d.data.label)
					let angleAddition = 0;
					if (centerAngle % (Math.PI * 2) >= Math.PI/2 && centerAngle % (Math.PI * 2) < Math.PI/2*3) {
							angleAddition = 180;
					}
      
          const diff = rx/ry;

					const x = rx*0.8 * Math.cos(centerAngle);
					const y = ry*0.8 * Math.sin(centerAngle);
					return `translate(${x},${y}) `
				})
        */
}

function transition(id, data, rx, ry, h, ir) {
  function arcTweenInner(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
    };
  }
  function arcTweenTop(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return pieTop(i(t), rx, ry, ir);
    };
  }
  function arcTweenOuter(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return pieOuter(i(t), rx - 0.5, ry - 0.5, h);
    };
  }
  function textTweenX(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
    };
  }
  function textTweenY(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function (t) {
      return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
    };
  }

  d3.select('#' + id)
    .selectAll('.innerSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenInner);

  d3.select('#' + id)
    .selectAll('.topSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenTop);

  d3.select('#' + id)
    .selectAll('.outerSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenOuter);

  d3.select('#' + id)
    .selectAll('.percent')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('x', textTweenX)
    .attrTween('y', textTweenY)
    .text(getPercent);
}

export default {
  name: 'test',
  async created() {
    await this.$nextTick();
  }
};
</script>

<style lang="scss" scoped>
.test {
}
</style>
