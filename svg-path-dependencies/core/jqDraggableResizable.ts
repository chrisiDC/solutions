export class jqDraggableResizable {
    constructor(private ko:KnockoutStatic) {

    }

    apply = ():void=> {
        this.ko.bindingHandlers.jqDraggableResizable = {
            init: (element, valueAccessor, allBindingsAccessor, viewModel):void=> {
                var obj = valueAccessor();
                var $elem = $(element);

                element.dataObj = obj;

                $elem.resizable({
                    resize: (event, ui):void=> {
                        element.dataObj.height(ui.size.height);
                        element.dataObj.width(ui.size.width);
                    }
                });

                $elem.draggable({
                    drag: (event, ui):void=> {

                        element.dataObj.x(ui.position.left);
                        element.dataObj.y(ui.position.top);
                    }

                });
            }
        };
    }
}


