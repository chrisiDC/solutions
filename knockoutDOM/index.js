// Notify me of everything!
var observerConfig = {
    attributes: true,
    childList: false,
    characterData: false,
    attributeFilter: ["style"]
};

// Node, config
// In this case we'll listen to all changes to body and child nodes


$(document).ready(function () {


  /*  var observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'style') {
                var styleLeft = window.getComputedStyle(mutation.target,null).getPropertyValue("left");
                var styleTop = window.getComputedStyle(mutation.target,null).getPropertyValue("top");
                console.log("left:"+styleLeft);
                console.log("top:"+styleTop);
               //console.log($("#"+mutation.target.id).position().left);
            }
        });
    });*/

    var zoneModel =
    {
        x: ko.observable(200),
        y: ko.observable(200),
        height: ko.observable(200),
        width: ko.observable(200)
    };

    zoneModel.x.subscribe(function(newValue) {
        console.log("model X is now:"+newValue);

    });
    zoneModel.y.subscribe(function(newValue) {
        console.log("model Y is now:"+newValue);

    });
    zoneModel.width.subscribe(function(newValue) {
        console.log("model width is now:"+newValue);

    });
    zoneModel.height.subscribe(function(newValue) {
        console.log("model height is now:"+newValue);

    });

    var viewModel =
    {
        zones: ko.observableArray([])
    };

    ko.bindingHandlers.coordinates = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
            var obj = valueAccessor();
            var $elem = $(element);

            element.dataObj = obj;

            var observer = new MutationObserver(function (mutations) {

                mutations.forEach(function (mutation) {
                    if (mutation.attributeName === 'style') {
                        var styleLeft = window.getComputedStyle(mutation.target,null).getPropertyValue("left");
                        var styleTop = window.getComputedStyle(mutation.target,null).getPropertyValue("top");
                        var styleWidth = window.getComputedStyle(mutation.target,null).getPropertyValue("width");
                        var styleHeight = window.getComputedStyle(mutation.target,null).getPropertyValue("height");
                        obj.x(styleLeft);
                        obj.y(styleTop);
                        obj.width(styleWidth);
                        obj.height(styleHeight);
                        //console.log($("#"+mutation.target.id).position().left);
                    }
                });
            });

            var targetNode = document.querySelector('#xxx');
            observer.observe(targetNode, {attributes: true});



        }
    };

    ko.applyBindings(zoneModel);
    $(".resizable").draggable();
    $(".resizable").resizable();
    /* ko.applyBindings(viewModel);

     viewModel.zones.push(zoneModel);*/

    /*  setInterval(function () {
     console.log(viewModel.zones()[0].x());
     console.log(viewModel.zones()[0].width());
     }
     , 200);*/
//$("#dragme").draggable();
})
;