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
                    hash: "#ko",
                    template: {
                        name: "content-ko",
                        path: "content.ko.template.html"
                    }
                },
                {
                    name: "RequireJS",
                    hash: "#require",
                    template: {
                        name: "content-require",
                        path: "content.require.template.html"
                    }
                },
                {
                    name: "ko-require",
                    hash: "#ko-require",
                    template: {
                        name: "content-ko-require",
                        path: "content.ko-require.template.html"
                    }
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
                if (menu.hash === window.location.hash) {
                    current = menu;
                    break;
                }
            }

            if (typeof current !== "undefined") {
                self.page.current(current);
            }
        }

        window.onhashchange = retrieveHash;
        retrieveHash();
    }

    return ViewModel;
});
