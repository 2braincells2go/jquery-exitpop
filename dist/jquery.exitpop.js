/*! jQuery Exitpop Plugin - v2.1.0 - 2014-11-08
* https://github.com/tomgrohl/jquery-exitpop/
* Copyright (c) 2014 Tom Ellis; Licensed MIT */
(function($, w) {

    $.exitpop = function(method /*,options*/) {
        var userAgent = navigator.userAgent.toString().toLowerCase(),
            defaults = {
                url : "", // URL to pop to
                message : "", // Message to display
                ignore : null // Selector or jQuery object of elements to ignore
            },
            options,
            callback = function(event) {

                methods.removeHandler();

                setTimeout(function() {
                    setTimeout(function() {
                        document.location.href = options.url;
                    },500);
                },5);

                // Use event off window object for old IE
                (event || w.event).returnValue = options.message;

                // For Chrome
                return options.message;
            },
            methods = {
                init : function(settings) {
                    options = $.extend({}, defaults, settings);

                    methods.addHandler();
                },
                addHandler : function() {

                    w.onbeforeunload = callback;

                    if (options.ignore) {
                        $(options.ignore).on('click.exitpop', function() {
                            methods.removeHandler();
                        });
                    }

                },
                removeHandler : function() {

                    if (options.ignore) {
                        $(options.ignore).off('click.exitpop');
                    }

                    if (w.attachEvent) {
                        w.onbeforeunload = undefined;
                    } else {
                        w.onbeforeunload = null;
                    }
                }
            };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
        } else if (typeof method === "object" || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error("Method " + method + " does not exist in the jQuery Exitpop Plugin");
        }
    };

})(jQuery, window);