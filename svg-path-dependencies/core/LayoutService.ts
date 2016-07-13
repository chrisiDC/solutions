import {ViewModel} from "./ViewModel";
import {ZoneModel} from "./ZoneModel";
import {PathModel} from "./PathModel";
import {AnchorModel} from "./AnchorModel";

let _instance:LayoutService;

export class LayoutService {

    private model:ViewModel;

    constructor() {
    }

    static instance = ():LayoutService=> {
        if (!_instance) _instance = new LayoutService();
        return _instance;
    };

    init = (model:ViewModel)=> {
        this.model = model;
        model.zones().forEach(zone=> {
            zone.x.subscribe((newValue:number)=>this.onZoneChanged(zone));
            zone.y.subscribe((newValue:number)=>this.onZoneChanged(zone));
            zone.width.subscribe((newValue:number)=>this.onZoneChanged(zone));
            zone.height.subscribe((newValue:number)=>this.onZoneChanged(zone));
            this.onZoneChanged(zone);
        });

        /*   model.paths().forEach(path=> {
         path.nodes.filter(item=>item.isAnchor === true).forEach(node=> {
         node.x.subscribe((newValue:number)=>this.calculatePath(path));
         node.y.subscribe((newValue:number)=>this.calculatePath(path));
         })
         });*/


    };

    /*calculateAll=():void=>
     {
     this.model.zones().forEach(zone=>this.calculateZoneAnchors(zone));
     };*/

    /* updateModel = ():void=> {
     let expression:string;
     if (this.nodes.length === 4) {
     expression = "M " +
     this.nodes[0].toString() + ",C " + this.nodes[1].toString() + " " + this.nodes[2].toString() + "," + this.nodes[3].toString();
     }
     else if (this.nodes.length === 2) {
     expression = "M " + ((this.nodes[0].toString()) + " " + (this.nodes[1].toString()));
     }
     else throw new Error("not implemented");

     this.pathModel.svgPath(expression);
     };*/


    private calculatePath = (path:PathModel):void=> {
        let expression:string;
        /* if (this.nodes.length === 4) {
         expression = "M " +
         this.nodes[0].toString() + ",C " + this.nodes[1].toString() + " " + this.nodes[2].toString() + "," + this.nodes[3].toString();
         }
         else if (this.nodes.length === 2) {
         expression = "M " + ((this.nodes[0].toString()) + " " + (this.nodes[1].toString()));
         }
         else throw new Error("not implemented");*/

        expression = "M " + ((path.source.anchors()[0].toString()) + " " + (path.target.anchors()[0].toString()));
        path.svgPath(expression);
    };

    private onZoneChanged = (zone:ZoneModel):void=> {
        zone.anchors().forEach((anchor:AnchorModel)=> {
            anchor.updatePosition(zone.x(),zone.y(),zone.width(),zone.height());
           /* anchor.x(zone.x()+zone.width());
            anchor.y(zone.y());*/

            this.model.paths().filter(path=>path.source.equals(zone)).forEach(path=>this.calculatePath(path));

        });
    }
}


