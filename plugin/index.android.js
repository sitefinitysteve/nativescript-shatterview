var app = require("application");
var callback = null;
var brokenView = null;


    //complexity: 12, //Default 12, range 6-20
    //breakDuration: 700, //Min: 200
    //fallDuration: 2000, //Min: 200
    //circleRiftsRadius: 66 //Min: 20
    //enableArea: childView.          // set the region or childview that can enable break effect,
                                 // be sure the childView or childView in region doesn't intercept any touch event

    //setPaint(...).               // the paint to draw rifts

exports.allowShatter = function (view, options) {
    checkInit();
    if(view.android){
        var listener = buildListener(options);
        view.android.setOnTouchListener(listener);
    }
    else
        console.log("Unable to shatter an undefined view");
}

function buildListener(options){
    var listener = new com.zys.brokenview.BrokenTouchListener.Builder(brokenView);
    
    if(options){
        if(options.complexity)
            listener.setComplexity(options.complexity);
        
        if(options.breakDuration)        
            listener.setBreakDuration(options.breakDuration);
        
        if(options.fallDuration)        
            listener.setFallDuration(options.fallDuration);
            
        if(options.circleRiftsRadius)        
            listener.setCircleRiftsRadius(options.circleRiftsRadius);
            
        if(options.enableArea)        
            listener.setEnableArea(options.enableArea);
    }
    
    return listener.build();
}

function checkInit() {
    if(brokenView === null){
        brokenView = com.zys.brokenview.BrokenView.add2Window(app.android.foregroundActivity);
        
        callback = com.zys.brokenview.BrokenCallback.extend({
            onStart: function (view) {
                console.log("Start");
            },
            onCancel: function (view) {
                console.log("Cancel");
            },
            onCancelEnd: function (view) {
                console.log("CancelEnd");
            },
            onRestart: function (view) {
                console.log("Restart");
            },
            onFalling: function (view) {
                console.log("Falling");
            },
            onFallingEnd: function (view) {
                console.log("FallingEnd");
            },
        });
        
        brokenView.setCallback(new callback());
    }
}
