# jQuery Exitpop Plugin

Normalises exit pop behaviour across browsers. Except safari which doesn't support the `onbeforeunload` event.

## Current Version - 2.2.0

## Installation


### Bower

coming soon!

### Download

Get any of the releases from https://github.com/tomgrohl/jquery-exitpop/releases


## Options

	url - Default ''
	      URL to pop to
	message - Default ''
	      Message to show
	ignore - null
	      Selector or jQuery object of DOM elements to ignore
    callback - $.noop()
          A closure to run before the exitpop URL redirect

## Usage

```javascript

//Simple
$(document).ready(function(){
    $.exitpop({
        "url" : "http://example.com",
        "message" : "I'm a message"
    });
});
```

## License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2015 [Tom Ellis](http://www.webmuse.co.uk)