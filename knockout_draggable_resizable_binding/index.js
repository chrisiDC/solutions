$(document).ready(function () {

    var zoneModel =
    {
        x: ko.observable(200),
        y: ko.observable(200),
        height: ko.observable(200),
        width: ko.observable(200)
    };

    var viewModel =
    {
        zones: ko.observableArray([])
    };

    ko.bindingHandlers.jqDraggableResizable = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var obj = valueAccessor();
            var $elem = $(element);

            element.dataObj = obj;

            $elem.resizable({
                resize: function (event, ui) {
                    this.dataObj.height(ui.size.height);
                    this.dataObj.width(ui.size.width);
                }
            });

            $elem.draggable({
                drag: function (event, ui) {

                    this.dataObj.x(ui.position.left);
                    this.dataObj.y(ui.position.top);
                }

            });
        }
    }

    ko.applyBindings(viewModel);

    viewModel.zones.push(zoneModel);

    setInterval(function () {
            console.log(viewModel.zones()[0].x());
            console.log(viewModel.zones()[0].width());
        }
        , 200);
    //$("#dragme").draggable();
});