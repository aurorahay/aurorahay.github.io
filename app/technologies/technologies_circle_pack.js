(function () {
    'use strict';
    angular.module('ahay.technologies', []);
    var app = angular.module('ahay.technologies');

    function TechnologiesController($scope, $location) {
        var vm = this;
    }

    function link(scope, element, attrs, ctrl) {
        var TCP = "technologies-circle-pack";

        var margin = 20,
            diameter = 960;

        var color = d3.scale.linear()
            .domain([-1, 5])
            .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
            .interpolate(d3.interpolateHcl);

        var pack = d3.layout.pack()
            .padding(2)
            .size([diameter - margin, diameter - margin])
            .value(function(d) { return d.size; })

        var svg = d3.select(TCP).append("svg")
            .attr("width", diameter)
            .attr("height", diameter)
            .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        d3.select("svg").append("defs").attr("id", "mdef")

        d3.json("app/technologies/technologies.json", function(error, root) {
          if (error) throw error;

          var focus = root,
              nodes = pack.nodes(root),
              view;

          angular.forEach(nodes, function(node) {
            if (node.url) {
                console.log(node);

                d3.select("defs").append("pattern")
                    .attr("id", node.name)
                    .attr("x", 0)
                   .attr("y", 0)
                   .attr("width", 1)
                   .attr("height", 1);

                d3.select("pattern#" + node.name).append("image")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", node.r * 2)
                    .attr("height", node.r * 2)
                    .attr("xlink:href", node.url);

            }
          });

          var circle = svg.selectAll("circle")
              .data(nodes)
            .enter().append("circle")
              .attr("class", function(d) {
                  if (d.url) {
                    return;
                  }
                return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root";
              })
              //.style("fill", function(d) { return d.children ? color(d.depth) : null; })
              .style("fill", function(d) {
                    if (d.url) {
                        return "url(#" + d.name + ")";
                    }
                    return d.children ? color(d.depth) : null;
               });
              //.on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

          var text = svg.selectAll("text")
              .data(nodes)
            .enter().append("text")
              .attr("class", "label")
              .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
              .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
              .text(function(d) {
                if (d.url) {
                    return;
                }
                return d.name;
              });

          var node = svg.selectAll("circle,text");

          d3.select(TCP)
              .on("click", function() { zoom(root); });

          zoomTo([root.x, root.y, root.r * 2 + margin]);

          function zoom(d) {
            var focus0 = focus; focus = d;

            var transition = d3.transition()
                .duration(d3.event.altKey ? 7500 : 750)
                .tween("zoom", function(d) {
                  var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
                  return function(t) { zoomTo(i(t)); };
                });

            transition.selectAll("text")
              .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
                .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
                .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
                .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
          }

          function zoomTo(v) {
            var k = diameter / v[2]; view = v;
            node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
            circle.attr("r", function(d) {
                return d.r * k;
            });
          }
        });

        d3.select(self.frameElement).style("height", diameter + "px");
    }

    app.controller('ahay.hero.Technologies', TechnologiesController);

    app.directive('technologiesCirclePack', function () {
        return {
            restrict: 'EA',
            templateUrl: 'app/technologies/technologies.html',
            controller: 'ahay.hero.Technologies',
            controllerAs: 'vm',
            link: link,
            bindToController: true
        };
    });
})();