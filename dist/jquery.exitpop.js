/*! jQuery Exitpop Plugin - v2.0.0 - 2014-09-24
* https://github.com/tomgrohl/jquery-exitpop/
* Copyright (c) 2014 Tom Ellis; Licensed MIT */
(function($) {

    $.exitpop = function(method /*,options*/) {
        var userAgent = navigator.userAgent.toString().toLowerCase(),
            defaults = {
                url : "", // URL to pop to
                message : "", // Message to display
                ignore : null // Selector or jQuery object of elements to ignore
            },
            options,
            html5Callback = function(event) {

                // Doesn't work in Firefox
                if (userAgent.indexOf('firefox') == -1)
                {
                    if (userAgent.indexOf("chrome") !== -1) {
                        setTimeout(function() {
                            methods.removeHandler();
                            document.location.href = options.url;
                        },300);
                    } else {
                        methods.removeHandler();
                        document.location.href = options.url;
                    }
                }

                event.returnValue = options.message;

                return options.message;
            },
            ieCallback = function(event) {
                event.returnValue = options.message;
                return options.message;
            },
            callback = function(event) {

                if (userAgent.indexOf("chrome") !== -1) {
                    setTimeout(function() {
                        window.onbeforeunload = function() {};
                        document.location.href = options.url;
                    },300);
                } else {
                    window.onbeforeunload = function() {};
                    document.location.href = options.url;
                }

                // For Old IE
                if (e) {
                    e.returnValue = options.message;
                }

                // For Chrome
                return options.message;
            },
            methods = {
                init : function(settings) {
                    options = $.extend({}, defaults, settings);

                    methods.addHandler();
                },
                addHandler : function() {


                    if (window.addEventListener)
                    {
                        window.addEventListener('beforeunload', html5Callback, false);
                    }
                    else if (window.attachEvent)
                    {
                        window.attachEvent('onbeforeunload', ieCallback);
                    }
                    else
                    {
                        window.onbeforeunload = callback;
                    }

                    if (options.ignore)
                    {
                        $(options.ignore).on('click', function() {
                            methods.removeHandler();
                        });
                    }

                },
                removeHandler : function() {

                    if (window.addEventListener)
                    {
                        window.removeEventListener('beforeunload', html5Callback);
                    }
                    else if (window.attachEvent)
                    {
                        window.removeEventListener('beforeunload', ieCallback);
                    }
                    else
                    {
                        window.onbeforeunload = function() {};
                    }
                }
            };

        if (methods[method]) {
            return methods[method].apply( this, slice.call( arguments, 1 ) );
        } else if ( typeof method === "object" || !method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error("Method " + method + " does not exist in the [plugin_name] Plugin");
        }
    };

})(jQuery);