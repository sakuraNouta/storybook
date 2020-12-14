<template>
  <div class="test">
    <div id="test"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'test',
  async created() {
    await this.$nextTick();
    const dataset = Array.from({ length: 50000 }, () => [
      Math.floor(Math.random() * 496 + 2),
      Math.floor(Math.random() * 496 + 2)
    ]);

    console.log(dataset);

    const svg = d3
      .select('#test')
      .append('svg')
      .attr('height', '500')
      .attr('width', '500');

    const tooltip = d3
      .select('#test')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    const tipMouseIn = function (event, d) {
      const html = `${d[0]}, ${d[1]}`;
      tooltip
        .html(html)
        .style('left', event.pageX + 15 + 'px')
        .style('right', event.pageY - 28 + 'px')
        .transition()
        .duration(200)
        .style('opacity', 0.9);
    };

    const tipMouseOut = function () {
      tooltip.transition().duration(300).style('opacity', 0);
    };

    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('cx', d => d[0])
      .attr('cy', d => d[1])
      .attr('r', 2)
      .attr('fill', 'blue')
      .on('mouseover', tipMouseIn)
      .on('mouseout', tipMouseOut);
  }
};
</script>

<style lang="scss" scoped>
.test {
}
</style>
