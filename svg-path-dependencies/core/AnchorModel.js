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
//# sourceMappingURL=AnchorModel.js.map