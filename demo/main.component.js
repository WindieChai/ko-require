define(["knockout", "../ko-require", "./main.viewmodel", "text!./main.template.html"], function (ko, koRequire, vm, html) {
    "use strict";

    ko.components.register("main", {
        viewModel: vm,
        template: html
    });

    ko.applyBindings();
});
