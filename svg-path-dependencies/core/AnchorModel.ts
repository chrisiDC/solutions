import {NodeModel} from "./NodeModel";
export class AnchorModel extends NodeModel {

    width:KnockoutObservable<number>;
    height:KnockoutObservable<number>;

    constructor(id:string, x:number, y:number,width:number,height:number,private position?:string) {
        super(id, x, y);
        this.width = ko.observable(width);
        this.height = ko.observable(height);
    };

    updatePosition=(x:number,y:number,containerWidth:number,containerHeight:number):void=>
    {
        if (this.position)
        {
            //todo: implement different positions
            this.x(x+containerWidth);
            this.y(y+containerHeight/2-this.height()/2);
        }
    }

}