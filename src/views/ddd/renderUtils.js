import * as d3 from 'd3';

const rotation = (Math.PI * 2 * 60) / 360;
// const rotation = 0;

export const draw = (
  id,
  data,
  x /* center x */,
  y /* center y */,
  rx /* radius x */,
  ry /* radius y */,
  h /* height */,
  ir /* inner radius */
) => {
  const dataset = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    })(data)
    .map(d => ({
      ...d,
      startAngle: d.startAngle + rotation,
      endAngle: d.endAngle + rotation
    }));

  const slices = d3
    .select(`#${id}`)
    .append('g')
    .attr('transform', `translate(${x},${y})`)
    .attr('class', 'slices');
  // 环形内曲面
  slices
    .selectAll('.innerSlice')
    .data(dataset)
    .enter()
    .append('path')
    .attr('class', 'innerSlice')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .style('transform', d => `translateY(${h - d.value}px)`)
    .attr('d', function (d) {
      return pieInner(d, rx + 0.5, ry + 0.5, h + d.value, ir);
    })
    .each(function (d) {
      this._current = d;
    });
  // 上层2d平面
  slices
    .selectAll('.topSlice')
    .data(dataset)
    .enter()
    .append('path')
    .attr('class', 'topSlice')
    .style('fill', function (d) {
      return d.data.color;
    })
    .style('transform', d => `translateY(${h - d.value}px)`)
    .style('stroke', function (d) {
      return d.data.color;
    })
    .attr('d', function (d) {
      return pieTop(d, rx, ry, ir);
    })
    .each(function (d) {
      this._current = d;
    });
  // 侧面曲面
  slices
    .selectAll('.outerSlice')
    .data(dataset)
    .enter()
    .append('path')
    .attr('class', 'outerSlice')
    .style('fill', function (d) {
      return d3.hsl(d.data.color).darker(0.7);
    })
    .style('transform', d => `translateY(${h - d.value}px)`)
    .attr('d', function (d) {
      return pieOuter(d, rx - 0.5, ry - 0.5, h + d.value);
    })
    .each(function (d) {
      this._current = d;
    });

  slices
    .selectAll('.percent')
    .data(dataset)
    .enter()
    .append('text')
    .style('transform', d => `translateY(${h - d.value}px)`)
    .attr('class', 'percent')
    .attr('x', function (d) {
      return 0.6 * rx * Math.cos(0.5 * (d.startAngle + d.endAngle));
    })
    .attr('y', function (d) {
      return 0.6 * ry * Math.sin(0.5 * (d.startAngle + d.endAngle));
    })
    .text(getPercent)
    .each(function (d) {
      this._current = d;
    });
};
// 内曲面
function pieInner(d, rx, ry, h, ir) {
  const startAngle = d.startAngle < Math.PI ? Math.PI : d.startAngle;
  const endAngle = d.endAngle < Math.PI ? Math.PI : d.endAngle;

  const sx = ir * rx * Math.cos(startAngle);
  const sy = ir * ry * Math.sin(startAngle);
  const ex = ir * rx * Math.cos(endAngle);
  const ey = ir * ry * Math.sin(endAngle);

  return `M ${sx} ${sy}
          A ${ir * rx} ${ir * ry} 0 0 1 ${ex} ${ey}
          L ${ex} ${h + ey} 
          A ${ir * rx} ${ir * ry} 0 0 0 ${sx} ${h + sy} Z`;
}
function pieTop(d, rx, ry, ir) {
  if (d.endAngle - d.startAngle === 0) return 'M 0 0';
  const sx = rx * Math.cos(d.startAngle);
  const sy = ry * Math.sin(d.startAngle);
  const ex = rx * Math.cos(d.endAngle);
  const ey = ry * Math.sin(d.endAngle);

  const second = d.endAngle - d.startAngle > Math.PI ? 1 : 0;
  return `M ${sx} ${sy}
          A ${rx} ${ry} 0 ${second} 1 ${ex} ${ey}
          L ${ir * ex} ${ir * ey} 
          A ${ir * rx} ${ir * ry} 0 ${second} 0 ${ir * sx} ${ir * sy} Z`;
}
// 外曲面算法
function pieOuter(d, rx, ry, h) {
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

  const sx = rx * Math.cos(startAngle);
  const sy = ry * Math.sin(startAngle);
  const ex = rx * Math.cos(endAngle);
  const ey = ry * Math.sin(endAngle);

  return `M ${sx} ${h + sy} 
          A ${rx} ${ry} 0 0 1 ${ex} ${h + ey}
          L ${ex} ${ey} 
          A ${rx} ${ry} 0 0 0 ${sx} ${sy} Z`;
}

function getPercent(d) {
  return d.endAngle - d.startAngle > 0.2
    ? `${
        Math.round((1000 * (d.endAngle - d.startAngle)) / (Math.PI * 2)) / 10
      }%`
    : '';
}
export const transition = (id, data, rx, ry, h, ir) => {
  class arcTweenInner {
    constructor(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieInner(i(t), rx + 0.5, ry + 0.5, h, ir);
      };
    }
  }
  class arcTweenTop {
    constructor(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieTop(i(t), rx, ry, ir);
      };
    }
  }
  class arcTweenOuter {
    constructor(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return pieOuter(i(t), rx - 0.5, ry - 0.5, h);
      };
    }
  }
  class textTweenX {
    constructor(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return 0.6 * rx * Math.cos(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }
  }
  class textTweenY {
    constructor(a) {
      const i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function (t) {
        return 0.6 * rx * Math.sin(0.5 * (i(t).startAngle + i(t).endAngle));
      };
    }
  }

  const _data = d3
    .pie()
    .sort(null)
    .value(function (d) {
      return d.value;
    })(data);

  d3.select(`#${id}`)
    .selectAll('.innerSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenInner);

  d3.select(`#${id}`)
    .selectAll('.topSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenTop);

  d3.select(`#${id}`)
    .selectAll('.outerSlice')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('d', arcTweenOuter);

  d3.select(`#${id}`)
    .selectAll('.percent')
    .data(_data)
    .transition()
    .duration(750)
    .attrTween('x', textTweenX)
    .attrTween('y', textTweenY)
    .text(getPercent);
};
