import {NodeModel} from "./NodeModel";
import {Connectable} from "./Connectable";
export class TargetModel extends Connectable {
    
    altId:KnockoutComputed<any>;

    constructor(id:string,x:number,y:number) {
        super(id,x,y);
        this.altId = ko.computed(this.getAltId, this);
    };

    private getAltId=():string=>
    {
        return this.id()+"_alt";
    }

}
