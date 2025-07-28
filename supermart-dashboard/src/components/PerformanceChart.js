import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PerformanceChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.model))
      .range([40, width - 20])
      .padding(0.3);
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.rmse) * 1.1])
      .range([height - 30, 20]);

    // Clear and set up
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .html('');

    // Axes
    svg.append('g')
      .attr('transform', `translate(0,${height - 30})`)
      .call(d3.axisBottom(x));
    svg.append('g')
      .attr('transform', `translate(40,0)`)
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.model))
        .attr('y', d => y(d.rmse))
        .attr('width', x.bandwidth())
        .attr('height', d => height - 30 - y(d.rmse));

    // Labels
    svg.selectAll('.label')
      .data(data)
      .enter()
      .append('text')
        .attr('class', 'label')
        .attr('x', d => x(d.model) + x.bandwidth()/2)
        .attr('y', d => y(d.rmse) - 5)
        .attr('text-anchor', 'middle')
        .text(d => d.rmse);
  }, [data, width, height]);

  return <svg ref={svgRef} />;
};

export default PerformanceChart;
