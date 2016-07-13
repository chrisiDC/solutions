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
//# sourceMappingURL=Connectable.js.map