# Adapter Pattern Code Sample
```javascript
(function () {
    "use strict";
    angular
        .module('ahay.services')
        .factory('graphModelAdapter', graphModelAdapter);
    
    function graphModelAdapter() {
        return {
            convertModelToGraphModel: convertModelToGraphModel,
            getBoundsForGraphModel: getBoundsForGraphModel
        };
    }
    
    /**
     Adapts data to our graph directive
        @param: {object} data - The data in question to convert to a graph
        @param: {string} x - The path that leads to the data's 'x' property for the graph
        @param: {string} y - The path that leads to the data's 'y' property for the graph
        @param: {[string]} (optional) extraProperties - The list of paths that leads to the data's extra properties, i.e. a property that indicates an abnormal value
        returns: an array of plot points that will look something like this: [{x:val, y:val, extraProperty1: val, extraProperty2: val}, {x:val, y:val, extraProperty: val}, ...]
    */
    function convertModelToGraphModel(data, x, y, extraProperties) {
        return _.filter(_.map(data, function(object, index) {
        var point = {};
    
        point.x = _.get(object, x, null);
    
        point.y = _.get(object, y, null);
    
        point.index = index;
    
        _.forEach(extraProperties, function(property){
            point[property] = _.get(object, property, null);
        });    
            if(point.y === '-') {
                return null;
            } else {
                return point;
            }
        }), function(point) {
            return (_.get(point, 'x') !== '-') && _.get(point, 'x');
        });
    }
    
    /**
     Get high and low bounds for an axis (x or y)
        @param: {object} data - The data in question to convert to a graph
        @param: {string} path - The path that leads to the data's 'x' property for the graph
        @param: {boolean} isDate (optional) - Does this range happen to be a date range? Please indicate if so
        returns: an object that has the highBounds and lowBounds for a particular axis for the graph {highBounds: value, lowBounds: value}
    */
    function getBoundsForGraphModel(data, path, isDate) {
        var bounds = {};
        var lowBounds;
        var highBounds;
    
        //cannot sort dates by string, need to check and sort by moment objects
        if (isDate) {
            lowBounds = _.min(data, function(d) {
                return moment(_.get(d, path, null));
            });
    
            bounds.lowBounds = moment(_.get(lowBounds, path, null));
    
            highBounds = _.max(data, function(d) {
                return moment(_.get(d, path, null));
            });
    
            bounds.highBounds = moment(_.get(highBounds, path, null));
        } else {
            lowBounds = _.min(data, function (o) {
                return parseFloat(_.get(o, path));
            });
    
            bounds.lowBounds = parseFloat(_.get(lowBounds, path, null));
    
            highBounds = _.max(data, function (o) {
                return parseFloat(_.get(o, path));
            });
    
            bounds.highBounds = parseFloat(_.get(highBounds, path, null));
        }
        if(data){
            bounds.dataLength = data.length;
        }
        return bounds;
    }
    
})();
    
describe('services: graphModelAdapter', function () {
    "use strict";
    var graphModelAdapter;
    beforeEach( function(){
        angular.mock.module('ahay.services');
        inject(function(_graphModelAdapter_){
        graphModelAdapter = _graphModelAdapter_;
        })
    });
    
    describe('convertModelToGraphModel', function(){
        it('should convert given data to graph data', function() {
        var dataModel = [
            {date: '1/2/2016', value: '96.3', extraProperty: true},
            {date: '1/3/2016', value: '97.6', extraProperty: false},
            {date: '1/4/2016', value: '98.4', extraProperty: false}
        ];
    
        var expectedGraphModel = [
            {x: '1/2/2016', y: '96.3', index: 0},
            {x: '1/3/2016', y: '97.6', index: 1},
            {x: '1/4/2016', y: '98.4', index: 2}
        ];
    
        var convertedGraph = graphModelAdapter.convertModelToGraphModel(dataModel, 'date', 'value');
    
        expect(convertedGraph).toEqual(expectedGraphModel);
    });
    
        it('should convert given data to graph data with extra properties per point', function() {
            var dataModel = [
                {date: '1/2/2016', value: '96.3', extraProperty: true},
                {date: '1/3/2016', value: '97.6', extraProperty: false},
                {date: '1/4/2016', value: '98.4', extraProperty: false}
            ];
        
            var expectedGraphModel = [
                {x: '1/2/2016', y: '96.3', extraProperty: true, index: 0},
                {x: '1/3/2016', y: '97.6', extraProperty: false, index: 1},
                {x: '1/4/2016', y: '98.4', extraProperty: false, index: 2}
            ];
        
            var convertedGraph = graphModelAdapter.convertModelToGraphModel(dataModel, 'date', 'value', ['extraProperty']);
        
            expect(convertedGraph).toEqual(expectedGraphModel);
        });
    
        it('should convert given data to graph data with null points', function() {
            var dataModel = [
                {value: '96.3', extraProperty: true},
                {date: '1/3/2016', extraProperty: false},
                {date: '1/4/2016', value: '98.4', extraProperty: false}
            ];
        
            var expectedGraphModel = [
                {x: '1/3/2016', y: null, index: 1},
                {x: '1/4/2016', y: '98.4', index: 2}
            ];
        
            var convertedGraph = graphModelAdapter.convertModelToGraphModel(dataModel, 'date', 'value');
        
            expect(convertedGraph).toEqual(expectedGraphModel);
        });
    
    });
    
    describe('', function(){
        it('should return the high and low bounds for a graph with dates', function(){
        var dataModel = [
            {date: '1/2/2016', value: '96.3', extraProperty: true},
            {date: '1/3/2015', value: '97.6', extraProperty: false},
            {date: '1/4/2016', value: '98.4', extraProperty: false}
        ];
    
            var expectedModel = {highBounds: moment('1/4/2016'), lowBounds: moment('1/3/2015'), dataLength: 3};
        
            var actualModel = graphModelAdapter.getBoundsForGraphModel(dataModel, 'date', true);
        
            expect(actualModel).toEqual(expectedModel);
        });
    
        it('should return the high and low bounds for a graph (not date)', function(){
            var dataModel = [
                {date: '1/2/2016', value: '96.3', extraProperty: true},
                {date: '1/3/2015', value: '97.6', extraProperty: false},
                {date: '1/4/2016', value: '98.4', extraProperty: false}
            ];
        
            var expectedModel = {highBounds: 98.4, lowBounds: 96.3, dataLength: 3};
        
            var actualModel = graphModelAdapter.getBoundsForGraphModel(dataModel, 'value');
        
            expect(actualModel).toEqual(expectedModel);
        });
    
        it('should return the high and low bounds for a graph... using the convertToGraphModel method', function(){
            var dataModel = [
                {date: '1/2/2016', value: '96.3', extraProperty: true},
                {date: '1/3/2016', value: '97.6', extraProperty: false},
                {date: '1/4/2016', value: '98.4', extraProperty: false}
            ];
        
            var convertedGraph = graphModelAdapter.convertModelToGraphModel(dataModel, 'date', 'value', ['extraProperty']);
        
            var expectedRangeX = {highBounds: moment('1/4/2016'), lowBounds: moment('1/2/2016'), dataLength: 3};
            var expectedRangeY = {highBounds:98.4, lowBounds: 96.3, dataLength: 3};
        
            var actualRangeX = graphModelAdapter.getBoundsForGraphModel(convertedGraph, 'x', true);
            var actualRangeY = graphModelAdapter.getBoundsForGraphModel(convertedGraph, 'y', false);
        
            expect(actualRangeX).toEqual(expectedRangeX);
            expect(actualRangeY).toEqual(expectedRangeY);
        });
    
    });
});
```