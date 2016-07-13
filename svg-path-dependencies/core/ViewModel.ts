import {PathModel} from "./PathModel";
import {ZoneModel} from "./ZoneModel";
import {TargetModel} from "./TargetModel";
import {NodeModel} from "./NodeModel";


export class ViewModel
{
    zones:KnockoutObservableArray<ZoneModel>;
    paths:KnockoutObservableArray<PathModel>;
    anchors:KnockoutObservableArray<NodeModel>;
   

    constructor()
    {
       
        this.zones = ko.observableArray([]);
        this.anchors = ko.observableArray([]);
        this.paths = ko.observableArray([]);
        //todo fieldRemove: remove event handlers
    }


}