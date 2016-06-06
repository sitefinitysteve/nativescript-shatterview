# Nativescript Shattervew

Make sure to hold down on the view item to see the effect... the cracks start then when they hit the edges it breaks

** ANDROID ONLY (sorry iOS) **

<img src="https://raw.githubusercontent.com/zhanyongsheng/raw/master/BrokenView/image/demo.gif" />

> Works awesome on device, geny throws lots of cancel events for some reason

## Usage
``` js
var shatterview = require("nativescript-shatterview");

exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
    
    var options = {
                complexity: 12,
                breakDuration: 700,
                fallDuration: 2000,
                circleRiftsRadius: 50
            };
    
    var image = page.getViewById("image");
    shatterview.allowShatter(image, options);
    
    var button = page.getViewById("button");
    shatterview.allowShatter(button, options);
    
    var label = page.getViewById("label");
    shatterview.allowShatter(label, options);
    
        
    shatterview.allowShatter(page, options);
}

```

## Methods
* allowShatter(view);
* allowShatter(view, options);

## Events
```
    // Args returns the view being maniupulated
    shatterview.on("start", function (args) {
        console.log("Break started");
    });
```
* start
* cancel 
* cancelEnd 
* restart 
* falling 
* fallingEnd

So you don't handle a tap event to shatter, you make something shatterable and the click\tap is done automatically by the plugin.

[BrokenView](https://github.com/zhanyongsheng/BrokenView) Plugin lovingly created by [zhanyongsheng](https://github.com/zhanyongsheng)