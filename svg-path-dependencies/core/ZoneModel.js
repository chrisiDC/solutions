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
//# sourceMappingURL=ZoneModel.js.map