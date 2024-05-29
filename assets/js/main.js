
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
        var index = $(this).index();
        var menuView = _main.find(".menu_view_list");
        var menuViewList = menuView.find("li.menu_view_item");
        return;
        _menuBtnlist.eq(index).toggleClass("on");

     
        if ((index + 1) % 2 === 0) {
            var prevElem = _menuBtnlist.eq(index - 1);
            $(this).after(prevElem);
            console.log("짝수");
        } else {
            console.log("홀수");
        }


      

        console.log(menuViewList.length);
        var textBox = menuView.find(".inner");
        var btnClose = menuViewList.eq(index).find(".btn_close");
        menuView.css({
            "z-index": 30,
            "opacity": 1
        });

        btnClose.css("opacity", 1);
        menuViewList.removeClass("on");
        menuViewList.eq(index).addClass("on");
        menuView.removeClass("on");
        gsap.set(textBox, { opacity: 0 })
        gsap.to(textBox, .15, { opacity: 1, });

        btnClose.on("click", mainUi.menuBtnClose);
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