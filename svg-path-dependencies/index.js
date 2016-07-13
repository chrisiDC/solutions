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
//# sourceMappingURL=index.js.map