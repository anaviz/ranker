var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 550 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

x.domain([0,10]).nice();
y.domain([0,10]).nice();


angular.module('rankerApp', [])
  .controller('RankerCtrl', function RankerCtrl($scope) {
    $scope.items = [
      {name:'Doctor', x:5, y:5},
      {name:'Programmer', x:7, y:8}];
   
    $scope.X = {name:'Fun'};
    $scope.Y = {name:'Well-Paid'};
    var containerDiv = d3.select("#chart");

    var svg = containerDiv
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text($scope.X.name);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text($scope.Y.name);

    d3.select('svg g')
        .append('text')
        .attr({'id': 'nameLabel', 'x': 20, 'y': 420})
        .style({'font-size': '200%', 'font-weight': 'bold', 'fill': '#ddd'});

    $scope.addItem = function() {
      $scope.items.push({name:$scope.itemName, 
                          x:$scope.itemX, 
                          y:$scope.itemY});
      $scope.itemName = '';
      $scope.itemX = '';
      $scope.itemY = '';
      updateGraph($scope);
    };
   })
   .directive('gViz', function ($parse) {
      return {
        restrict: 'E',
        replace: true,
        template: '<div id="chart"></div>',

        link: function (scope, element, attrs) {
             updateGraph(scope);
             }
        }
      });

var updateGraph = function(scope) {
  var svg = d3.select("svg g");
  var xLab = svg.selectAll(".x.axis .label").text(scope.X.name);
  var yLab = svg.selectAll(".y.axis .label").text(scope.Y.name);
  svg.selectAll(".dot").remove();
  svg.selectAll(".dot").data(scope.items).enter()
                                    .append("circle")
                                    .attr("class", "dot")
                                    .attr("cx", function (d) { return x(d.x); })
                                    .attr("cy", function (d) { return y(d.y); })
                                    .attr("r",8)
                                    .style("fill", function(d) { return color(d.x*d.y); })
                                    .on('mouseover', function(d) {
                                      d3.select('svg g #nameLabel')
                                        .text(d.name)
                                        .transition()
                                        .style('opacity', 1);
                                    })
                                    .on('mouseout', function(d) {
                                      d3.select('svg g #nameLabel')
                                        .transition()
                                        .duration(1500)
                                        .style('opacity', 0);
                                    });
}