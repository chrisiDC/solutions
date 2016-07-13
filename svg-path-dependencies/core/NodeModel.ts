export class NodeModel {
    id:KnockoutObservable<string>;
    x:KnockoutObservable<number>;
    y:KnockoutObservable<number>;

    constructor(id:string,x:number, y:number) {
        this.id = ko.observable(id);
        this.x = ko.observable(x);
        this.y = ko.observable(y);
    }

    toString = ()=> {
        return Math.round(this.x() * 100) / 100 + " " + Math.round(this.y() * 100) / 100;
    }

}