
/* global var*/
var _w;
var _menuBtnlist;
var _main;

var mainUi = {

    init: function () {
        mainUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _main = $( "main" );
        _menuBtnlist = _main.find( ".menu_btn-list" ).find( "li" );
    },
    addEvent: function(){
        mainUi.resizeEvent( null );
        _w.on( "resize", mainUi.resizeEvent );
        _menuBtnlist.on( "click", mainUi.menuBtnListClick );
    },
    loadEvent: function () {
        mainUi.create();
        mainUi.addEvent();
    },

    resizeEvent: function(){
        console.log( "window resize" );
    },

    menuBtnListClick: function(){
        var index = $( this ).index();
        var menuView = _main.find( ".menu_view_list" );
        var menuViewList = menuView.find( "li.menu_view_item" );

        console.log( menuViewList.length );
        var textBox = menuView.find( ".inner" );
        var btnClose =  menuViewList.eq(index).find( ".btn_close" );
        menuView.css({
            "z-index" : 30,
            "opacity": 1
        });

        btnClose.css( "opacity", 1 );
        menuViewList.removeClass( "on");
        menuViewList.eq(index).addClass(  "on" );

        console.log(menuViewList.eq(index)[0]);

        menuView.removeClass( "on" );
        gsap.set( textBox, { opacity: 0 })
        gsap.to( textBox, .75,  { opacity: 1,  delay:.25  });

        btnClose.on("click", mainUi.menuBtnClose);
    },

    menuBtnClose: function(){
        var index = $( this );
        var menuView = index.parents( ".menu_view_list" );
        index.css( "opacity", 0 );
        index.next().css( "opacity", 0 );
        index.parent( "li.on" ).removeClass( "on" );
        setTimeout( function() {
            menuView.css({
                "z-index" : 10,
            });
        },300);
    }
};



$(function () {
    mainUi.init();
});