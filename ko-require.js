define(["knockout", "require"], function (ko, require) {
    "use strict";

    var KO_REQUIRE_ORIGINAL_VISIBILITY_ATTRIBUTE = "ko-require--original-visibility";

    function hideChildNodes (element) {
        var child = ko.virtualElements.firstChild(element),
            result = [];

        while (child) {
            if (child.nodeType === window.Node.ELEMENT_NODE) {
                child.setAttribute(KO_REQUIRE_ORIGINAL_VISIBILITY_ATTRIBUTE, child.style.visibility);
                child.style.visibility = "hidden";
                result.push(child);
            }
            child = ko.virtualElements.nextSibling(child);
        }

        return result;
    }

    function showNodes (nodes) {
        var node = nodes.shift();

        while (node) {
            node.style.visibility = node.getAttribute(KO_REQUIRE_ORIGINAL_VISIBILITY_ATTRIBUTE);
            node.removeAttribute(KO_REQUIRE_ORIGINAL_VISIBILITY_ATTRIBUTE);
            node = nodes.shift();
        }
    }

    function appendNamedTemplate (name, html, element) {
        var script;

        if (document.getElementById(name) === null) {
            script = document.createElement("script");
            script.setAttribute("type", "text/html");
            script.setAttribute("id", name);
            script.innerHTML = html;
            ko.virtualElements.prepend(element, script);
        }
    }

    function parseTemplatePath (path) {
        var segments = path.split(":");

        return {
            name: segments[0],
            path: "text!" + segments[1]
        };
    }

    function load (options, element, bindingContext) {
        var children = hideChildNodes(element),
            templateCount = options.templates.length,
            templates = options.templates.map(parseTemplatePath),
            modules = templates.map(function (template) {
                return template.path;
            }).concat(options.components);

        require(modules, function () {
            var argName, index;

            for (argName in arguments) {
                if (arguments.hasOwnProperty(argName)) {
                    index = parseInt(argName);
                    if (arguments.hasOwnProperty(argName) && index < templateCount) {
                        appendNamedTemplate(templates[index].name, arguments[argName], element);
                    }
                }
            }

            showNodes(children);
            ko.applyBindingsToDescendants(bindingContext, element);
        });
    }

    function update (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = valueAccessor();

        if (options.components instanceof Array === false) {
            options.components = [];
        }

        if (options.templates instanceof Array === false) {
            options.templates = [];
        }

        load(options, element, bindingContext);
    }

    function init () {
        return {
            controlsDescendantBindings: true
        };
    }

    ko.bindingHandlers.require = {
        init: init,
        update: update
    };
    ko.virtualElements.allowedBindings.require = true;
});
