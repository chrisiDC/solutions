import {NodeModel} from "./NodeModel";
import {AnchorModel} from "./AnchorModel";
export class Connectable {
    id:KnockoutObservable<string>;
    anchors:KnockoutObservableArray<AnchorModel>;
    x:KnockoutObservable<number>;
    y:KnockoutObservable<number>;

    constructor(id:string, x:number, y:number) {
        this.id = ko.observable(id);
        this.anchors = ko.observableArray([]);
        this.x = ko.observable(x);
        this.y = ko.observable(y);
    };

    addAnchor(node:AnchorModel) {
        this.anchors.push(node);
    }
    equals = (o:Connectable):boolean=> {
        return this.id() === o.id();
    }


}
