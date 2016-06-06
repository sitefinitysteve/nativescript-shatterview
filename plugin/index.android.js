var app = require("application");
var callback = null;
var brokenView = null;

var _callbacks = {start: [], 
                   cancel: [], 
                   cancelEnd: [], 
                   restart: [], 
                   falling: [], 
                   fallingEnd: []
                };

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

exports.on = function (event, callback) {
    addEventListener(event, callback);
}

function addEventListener(event, callback) {
    if (!Array.isArray(_callbacks[event])) {
        throw new Error("addEventListener passed an invalid event type " + event);
    }
    _callbacks[event].push({c: callback});
};

function _notify(event, data) {
    var eventCallbacks = _callbacks[event];
   for (var i =0; i < eventCallbacks.length; i++) {
        eventCallbacks[i].c.call(this, data);
   }
};


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
                _notify("start", view);
                //console.log("Start");
            },
            onCancel: function (view) {
                _notify("cancel", view);
                //console.log("Cancel");
            },
            onCancelEnd: function (view) {
                _notify("cancelEnd", view);
                //console.log("CancelEnd");
            },
            onRestart: function (view) {
                _notify("restart", view);
                //console.log("Restart");
            },
            onFalling: function (view) {
                _notify("falling", view);
                //console.log("Falling");
            },
            onFallingEnd: function (view) {
                _notify("fallingEnd", view);
                //console.log("FallingEnd");
            },
        });
        
        brokenView.setCallback(new callback());
    }
}
