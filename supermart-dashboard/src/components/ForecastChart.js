import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ForecastChart = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Parse dates
    const parsed = data.map(d => ({
      ds: d3.timeParse('%Y-%m-%d')(d.ds),
      y: d.y,
      yhat: d.yhat
    }));

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(parsed, d => d.ds))
      .range([40, width - 20]);
    const y = d3.scaleLinear()
      .domain([0, d3.max(parsed, d => Math.max(d.y, d.yhat)) * 1.1])
      .range([height - 30, 20]);

    // Line generators
    const lineActual = d3.line()
      .x(d => x(d.ds))
      .y(d => y(d.y));
    const linePred = d3.line()
      .x(d => x(d.ds))
      .y(d => y(d.yhat));

    // Clear and set up SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .html('');

    // Axes
    svg.append('g')
      .attr('transform', `translate(0,${height - 30})`)
      .call(d3.axisBottom(x).ticks(5));
    svg.append('g')
      .attr('transform', `translate(40,0)`)
      .call(d3.axisLeft(y));

    // Actual line
    svg.append('path')
      .datum(parsed)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', lineActual);

    // Forecast line
    svg.append('path')
      .datum(parsed)
      .attr('fill', 'none')
      .attr('stroke', 'orange')
      .attr('stroke-dasharray', '4 2')
      .attr('stroke-width', 2)
      .attr('d', linePred);

    // Legend
    svg.append('text').attr('x', width - 120).attr('y', 30).text('Actual');
    svg.append('text').attr('x', width - 120).attr('y', 50).text('Forecast');
  }, [data, width, height]);

  return <svg ref={svgRef} />;
};

export default ForecastChart;
