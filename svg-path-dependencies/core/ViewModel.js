var ViewModel = (function () {
    function ViewModel() {
        this.zones = ko.observableArray([]);
        this.anchors = ko.observableArray([]);
        this.paths = ko.observableArray([]);
        //todo fieldRemove: remove event handlers
    }
    return ViewModel;
}());
exports.ViewModel = ViewModel;
//# sourceMappingURL=ViewModel.js.map