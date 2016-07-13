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
//# sourceMappingURL=NodeModel.js.map