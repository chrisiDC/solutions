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
//# sourceMappingURL=LayoutService.js.map