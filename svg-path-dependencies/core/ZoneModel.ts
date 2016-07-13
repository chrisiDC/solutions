import {NodeModel} from "./NodeModel";
import {Connectable} from "./Connectable";

export class ZoneModel extends Connectable{

    height:KnockoutObservable<number>;
    width:KnockoutObservable<number>;
    x:KnockoutObservable<number>;
    y:KnockoutObservable<number>;

    constructor(id:string, x:number,y:number, height:number, width:number) {
        super(id,x,y);
        
        this.height=ko.observable(height);
        this.width=ko.observable(width);
    };
}

