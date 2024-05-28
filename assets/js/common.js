
/* global var*/
var _w;
var _htmlBody;
var _gnb;
var _gnbBtn;
var _gnbCloseBtn;

var commonUi = {

    init: function () {
        commonUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _htmlBody = $( "html, body" );
        _gnb = $( ".gnb" );
        _gnbBtn = $( ".btn_hamburger" );
        _gnbCloseBtn = _gnb.find( ".btn_close" );
        console.log( "create init" );
    },
    addEvent: function(){
        commonUi.resizeEvent( null );
        _w.on( "resize", commonUi.resizeEvent );
        
        _gnbBtn.on( "click", commonUi.gnbBtnClick );
        _gnbCloseBtn.on( "click", commonUi.gnbCloseClick );
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

    gnbBtnClick: function(){
        _htmlBody.css( "overflow", "hidden" );
        _gnb.css( "display", "block" );
    },

    gnbCloseClick: function(){
        _htmlBody.css( "overflow", "auto" );
        _gnb.css( "display", "none" );
    }

   
};



$(function () {
    commonUi.init();
});