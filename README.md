# ko-require
A custom binding for KnockoutJS. Allow you `require` both components and templates directly from your view, i.e. the same place you reference them.

## load components

It's very straightforward to use, just wrap the component reference inside a ko-require custom binding (as a virtual element):
```html
<!-- ko require: { components: [ "nav.component" ] } -->
    <nav params="menus: page.menus"></nav>
<!-- /ko -->
```
The `components` option passed to ko-require is a string array. It will be loaded by ko-require using RequireJS. KnockoutJS will not bind any child elements of this ko-require virtual element until all the members specified in `components` were loaded. Other elements outside this ko-require virtual element will still be processed as usual.

The component still need to be registered at first. We recommand write the component as a self-registered AMD module. e.g, `nav.component.js`, the definition of component `nav`:
```javascript
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
```

## load templates

You can also wrap the template binding inside a ko-require virual element to load templates:
```html
<!-- ko require:{ templates: [ "header-template:header.template.html" ] } -->
    <div data-bind="template: { name: 'header-template', data: { title: page.title } }"></div>
<!-- /ko -->
```
The `templates` option is also a string array and will be loaded by ko-require. The memeber of this array has a special format: `template-name:template-path`. The `template-name` will be used to create a named template to allow us use template binding syntax to render the corresponding template.

## it's flexible

ko-require is a standard KnockoutJS custom binding implementaion. It means it can be used just like any built-in KnockoutJS syntax. You can use it with KnockoutJS control flow binding (i.e. `if`, `ifnot` and `with`) to load resources as needed. You can speicify both `components` and `templates` options in a single ko-require. You can add any valid elements as its child elements, even another ko-require.
```html
<!-- ko require:{ templates: [ "header-template:header.template.html",
                               "footer-template:footer.template.html" ],
                  components: ["nav.component" ] } -->

    <div data-bind="template: { name: 'header-template',
                                data: { title: page.title }}"></div>

    <nav params="menus: page.menus"></nav>

    <p>hello, world!</p>

    <!-- ko with: page.content -->
        <!-- ko require:{ components: [ "content.component" ] } -->
            <!-- ko component: { name: "content",
                                 params: { content: $data } } --><!-- /ko -->
        <!-- /ko -->
    <!-- /ko -->

    <!-- ko template: { name: "footer-template",
                        data: { author: page.author } } --><!-- /ko -->
<!-- /ko -->
```

## dependencies

ko-require has following dependencies:
* [RequireJS](http://requirejs.org)
* [KnockoutJS](http://knockoutjs.com)
* [RequireJS text plugin](https://github.com/requirejs/text)

ko-require is a AMD module. It requires KnockoutJS and text plugin using fixed module names: `knockout` and `text`. You can configure RequireJS to map those names to the actual paths of KnockoutJS and text plugin:
```javascript
requirejs.config({
    paths: {
        "knockout": "libs/knockout-a.b.c",
        "text": "libs/text"
    }
});
```
