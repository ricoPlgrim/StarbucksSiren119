
/* global var*/
var _w;
var _menuBtnlist;
var _main;
var _switchBoxBtns;
var _btnBookmark;

var mainUi = {

    init: function () {
        mainUi.loadEvent();
    },
    create: function () {
        _w = $(window);
        _main = $("main");
        _menuBtnlist = _main.find(".menu_btn-list").find("li");
        _switchBoxBtns = _main.find(".switch_round > a");
        _btnBookmark = _main.find(".btn_bookmark");
    },
    addEvent: function () {
        mainUi.resizeEvent(null);
        _w.on("resize", mainUi.resizeEvent);
        _menuBtnlist.on("click", mainUi.menuBtnListClick);
        _switchBoxBtns.on("click", mainUi.switchBoxBtnClick);
        _btnBookmark.on("click", mainUi.btnBookMarkClick);

    },
    loadEvent: function () {
        mainUi.create();
        mainUi.addEvent();
    },

    resizeEvent: function () {
        console.log("window resize");
    },

    menuBtnListClick: function () {
        var className =  $(this).attr('class');
        var sectionInner = $(".section_inner");
        $( ".menu_box" ).removeClass( "on" );
        if (sectionInner.hasClass(className)) {
            sectionInner.removeClass(className).removeClass('open');
            console.log( "줄어들때?", $( ".menu_box" ).length );
           $( ".menu_box" ).removeClass( "on" );
        } else {
            sectionInner.removeClass().addClass('section_inner ' + className + ' open');
            $( this ).find( ".menu_box" ).addClass( "on" );
            console.log( "2222" );
        }
        
    },

    menuBtnClose: function () {
        var index = $(this);
        var menuView = index.parents(".menu_view_list");
        index.css("opacity", 0);
        index.next().css("opacity", 0);
        index.parent("li.on").removeClass("on");
        setTimeout(function () {
            menuView.css({
                "z-index": 10,
            });
        }, 100);
    },

    switchBoxBtnClick: function () {
        var index = $(this).index();
        var contents = $(".sections").find("section");
        var roundBar = $(this).parents(".switch_round");
        _switchBoxBtns.removeClass("on");
        _switchBoxBtns.eq(index).addClass("on");
        contents.removeClass("on");
        contents.eq(index).addClass("on");

        if (index == 0) {
            roundBar.removeClass("right")
            roundBar.addClass("left")
        } else {
            roundBar.removeClass("left")
            roundBar.addClass("right")
        }
    },

    btnBookMarkClick: function () {
        $(this).toggleClass("on");
    }
};



$(function () {
    mainUi.init();
});