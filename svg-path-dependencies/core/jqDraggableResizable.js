var jqDraggableResizable = (function () {
    function jqDraggableResizable(ko) {
        var _this = this;
        this.ko = ko;
        this.apply = function () {
            _this.ko.bindingHandlers.jqDraggableResizable = {
                init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
                    var obj = valueAccessor();
                    var $elem = $(element);
                    element.dataObj = obj;
                    $elem.resizable({
                        resize: function (event, ui) {
                            element.dataObj.height(ui.size.height);
                            element.dataObj.width(ui.size.width);
                        }
                    });
                    $elem.draggable({
                        drag: function (event, ui) {
                            element.dataObj.x(ui.position.left);
                            element.dataObj.y(ui.position.top);
                        }
                    });
                }
            };
        };
    }
    return jqDraggableResizable;
}());
exports.jqDraggableResizable = jqDraggableResizable;
//# sourceMappingURL=jqDraggableResizable.js.map