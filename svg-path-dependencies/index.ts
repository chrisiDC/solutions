import {ZoneModel} from "./core/ZoneModel";
import {ViewModel} from "./core/ViewModel";
import {jqDraggableResizable} from "./core/jqDraggableResizable";
import {TargetModel} from "./core/TargetModel";
import {PathModel} from "./core/PathModel";
import {NodeModel} from "./core/NodeModel";
import {LayoutService} from "./core/LayoutService";
import {AnchorModel} from "./core/AnchorModel";
$(document).ready(function () {

    
    new jqDraggableResizable(ko).apply();

    let viewModel = new ViewModel();
    ko.applyBindings(viewModel);

    let zoneAnchor = new AnchorModel(chance.guid(),100,100,20,20,"right");
    let someTargetAnchor = new AnchorModel(chance.guid(),300,300,20,20);

    let zone = new ZoneModel(chance.guid(),100,100,100,100);
    zone.addAnchor(zoneAnchor);
    let targetZone = new TargetModel(chance.guid(),0,0);
    targetZone.addAnchor(someTargetAnchor);

    let path = new PathModel(chance.guid(),zone,targetZone);


    viewModel.anchors.push(someTargetAnchor);
    viewModel.anchors.push(zoneAnchor);
    zone.anchors.push(zoneAnchor);
    viewModel.zones.push(zone);
    viewModel.paths.push(path);

    LayoutService.instance().init(viewModel);
});