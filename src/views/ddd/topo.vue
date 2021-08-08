<template>
  <div class="topo">
    <div id="topo"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'topo',
  async mounted() {
    const width = 1400;
    const height = 600;

    const drag = simulation => {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    };

    const { nodes, links } = {
      nodes: Array.from({ length: 10 }, (v, i) => ({
        id: `node${i + 1}`,
        word: `node${i + 1}`,
        group: 1
      })),
      links: Array.from({ length: 9 }, (v, i) => ({
        source: `node${i + 2}`,
        target: 'node1',
        value: 10
      }))
    };

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id(d => d.id)
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    const svg = d3
      .select('#topo')
      .append('svg')
      .attr('viewBox', [0, 0, width, height])
      .style('font', '12px');

    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));

    const node = svg
      .append('g')
      .attr('fill', 'currentColor')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    node
      .append('circle')
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('fill', 'gray')
      .attr('r', 5);

    node
      .append('text')
      .attr('x', 8)
      .attr('y', '0.31em')
      .text(d => d.id)
      .clone(true)
      .lower()
      .attr('fill', 'black')
      .attr('stroke', 'white')
      .attr('stroke-width', 0.5);

    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });
  }
};
</script>

<style lang="scss" scoped>
.topo {
}
</style>
