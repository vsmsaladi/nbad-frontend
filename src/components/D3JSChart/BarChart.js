import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef();
  console.log(data);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Aggregate budgets for each item
    const aggregatedData = d3.rollup(
      data,
      (v) => ({
        totalActualBudget: d3.sum(v, (d) => d.actualBudget),
        totalEstimatedBudget: d3.sum(v, (d) => d.estimatedBudget),
      }),
      (d) => d.item
    );

    const aggregatedArray = Array.from(aggregatedData, ([key, value]) => ({
      item: key,
      totalActualBudget: value.totalActualBudget,
      totalEstimatedBudget: value.totalEstimatedBudget,
    }));

    // D3.js logic for drawing the side-by-side bar chart
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);

    // Clear previous content
    svg.selectAll('*').remove();

    // Define a color scale
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const xScale = d3.scaleBand().domain(aggregatedArray.map((d) => d.item)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(aggregatedArray, (d) => Math.max(d.totalActualBudget, d.totalEstimatedBudget))]).range([height, 0]);

    // Define the gap width between actual and estimated budget bars
    const gapWidth = 5;

    // Draw actual budget bars
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('.actual-budget-bar')
      .data(aggregatedArray)
      .enter()
      .append('rect')
      .attr('class', 'actual-budget-bar')
      .attr('x', (d) => xScale(d.item))
      .attr('y', (d) => yScale(d.totalActualBudget))
      .attr('width', xScale.bandwidth() / 2 - gapWidth / 2) // Adjust width and position
      .attr('height', (d) => height - yScale(d.totalActualBudget))
      .attr('fill', (d, i) => colorScale(i));

    // Draw estimated budget bars
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('.estimated-budget-bar')
      .data(aggregatedArray)
      .enter()
      .append('rect')
      .attr('class', 'estimated-budget-bar')
      .attr('x', (d) => xScale(d.item) + xScale.bandwidth() / 2 + gapWidth / 2) // Adjust width and position
      .attr('y', (d) => yScale(d.totalEstimatedBudget))
      .attr('width', xScale.bandwidth() / 2 - gapWidth / 2) // Adjust width and position
      .attr('height', (d) => height - yScale(d.totalEstimatedBudget))
      .attr('fill', (d, i) => colorScale(i));

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(xScale));

    // Add Y axis
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef} width={600} height={400}></svg>;
};

export default BarChart;
