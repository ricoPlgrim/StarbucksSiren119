
/* global var*/
var _w;
var _menuBtnlist;
var _main;

var frountUi = {

    init: function () {
        frountUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _menuIndex = null;
        _main = $( "main" );
        _menuBtnlist = _main.find( ".menu_btn-list" ).find( "li" );
    },
    addEvent: function(){
        frountUi.resizeEvent( null );
        _w.on( "resize", frountUi.resizeEvent );
        _menuBtnlist.on( "click", frountUi.menuBtnListClick );
    },
    loadEvent: function () {
        frountUi.create();
        frountUi.addEvent();
    },

    resizeEvent: function(){
        console.log( "window resize" );
    },

    menuBtnListClick: function(){
        var index = $( this ).index();
        var menuView = _main.find( ".menu_view_list" );
        var menuViewList = menuView.find( "li" );
        var textBox = menuView.find( ".inner" );
        var btnClose =  menuViewList.eq(index).find( ".btn_close" );
        _menuIndex = index;
        menuView.css({
            "z-index" : 30,
            "opacity": 1
        });

        btnClose.css( "opacity", 1 );
        menuViewList.eq(index).addClass(  "on" ).siblings().removeClass( "on" );

        gsap.set( textBox, { opacity: 0 })
        gsap.to( textBox, .75,  { opacity: 1,  delay:.25  });

        btnClose.on( "click", menuBtnClose )
    },

    menuBtnClose: function(){
        console.log( "??" );
    }
    
};



$(function () {
    frountUi.init();
});