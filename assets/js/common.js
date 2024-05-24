
/* global var*/
var _w;

var commonUi = {

    init: function () {
        commonUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        console.log( "create init" );
    },
    addEvent: function(){
        commonUi.resizeEvent( null );
        _w.on( "resize", commonUi.resizeEvent );
        console.log( "addEvent init" );
    },

    loadEvent: function () {
        commonUi.create();
        commonUi.addEvent();
        console.log( "loadEvent init" );
    },

    resizeEvent: function(){
        console.log( "window resize" );
    },
   
};



$(function () {
    commonUi.init();
});