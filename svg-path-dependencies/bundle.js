(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NodeModel_1 = require("./NodeModel");
var AnchorModel = (function (_super) {
    __extends(AnchorModel, _super);
    function AnchorModel(id, x, y, width, height, position) {
        var _this = this;
        _super.call(this, id, x, y);
        this.position = position;
        this.updatePosition = function (x, y, containerWidth, containerHeight) {
            if (_this.position) {
                //todo: implement different positions
                _this.x(x + containerWidth);
                _this.y(y + containerHeight / 2 - _this.height() / 2);
            }
        };
        this.width = ko.observable(width);
        this.height = ko.observable(height);
    }
    ;
    return AnchorModel;
}(NodeModel_1.NodeModel));
exports.AnchorModel = AnchorModel;

},{"./NodeModel":4}],2:[function(require,module,exports){
var Connectable = (function () {
    function Connectable(id, x, y) {
        var _this = this;
        this.equals = function (o) {
            return _this.id() === o.id();
        };
        this.id = ko.observable(id);
        this.anchors = ko.observableArray([]);
        this.x = ko.observable(x);
        this.y = ko.observable(y);
    }
    ;
    Connectable.prototype.addAnchor = function (node) {
        this.anchors.push(node);
    };
    return Connectable;
}());
exports.Connectable = Connectable;

},{}],3:[function(require,module,exports){
var _instance;
var LayoutService = (function () {
    function LayoutService() {
        var _this = this;
        this.init = function (model) {
            _this.model = model;
            model.zones().forEach(function (zone) {
                zone.x.subscribe(function (newValue) { return _this.onZoneChanged(zone); });
                zone.y.subscribe(function (newValue) { return _this.onZoneChanged(zone); });
                zone.width.subscribe(function (newValue) { return _this.onZoneChanged(zone); });
                zone.height.subscribe(function (newValue) { return _this.onZoneChanged(zone); });
                _this.onZoneChanged(zone);
            });
            /*   model.paths().forEach(path=> {
             path.nodes.filter(item=>item.isAnchor === true).forEach(node=> {
             node.x.subscribe((newValue:number)=>this.calculatePath(path));
             node.y.subscribe((newValue:number)=>this.calculatePath(path));
             })
             });*/
        };
        /*calculateAll=():void=>
         {
         this.model.zones().forEach(zone=>this.calculateZoneAnchors(zone));
         };*/
        /* updateModel = ():void=> {
         let expression:string;
         if (this.nodes.length === 4) {
         expression = "M " +
         this.nodes[0].toString() + ",C " + this.nodes[1].toString() + " " + this.nodes[2].toString() + "," + this.nodes[3].toString();
         }
         else if (this.nodes.length === 2) {
         expression = "M " + ((this.nodes[0].toString()) + " " + (this.nodes[1].toString()));
         }
         else throw new Error("not implemented");
    
         this.pathModel.svgPath(expression);
         };*/
        this.calculatePath = function (path) {
            var expression;
            /* if (this.nodes.length === 4) {
             expression = "M " +
             this.nodes[0].toString() + ",C " + this.nodes[1].toString() + " " + this.nodes[2].toString() + "," + this.nodes[3].toString();
             }
             else if (this.nodes.length === 2) {
             expression = "M " + ((this.nodes[0].toString()) + " " + (this.nodes[1].toString()));
             }
             else throw new Error("not implemented");*/
            expression = "M " + ((path.source.anchors()[0].toString()) + " " + (path.target.anchors()[0].toString()));
            path.svgPath(expression);
        };
        this.onZoneChanged = function (zone) {
            zone.anchors().forEach(function (anchor) {
                anchor.updatePosition(zone.x(), zone.y(), zone.width(), zone.height());
                /* anchor.x(zone.x()+zone.width());
                 anchor.y(zone.y());*/
                _this.model.paths().filter(function (path) { return path.source.equals(zone); }).forEach(function (path) { return _this.calculatePath(path); });
            });
        };
    }
    LayoutService.instance = function () {
        if (!_instance)
            _instance = new LayoutService();
        return _instance;
    };
    return LayoutService;
}());
exports.LayoutService = LayoutService;

},{}],4:[function(require,module,exports){
var NodeModel = (function () {
    function NodeModel(id, x, y) {
        var _this = this;
        this.toString = function () {
            return Math.round(_this.x() * 100) / 100 + " " + Math.round(_this.y() * 100) / 100;
        };
        this.id = ko.observable(id);
        this.x = ko.observable(x);
        this.y = ko.observable(y);
    }
    return NodeModel;
}());
exports.NodeModel = NodeModel;

},{}],5:[function(require,module,exports){
var PathModel = (function () {
    function PathModel(id, source, target) {
        this.nodes = [];
        this.id = ko.observable(id);
        this.svgPath = ko.observable("");
        this.source = source;
        this.target = target;
    }
    return PathModel;
}());
exports.PathModel = PathModel;

},{}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Connectable_1 = require("./Connectable");
var TargetModel = (function (_super) {
    __extends(TargetModel, _super);
    function TargetModel(id, x, y) {
        var _this = this;
        _super.call(this, id, x, y);
        this.getAltId = function () {
            return _this.id() + "_alt";
        };
        this.altId = ko.computed(this.getAltId, this);
    }
    ;
    return TargetModel;
}(Connectable_1.Connectable));
exports.TargetModel = TargetModel;

},{"./Connectable":2}],7:[function(require,module,exports){
var ViewModel = (function () {
    function ViewModel() {
        this.zones = ko.observableArray([]);
        this.anchors = ko.observableArray([]);
        this.paths = ko.observableArray([]);
        //todo fieldRemove: remove event handlers
    }
    return ViewModel;
}());
exports.ViewModel = ViewModel;

},{}],8:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Connectable_1 = require("./Connectable");
var ZoneModel = (function (_super) {
    __extends(ZoneModel, _super);
    function ZoneModel(id, x, y, height, width) {
        _super.call(this, id, x, y);
        this.height = ko.observable(height);
        this.width = ko.observable(width);
    }
    ;
    return ZoneModel;
}(Connectable_1.Connectable));
exports.ZoneModel = ZoneModel;

},{"./Connectable":2}],9:[function(require,module,exports){
var jqDraggableResizable = (function () {
    function jqDraggableResizable(ko) {
        var _this = this;
        this.ko = ko;
        this.apply = function () {
            _this.ko.bindingHandlers.jqDraggableResizable = {
                init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                    var obj = valueAccessor();
                    var $elem = $(element);
                    element.dataObj = obj;
                    $elem.resizable({
                        resize: function (event, ui) {
                            element.dataObj.height(ui.size.height);
                            element.dataObj.width(ui.size.width);
                        }
                    });
                    $elem.draggable({
                        drag: function (event, ui) {
                            element.dataObj.x(ui.position.left);
                            element.dataObj.y(ui.position.top);
                        }
                    });
                }
            };
        };
    }
    return jqDraggableResizable;
}());
exports.jqDraggableResizable = jqDraggableResizable;

},{}],10:[function(require,module,exports){
var ZoneModel_1 = require("./core/ZoneModel");
var ViewModel_1 = require("./core/ViewModel");
var jqDraggableResizable_1 = require("./core/jqDraggableResizable");
var TargetModel_1 = require("./core/TargetModel");
var PathModel_1 = require("./core/PathModel");
var LayoutService_1 = require("./core/LayoutService");
var AnchorModel_1 = require("./core/AnchorModel");
$(document).ready(function () {
    new jqDraggableResizable_1.jqDraggableResizable(ko).apply();
    var viewModel = new ViewModel_1.ViewModel();
    ko.applyBindings(viewModel);
    var zoneAnchor = new AnchorModel_1.AnchorModel(chance.guid(), 100, 100, 20, 20, "right");
    var someTargetAnchor = new AnchorModel_1.AnchorModel(chance.guid(), 300, 300, 20, 20);
    var zone = new ZoneModel_1.ZoneModel(chance.guid(), 100, 100, 100, 100);
    zone.addAnchor(zoneAnchor);
    var targetZone = new TargetModel_1.TargetModel(chance.guid(), 0, 0);
    targetZone.addAnchor(someTargetAnchor);
    var path = new PathModel_1.PathModel(chance.guid(), zone, targetZone);
    viewModel.anchors.push(someTargetAnchor);
    viewModel.anchors.push(zoneAnchor);
    zone.anchors.push(zoneAnchor);
    viewModel.zones.push(zone);
    viewModel.paths.push(path);
    LayoutService_1.LayoutService.instance().init(viewModel);
});

},{"./core/AnchorModel":1,"./core/LayoutService":3,"./core/PathModel":5,"./core/TargetModel":6,"./core/ViewModel":7,"./core/ZoneModel":8,"./core/jqDraggableResizable":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL1VzZXJzL2dyb292L0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb3JlL0FuY2hvck1vZGVsLmpzIiwiY29yZS9Db25uZWN0YWJsZS5qcyIsImNvcmUvTGF5b3V0U2VydmljZS5qcyIsImNvcmUvTm9kZU1vZGVsLmpzIiwiY29yZS9QYXRoTW9kZWwuanMiLCJjb3JlL1RhcmdldE1vZGVsLmpzIiwiY29yZS9WaWV3TW9kZWwuanMiLCJjb3JlL1pvbmVNb2RlbC5qcyIsImNvcmUvanFEcmFnZ2FibGVSZXNpemFibGUuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59O1xyXG52YXIgTm9kZU1vZGVsXzEgPSByZXF1aXJlKFwiLi9Ob2RlTW9kZWxcIik7XHJcbnZhciBBbmNob3JNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoQW5jaG9yTW9kZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBBbmNob3JNb2RlbChpZCwgeCwgeSwgd2lkdGgsIGhlaWdodCwgcG9zaXRpb24pIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIGlkLCB4LCB5KTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbiA9IGZ1bmN0aW9uICh4LCB5LCBjb250YWluZXJXaWR0aCwgY29udGFpbmVySGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGlmIChfdGhpcy5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgLy90b2RvOiBpbXBsZW1lbnQgZGlmZmVyZW50IHBvc2l0aW9uc1xyXG4gICAgICAgICAgICAgICAgX3RoaXMueCh4ICsgY29udGFpbmVyV2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMueSh5ICsgY29udGFpbmVySGVpZ2h0IC8gMiAtIF90aGlzLmhlaWdodCgpIC8gMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBrby5vYnNlcnZhYmxlKHdpZHRoKTtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGtvLm9ic2VydmFibGUoaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIHJldHVybiBBbmNob3JNb2RlbDtcclxufShOb2RlTW9kZWxfMS5Ob2RlTW9kZWwpKTtcclxuZXhwb3J0cy5BbmNob3JNb2RlbCA9IEFuY2hvck1vZGVsO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1BbmNob3JNb2RlbC5qcy5tYXAiLCJ2YXIgQ29ubmVjdGFibGUgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gQ29ubmVjdGFibGUoaWQsIHgsIHkpIHtcclxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZXF1YWxzID0gZnVuY3Rpb24gKG8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzLmlkKCkgPT09IG8uaWQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaWQgPSBrby5vYnNlcnZhYmxlKGlkKTtcclxuICAgICAgICB0aGlzLmFuY2hvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gICAgICAgIHRoaXMueCA9IGtvLm9ic2VydmFibGUoeCk7XHJcbiAgICAgICAgdGhpcy55ID0ga28ub2JzZXJ2YWJsZSh5KTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIENvbm5lY3RhYmxlLnByb3RvdHlwZS5hZGRBbmNob3IgPSBmdW5jdGlvbiAobm9kZSkge1xyXG4gICAgICAgIHRoaXMuYW5jaG9ycy5wdXNoKG5vZGUpO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBDb25uZWN0YWJsZTtcclxufSgpKTtcclxuZXhwb3J0cy5Db25uZWN0YWJsZSA9IENvbm5lY3RhYmxlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db25uZWN0YWJsZS5qcy5tYXAiLCJ2YXIgX2luc3RhbmNlO1xyXG52YXIgTGF5b3V0U2VydmljZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBMYXlvdXRTZXJ2aWNlKCkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pbml0ID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcbiAgICAgICAgICAgIF90aGlzLm1vZGVsID0gbW9kZWw7XHJcbiAgICAgICAgICAgIG1vZGVsLnpvbmVzKCkuZm9yRWFjaChmdW5jdGlvbiAoem9uZSkge1xyXG4gICAgICAgICAgICAgICAgem9uZS54LnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uWm9uZUNoYW5nZWQoem9uZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgem9uZS55LnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uWm9uZUNoYW5nZWQoem9uZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgem9uZS53aWR0aC5zdWJzY3JpYmUoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHJldHVybiBfdGhpcy5vblpvbmVDaGFuZ2VkKHpvbmUpOyB9KTtcclxuICAgICAgICAgICAgICAgIHpvbmUuaGVpZ2h0LnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHsgcmV0dXJuIF90aGlzLm9uWm9uZUNoYW5nZWQoem9uZSk7IH0pO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMub25ab25lQ2hhbmdlZCh6b25lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8qICAgbW9kZWwucGF0aHMoKS5mb3JFYWNoKHBhdGg9PiB7XHJcbiAgICAgICAgICAgICBwYXRoLm5vZGVzLmZpbHRlcihpdGVtPT5pdGVtLmlzQW5jaG9yID09PSB0cnVlKS5mb3JFYWNoKG5vZGU9PiB7XHJcbiAgICAgICAgICAgICBub2RlLnguc3Vic2NyaWJlKChuZXdWYWx1ZTpudW1iZXIpPT50aGlzLmNhbGN1bGF0ZVBhdGgocGF0aCkpO1xyXG4gICAgICAgICAgICAgbm9kZS55LnN1YnNjcmliZSgobmV3VmFsdWU6bnVtYmVyKT0+dGhpcy5jYWxjdWxhdGVQYXRoKHBhdGgpKTtcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICB9KTsqL1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgLypjYWxjdWxhdGVBbGw9KCk6dm9pZD0+XHJcbiAgICAgICAgIHtcclxuICAgICAgICAgdGhpcy5tb2RlbC56b25lcygpLmZvckVhY2goem9uZT0+dGhpcy5jYWxjdWxhdGVab25lQW5jaG9ycyh6b25lKSk7XHJcbiAgICAgICAgIH07Ki9cclxuICAgICAgICAvKiB1cGRhdGVNb2RlbCA9ICgpOnZvaWQ9PiB7XHJcbiAgICAgICAgIGxldCBleHByZXNzaW9uOnN0cmluZztcclxuICAgICAgICAgaWYgKHRoaXMubm9kZXMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgIGV4cHJlc3Npb24gPSBcIk0gXCIgK1xyXG4gICAgICAgICB0aGlzLm5vZGVzWzBdLnRvU3RyaW5nKCkgKyBcIixDIFwiICsgdGhpcy5ub2Rlc1sxXS50b1N0cmluZygpICsgXCIgXCIgKyB0aGlzLm5vZGVzWzJdLnRvU3RyaW5nKCkgKyBcIixcIiArIHRoaXMubm9kZXNbM10udG9TdHJpbmcoKTtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBlbHNlIGlmICh0aGlzLm5vZGVzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICBleHByZXNzaW9uID0gXCJNIFwiICsgKCh0aGlzLm5vZGVzWzBdLnRvU3RyaW5nKCkpICsgXCIgXCIgKyAodGhpcy5ub2Rlc1sxXS50b1N0cmluZygpKSk7XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7XHJcbiAgICBcclxuICAgICAgICAgdGhpcy5wYXRoTW9kZWwuc3ZnUGF0aChleHByZXNzaW9uKTtcclxuICAgICAgICAgfTsqL1xyXG4gICAgICAgIHRoaXMuY2FsY3VsYXRlUGF0aCA9IGZ1bmN0aW9uIChwYXRoKSB7XHJcbiAgICAgICAgICAgIHZhciBleHByZXNzaW9uO1xyXG4gICAgICAgICAgICAvKiBpZiAodGhpcy5ub2Rlcy5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgIGV4cHJlc3Npb24gPSBcIk0gXCIgK1xyXG4gICAgICAgICAgICAgdGhpcy5ub2Rlc1swXS50b1N0cmluZygpICsgXCIsQyBcIiArIHRoaXMubm9kZXNbMV0udG9TdHJpbmcoKSArIFwiIFwiICsgdGhpcy5ub2Rlc1syXS50b1N0cmluZygpICsgXCIsXCIgKyB0aGlzLm5vZGVzWzNdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLm5vZGVzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgZXhwcmVzc2lvbiA9IFwiTSBcIiArICgodGhpcy5ub2Rlc1swXS50b1N0cmluZygpKSArIFwiIFwiICsgKHRoaXMubm9kZXNbMV0udG9TdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgZWxzZSB0aHJvdyBuZXcgRXJyb3IoXCJub3QgaW1wbGVtZW50ZWRcIik7Ki9cclxuICAgICAgICAgICAgZXhwcmVzc2lvbiA9IFwiTSBcIiArICgocGF0aC5zb3VyY2UuYW5jaG9ycygpWzBdLnRvU3RyaW5nKCkpICsgXCIgXCIgKyAocGF0aC50YXJnZXQuYW5jaG9ycygpWzBdLnRvU3RyaW5nKCkpKTtcclxuICAgICAgICAgICAgcGF0aC5zdmdQYXRoKGV4cHJlc3Npb24pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5vblpvbmVDaGFuZ2VkID0gZnVuY3Rpb24gKHpvbmUpIHtcclxuICAgICAgICAgICAgem9uZS5hbmNob3JzKCkuZm9yRWFjaChmdW5jdGlvbiAoYW5jaG9yKSB7XHJcbiAgICAgICAgICAgICAgICBhbmNob3IudXBkYXRlUG9zaXRpb24oem9uZS54KCksIHpvbmUueSgpLCB6b25lLndpZHRoKCksIHpvbmUuaGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICAgICAgLyogYW5jaG9yLngoem9uZS54KCkrem9uZS53aWR0aCgpKTtcclxuICAgICAgICAgICAgICAgICBhbmNob3IueSh6b25lLnkoKSk7Ki9cclxuICAgICAgICAgICAgICAgIF90aGlzLm1vZGVsLnBhdGhzKCkuZmlsdGVyKGZ1bmN0aW9uIChwYXRoKSB7IHJldHVybiBwYXRoLnNvdXJjZS5lcXVhbHMoem9uZSk7IH0pLmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHsgcmV0dXJuIF90aGlzLmNhbGN1bGF0ZVBhdGgocGF0aCk7IH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgTGF5b3V0U2VydmljZS5pbnN0YW5jZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIV9pbnN0YW5jZSlcclxuICAgICAgICAgICAgX2luc3RhbmNlID0gbmV3IExheW91dFNlcnZpY2UoKTtcclxuICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBMYXlvdXRTZXJ2aWNlO1xyXG59KCkpO1xyXG5leHBvcnRzLkxheW91dFNlcnZpY2UgPSBMYXlvdXRTZXJ2aWNlO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYXlvdXRTZXJ2aWNlLmpzLm1hcCIsInZhciBOb2RlTW9kZWwgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gTm9kZU1vZGVsKGlkLCB4LCB5KSB7XHJcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChfdGhpcy54KCkgKiAxMDApIC8gMTAwICsgXCIgXCIgKyBNYXRoLnJvdW5kKF90aGlzLnkoKSAqIDEwMCkgLyAxMDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmlkID0ga28ub2JzZXJ2YWJsZShpZCk7XHJcbiAgICAgICAgdGhpcy54ID0ga28ub2JzZXJ2YWJsZSh4KTtcclxuICAgICAgICB0aGlzLnkgPSBrby5vYnNlcnZhYmxlKHkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIE5vZGVNb2RlbDtcclxufSgpKTtcclxuZXhwb3J0cy5Ob2RlTW9kZWwgPSBOb2RlTW9kZWw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU5vZGVNb2RlbC5qcy5tYXAiLCJ2YXIgUGF0aE1vZGVsID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGZ1bmN0aW9uIFBhdGhNb2RlbChpZCwgc291cmNlLCB0YXJnZXQpIHtcclxuICAgICAgICB0aGlzLm5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5pZCA9IGtvLm9ic2VydmFibGUoaWQpO1xyXG4gICAgICAgIHRoaXMuc3ZnUGF0aCA9IGtvLm9ic2VydmFibGUoXCJcIik7XHJcbiAgICAgICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XHJcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gUGF0aE1vZGVsO1xyXG59KCkpO1xyXG5leHBvcnRzLlBhdGhNb2RlbCA9IFBhdGhNb2RlbDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UGF0aE1vZGVsLmpzLm1hcCIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn07XHJcbnZhciBDb25uZWN0YWJsZV8xID0gcmVxdWlyZShcIi4vQ29ubmVjdGFibGVcIik7XHJcbnZhciBUYXJnZXRNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoVGFyZ2V0TW9kZWwsIF9zdXBlcik7XHJcbiAgICBmdW5jdGlvbiBUYXJnZXRNb2RlbChpZCwgeCwgeSkge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaWQsIHgsIHkpO1xyXG4gICAgICAgIHRoaXMuZ2V0QWx0SWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5pZCgpICsgXCJfYWx0XCI7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFsdElkID0ga28uY29tcHV0ZWQodGhpcy5nZXRBbHRJZCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICByZXR1cm4gVGFyZ2V0TW9kZWw7XHJcbn0oQ29ubmVjdGFibGVfMS5Db25uZWN0YWJsZSkpO1xyXG5leHBvcnRzLlRhcmdldE1vZGVsID0gVGFyZ2V0TW9kZWw7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhcmdldE1vZGVsLmpzLm1hcCIsInZhciBWaWV3TW9kZWwgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgZnVuY3Rpb24gVmlld01vZGVsKCkge1xyXG4gICAgICAgIHRoaXMuem9uZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkoW10pO1xyXG4gICAgICAgIHRoaXMuYW5jaG9ycyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgICAgICAgdGhpcy5wYXRocyA9IGtvLm9ic2VydmFibGVBcnJheShbXSk7XHJcbiAgICAgICAgLy90b2RvIGZpZWxkUmVtb3ZlOiByZW1vdmUgZXZlbnQgaGFuZGxlcnNcclxuICAgIH1cclxuICAgIHJldHVybiBWaWV3TW9kZWw7XHJcbn0oKSk7XHJcbmV4cG9ydHMuVmlld01vZGVsID0gVmlld01vZGVsO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1WaWV3TW9kZWwuanMubWFwIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufTtcclxudmFyIENvbm5lY3RhYmxlXzEgPSByZXF1aXJlKFwiLi9Db25uZWN0YWJsZVwiKTtcclxudmFyIFpvbmVNb2RlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XHJcbiAgICBfX2V4dGVuZHMoWm9uZU1vZGVsLCBfc3VwZXIpO1xyXG4gICAgZnVuY3Rpb24gWm9uZU1vZGVsKGlkLCB4LCB5LCBoZWlnaHQsIHdpZHRoKSB7XHJcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgaWQsIHgsIHkpO1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0ga28ub2JzZXJ2YWJsZShoZWlnaHQpO1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBrby5vYnNlcnZhYmxlKHdpZHRoKTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIHJldHVybiBab25lTW9kZWw7XHJcbn0oQ29ubmVjdGFibGVfMS5Db25uZWN0YWJsZSkpO1xyXG5leHBvcnRzLlpvbmVNb2RlbCA9IFpvbmVNb2RlbDtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Wm9uZU1vZGVsLmpzLm1hcCIsInZhciBqcURyYWdnYWJsZVJlc2l6YWJsZSA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBmdW5jdGlvbiBqcURyYWdnYWJsZVJlc2l6YWJsZShrbykge1xyXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5rbyA9IGtvO1xyXG4gICAgICAgIHRoaXMuYXBwbHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIF90aGlzLmtvLmJpbmRpbmdIYW5kbGVycy5qcURyYWdnYWJsZVJlc2l6YWJsZSA9IHtcclxuICAgICAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uIChlbGVtZW50LCB2YWx1ZUFjY2Vzc29yLCBhbGxCaW5kaW5nc0FjY2Vzc29yLCB2aWV3TW9kZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gdmFsdWVBY2Nlc3NvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhT2JqID0gb2JqO1xyXG4gICAgICAgICAgICAgICAgICAgICRlbGVtLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc2l6ZTogZnVuY3Rpb24gKGV2ZW50LCB1aSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5kYXRhT2JqLmhlaWdodCh1aS5zaXplLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFPYmoud2lkdGgodWkuc2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAkZWxlbS5kcmFnZ2FibGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkcmFnOiBmdW5jdGlvbiAoZXZlbnQsIHVpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmRhdGFPYmoueCh1aS5wb3NpdGlvbi5sZWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZGF0YU9iai55KHVpLnBvc2l0aW9uLnRvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGpxRHJhZ2dhYmxlUmVzaXphYmxlO1xyXG59KCkpO1xyXG5leHBvcnRzLmpxRHJhZ2dhYmxlUmVzaXphYmxlID0ganFEcmFnZ2FibGVSZXNpemFibGU7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWpxRHJhZ2dhYmxlUmVzaXphYmxlLmpzLm1hcCIsInZhciBab25lTW9kZWxfMSA9IHJlcXVpcmUoXCIuL2NvcmUvWm9uZU1vZGVsXCIpO1xyXG52YXIgVmlld01vZGVsXzEgPSByZXF1aXJlKFwiLi9jb3JlL1ZpZXdNb2RlbFwiKTtcclxudmFyIGpxRHJhZ2dhYmxlUmVzaXphYmxlXzEgPSByZXF1aXJlKFwiLi9jb3JlL2pxRHJhZ2dhYmxlUmVzaXphYmxlXCIpO1xyXG52YXIgVGFyZ2V0TW9kZWxfMSA9IHJlcXVpcmUoXCIuL2NvcmUvVGFyZ2V0TW9kZWxcIik7XHJcbnZhciBQYXRoTW9kZWxfMSA9IHJlcXVpcmUoXCIuL2NvcmUvUGF0aE1vZGVsXCIpO1xyXG52YXIgTGF5b3V0U2VydmljZV8xID0gcmVxdWlyZShcIi4vY29yZS9MYXlvdXRTZXJ2aWNlXCIpO1xyXG52YXIgQW5jaG9yTW9kZWxfMSA9IHJlcXVpcmUoXCIuL2NvcmUvQW5jaG9yTW9kZWxcIik7XHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgIG5ldyBqcURyYWdnYWJsZVJlc2l6YWJsZV8xLmpxRHJhZ2dhYmxlUmVzaXphYmxlKGtvKS5hcHBseSgpO1xyXG4gICAgdmFyIHZpZXdNb2RlbCA9IG5ldyBWaWV3TW9kZWxfMS5WaWV3TW9kZWwoKTtcclxuICAgIGtvLmFwcGx5QmluZGluZ3Modmlld01vZGVsKTtcclxuICAgIHZhciB6b25lQW5jaG9yID0gbmV3IEFuY2hvck1vZGVsXzEuQW5jaG9yTW9kZWwoY2hhbmNlLmd1aWQoKSwgMTAwLCAxMDAsIDIwLCAyMCwgXCJyaWdodFwiKTtcclxuICAgIHZhciBzb21lVGFyZ2V0QW5jaG9yID0gbmV3IEFuY2hvck1vZGVsXzEuQW5jaG9yTW9kZWwoY2hhbmNlLmd1aWQoKSwgMzAwLCAzMDAsIDIwLCAyMCk7XHJcbiAgICB2YXIgem9uZSA9IG5ldyBab25lTW9kZWxfMS5ab25lTW9kZWwoY2hhbmNlLmd1aWQoKSwgMTAwLCAxMDAsIDEwMCwgMTAwKTtcclxuICAgIHpvbmUuYWRkQW5jaG9yKHpvbmVBbmNob3IpO1xyXG4gICAgdmFyIHRhcmdldFpvbmUgPSBuZXcgVGFyZ2V0TW9kZWxfMS5UYXJnZXRNb2RlbChjaGFuY2UuZ3VpZCgpLCAwLCAwKTtcclxuICAgIHRhcmdldFpvbmUuYWRkQW5jaG9yKHNvbWVUYXJnZXRBbmNob3IpO1xyXG4gICAgdmFyIHBhdGggPSBuZXcgUGF0aE1vZGVsXzEuUGF0aE1vZGVsKGNoYW5jZS5ndWlkKCksIHpvbmUsIHRhcmdldFpvbmUpO1xyXG4gICAgdmlld01vZGVsLmFuY2hvcnMucHVzaChzb21lVGFyZ2V0QW5jaG9yKTtcclxuICAgIHZpZXdNb2RlbC5hbmNob3JzLnB1c2goem9uZUFuY2hvcik7XHJcbiAgICB6b25lLmFuY2hvcnMucHVzaCh6b25lQW5jaG9yKTtcclxuICAgIHZpZXdNb2RlbC56b25lcy5wdXNoKHpvbmUpO1xyXG4gICAgdmlld01vZGVsLnBhdGhzLnB1c2gocGF0aCk7XHJcbiAgICBMYXlvdXRTZXJ2aWNlXzEuTGF5b3V0U2VydmljZS5pbnN0YW5jZSgpLmluaXQodmlld01vZGVsKTtcclxufSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCJdfQ==
