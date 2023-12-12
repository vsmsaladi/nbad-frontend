import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const D3JSChart = ({ dataSource }) => { // Destructure dataSource from props

    console.log("chart: ", dataSource)

    const svgRef = useRef();

    useEffect(() => {
        if (dataSource.length === 0) {
            return;
        }

        const svg = d3.select(svgRef.current);
        const width = 400;
        const height = 400;
        const radius = Math.min(width, height) / 2;

        var colorScale = d3.scaleOrdinal()
            .domain(dataSource.map((v) => v.label))
            .range([
                '#ffcd56',
                '#ff6384',
                '#36a2eb',
                '#fd6b19',
                '#83FF33',
                '#F633FF',
                '#FF3333'
            ]);

        const pie = d3
            .pie()
            .sort(null)
            .value((d) => d.budget);

        const arc = d3
            .arc()
            .innerRadius(0)
            .outerRadius(radius);

        const g = svg
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        g.selectAll('pieces')
            .data(pie(dataSource))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d) => colorScale(d.data.item))
            .attr('stroke', '#121926')
            .style('stroke-width', '1px');

        const labelLocation = d3.arc().innerRadius(100).outerRadius(radius);

        g.selectAll('pieces')
            .data(pie(dataSource))
            .enter()
            .append('text')
            .text((d) => d.data.item)
            .attr(
                'transform',
                (d) => 'translate(' + labelLocation.centroid(d) + ')'
            )
            .style('text-anchor', 'middle')
            .style('font-size', 15);

    }, [dataSource]);

    return (
        <div className="chart-container" style={{ width: 450, height: 500 }}>
            <h2 style={{ textAlign: "center" }}>D3JS Pie Chart</h2>
            <svg ref={svgRef} width={400} height={400}>
                {dataSource.length === 0 && (
                    <text x="50%" y="50%" textAnchor="middle">Loading...</text>
                )}
            </svg>
        </div>
    );
};

export default D3JSChart;
