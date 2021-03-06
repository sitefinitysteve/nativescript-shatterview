var app = require("application");
var viewModel = require("./main-view-model");
var frameModule = require("ui/frame");
var shatterview = require("nativescript-shatterview");

var page;

exports.pageLoaded = function (args) {
    page = args.object;
    page.bindingContext = viewModel;
    
    //Wire up events
    shatterview.on("start", function (args) {
        console.log("Start");
    });
    
    shatterview.on("cancel", function (args) {
        console.log("Cancel");
    });
    
    shatterview.on("cancelEnd", function (args) {
        console.log("CancelEnd");
    });
    
    shatterview.on("restart", function (args) {
        console.log("Restart");
    });
    
    shatterview.on("falling", function (args) {
        console.log("Falling");
    });
    
    shatterview.on("fallingEnd", function (args) {
        console.log("FallingEnd");    
    });
    
    var image = page.getViewById("image");
    shatterview.allowShatter(image, {
                                        complexity: 12,
                                        breakDuration: 700,
                                        fallDuration: 2000,
                                        circleRiftsRadius: 50
                                    });
    
    var button1 = page.getViewById("button1");
    shatterview.allowShatter(button1,{
                                        complexity: 12,
                                        breakDuration: 1000,
                                        fallDuration: 1500,
                                        circleRiftsRadius: 20
                                    });
    
    var button2 = page.getViewById("button2");
    shatterview.allowShatter(button2,{
                                        complexity: 12,
                                        breakDuration: 200,
                                        fallDuration: 3000,
                                        circleRiftsRadius: 20
                                    });
    
    
    shatterview.allowShatter(page,{
                                        complexity: 20,
                                        breakDuration: 300,
                                        fallDuration: 3000,
                                        circleRiftsRadius: 150
                                    });
}

exports.onExplode = function(args){
    
}
