import {NodeModel} from "./NodeModel";
import {Connectable} from "./Connectable";

export class PathModel
{
    id:KnockoutObservable<string>;
    svgPath:KnockoutObservable<string>;
    source:Connectable;
    target:Connectable;
    
    nodes:Array<NodeModel>=[];

    constructor(id:string,source:Connectable,target:Connectable)
    {
        this.id = ko.observable(id);
        this.svgPath = ko.observable("");
        this.source =source;
        this.target = target;
    }
}