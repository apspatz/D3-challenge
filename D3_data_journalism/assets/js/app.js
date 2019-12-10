// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv('./assets/data/data.csv').then(function(data){
    // Changing all string values to numbers
    data.forEach(function(d){
        d.age =+ d.age;
        d.ageMoe =+ d.ageMoe;
        d.healthcare =+ d.healthcare;
        d.healthcareHigh =+ d.healthcareHigh;
        d.healthcareLow =+ d.healthcareLow;
        d.income =+ d.income;
        d.incomeMoe =+ d.incomeMoe;
        d.obesity =+ d.obesity;
        d.obesityHigh =+ d.obesityHigh;
        d.obesityLow =+ d.obesityLow;
        d.poverty =+ d.poverty;
        d.povertyMoe =+ d.povertyMoe;
        d.smokes =+ d.smokes;
        d.smokesHigh =+ d.smokesHigh;
        d.smokesLow =+ d.smokesLow;
    });
    console.log(data);

    // Creating axes based on age (x) and healthcare (y) values.
    var xScale = d3.scaleLinear().domain([d3.min(data, data => data.age)-2, d3.max(data, data=>data.age)+2])
                    .range([0, chartWidth]);
    var yScale = d3.scaleLinear().domain(d3.extent(data, data => data.healthcare)).range([chartHeight,0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    chartGroup.append("g").call(leftAxis);
    chartGroup.append("g").attr("transform", `translate(0, ${chartHeight})`).call(bottomAxis);

    // Drawing points
    var circlesGroup = chartGroup.selectAll('circle').data(data).enter().append('circle')
                                  .attr('cx', d=>xScale(d.age))
                                  .attr('cy', d=>yScale(d.healthcare))
                                  .attr('r', '15')
                                  .classed('stateCircle',true)
    
    // Create axes labels
    chartGroup.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 40)
                .attr("x", 0 - (height / 2))
                .attr("dy", "1em")
                // .attr("class", "axisText")
                .text("Healthcare");

    chartGroup.append("text")
                .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
                // .attr("class", "axisText")
                .text("Age");
})