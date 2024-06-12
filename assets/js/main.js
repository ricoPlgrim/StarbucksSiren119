var _w;
var _menuBtnlist;
var _main;
var _switchBoxBtns;


var mainUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _main = $("main");
        _menuBtnlist = _main.find(".menu_btn-list").find("li");
        _switchBoxBtns = _main.find(".switch_round > a");
     

    },
    addEvent: function () {
        _menuBtnlist.on("click", mainUi.menuBtnListClick);
        _switchBoxBtns.on("click", mainUi.switchBoxBtnClick);


    },
    loadEvent: function () {
        mainUi.create();
        mainUi.addEvent();
    },

   

    menuBtnListClick: function () {
        var className =  $(this).attr('class');
        var sectionInner = $(".section_inner");
        $( ".menu_box" ).removeClass( "on" );
       
        if (sectionInner.hasClass(className)) {
            sectionInner.removeClass(className).removeClass('open');
           $( ".menu_box" ).removeClass( "on" );
        } else {
            sectionInner.removeClass().addClass('section_inner ' + className + ' open');
            $( this ).find( ".menu_box" ).addClass( "on" );
        }
        
    },

    switchBoxBtnClick: function () {
        var index = $(this).index();
        var contents = $(".sections").find("section");
        var roundBar = $(this).parents(".switch_round");

        _switchBoxBtns.removeClass("on");
        _switchBoxBtns.eq(index).addClass("on");
        contents.removeClass("on");
        contents.eq(index).addClass("on");
        if (index === 0) {
            $( ".message_box" ).css( "display", "block"  )
            commonUi.sendBunCehck();
            roundBar.removeClass("right").addClass("left");
        } else {
            $( ".message_box" ).css( "display", "none"  )
            commonUi.sendBunCehck();
            roundBar.removeClass("left").addClass("right");
        }
    },
 
    
};



$(function () {
    mainUi.init();
});