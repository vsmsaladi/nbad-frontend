// LineGraph.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LineChart = ({ data }) => {
  const svgRef = useRef();
  console.log(data);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // D3.js logic for drawing the line chart
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    // Parse date strings to Date objects
    // const parseDate = d3.timeParse('%b');

    // Convert date strings to Date objects and sort by date
    // data.forEach((d) => {
    //   d.date = parseDate(d.month);
    // });

    // data.sort((a, b) => a.date - b.date);

    const customOrder = ['Jan', 'Feb', 'Mar', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Sort data by the custom order
    data.sort((a, b) => customOrder.indexOf(a.month) - customOrder.indexOf(b.month));


    // Define x and y scales
    const xScale = d3.scaleBand().domain(data.map((d) => d.month)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => Math.max(d.actualBudget, d.estimatedBudget))]).range([height, 0]);

    // Define actual budget line
    const actualLine = d3.line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.actualBudget));

    // Define estimated budget line
    const estimatedLine = d3.line()
      .x((d) => xScale(d.month) + xScale.bandwidth() / 2)
      .y((d) => yScale(d.estimatedBudget));

    // Draw actual budget line
    svg.append('path')
      .data([data])
      .attr('class', 'actual-line')
      .attr('d', actualLine)
      .attr('fill', 'none')
      .attr('stroke', 'blue');

    // Draw estimated budget line
    svg.append('path')
      .data([data])
      .attr('class', 'estimated-line')
      .attr('d', estimatedLine)
      .attr('fill', 'none')
      .attr('stroke', 'green');

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));

    const legend = svg.append('g')
      .attr('transform', `translate(${width + margin.left + 10},${margin.top})`);

    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'blue');

    legend.append('text')
      .attr('x', 20)
      .attr('y', 5)
      .text('Actual Budget');

    legend.append('rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('y', 20)
      .attr('fill', 'green');

    legend.append('text')
      .attr('x', 20)
      .attr('y', 25)
      .text('Estimated Budget');

  }, [data]);

  return <svg ref={svgRef} width={800} height={400}></svg>;
};

export default LineChart;
