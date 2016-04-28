define(["knockout"], function (ko) {
    "use strict";

    function ViewModel () {
        var self = this;

        self.page = {
            title: "ko-require-binding demo",
            author: "Windie Chai",
            menus: [
                {
                    name: "KnockoutJS",
                    path: "#ko"
                },
                {
                    name: "RequireJS",
                    path: "#require"
                },
                {
                    name: "ko-require",
                    path: "#ko-require"
                }
            ],
            current: ko.observable()
        };

        function retrieveHash () {
            var current,
                menu,
                index = self.page.menus.length - 1;

            for (;index >= 0; index--) {
                menu = self.page.menus[index];
                if (menu.path === window.location.hash) {
                    current = menu;
                }
            }

            if (typeof current !== "undefined") {
                self.page.current(current);
            }
        }

        window.onhashchange = retrieveHash;
        retrieveHash();
    }

    return new ViewModel();
});
