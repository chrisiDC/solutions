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
//# sourceMappingURL=TargetModel.js.map