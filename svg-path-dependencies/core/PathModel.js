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
//# sourceMappingURL=PathModel.js.map