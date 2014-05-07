(function($) {

    $.exitpop = function(method /*,options*/) {
        var userAgent = navigator.userAgent.toString().toLowerCase(),
            defaults = {
                url : "", // URL to pop to
                message : "", // Message to display
                ignore : null // Selector or jQuery object of elements to ignore
            },
            options,
            methods = {
                init : function(settings) {
                    options = $.extend({}, defaults, settings);


                    methods.addHandler();
                },
                addHandler : function() {

                    window.onbeforeunload = function(e) {

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
                    };

                    if (options.ignore)
                    {
                        $(options.ignore).on('click', function() {
                            methods.removeHandler();
                        });
                    }

                },
                removeHandler : function() {
                    window.onbeforeunload = function() {};
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