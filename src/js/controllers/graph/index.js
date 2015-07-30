var Group = require("../../models/group");

var _ = require("lodash");

var d3 = require("d3");

function Graph( container ){
	var _this= this;
  this.graphContainer = container;
   Group.bind("refresh", function(){ 

   	var all = Group.all();

   	var groups = {};
   	for (var i = all.length - 1; i >= 0; i--) {
   		var op = all[i];

   		var group = groups[ op.Type__c ]
   		if( !group ) group = { type: op.Type__c, amount: 0};
   		group.amount += op.Amount__c;
   		groups[op.Type__c] = group;
   	};

   	_this.render(groups);

   });


}


Graph.prototype.render = function(data){
  
  //Data
  var chartdata =  _.values(data);
 
  chartdata.sort( function(a,b){
    if( a.type > b.type ) return 1;
    else if( a.type < b.type ) return -1;
    return 0;
  })

 	//Standard way of setting up dimensions
  var margin = { top: 25, right: 0, bottom: 50, left: 40 };

  //define size
  var height = 400 - margin.top - margin.bottom,
  width = this.graphContainer.offsetWidth - margin.left - margin.right,
  barWidth = 40,
  barOffset = 20;

  //Scales
  var yScale = d3.scale.linear().domain([ 0, d3.max( chartdata, function(d){ return d.amount; } ) ]).range([ height, 0])
  
  var xScale = d3.scale.ordinal().domain(chartdata.map(function(d) { return d.type; })).rangeRoundBands([ margin.left , width], .1);

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")

   var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(4);

  // Main SVG Container
  var svg = d3.select(this.graphContainer).append('svg')
	.attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

 	//Bars
    var bar = svg.selectAll('rect')
    .data(chartdata)
    .enter()
    .append("g")

    bar.append('rect')
    .attr("class", "fill-blue")
    .attr('width', xScale.rangeBand() )
    .attr('height', function (data) { 
      return height - yScale( data.amount );
    })
    .attr('x', function (data, i) { return xScale(data.type) })
    .attr('y', function (data) { 
      return yScale( data.amount ) - margin.bottom;
    })
    .attr("type", function(){ return data.type } )
    .on("click", function(d,i){ 
      Group.trigger("SELECT", d);
    })
    .on("mouseover", function(d,i){ 
      d3.select(this).classed("fill-blue",false).classed("fill-red",true);
    })
    .on("mouseout", function(d,i){ 
      d3.select(this).classed("fill-red",false).classed("fill-blue",true);
    })

  
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + ( height - 33 ) + ")")
      .attr("class","fill-gray-dark")
      .call(xAxis)
      .selectAll("text")
      .style("font-size", "11pt");

 		svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(20," +  ( -1 *  margin.top  ) + ")")
      .attr("class","fill-gray-dark")
      .call(yAxis)
      .selectAll("text")
      .style("font-size", "11pt");


}

  module.exports = Graph;