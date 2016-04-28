define(["knockout", "text!./nav.template.html"], function (ko, html) {
    "use strict";

    function ViewModel (params) {
        this.menus = params.menus;
    }

    ko.components.register("nav", {
        viewModel: ViewModel,
        template: html
    });
});
