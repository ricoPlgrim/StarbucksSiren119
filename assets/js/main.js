var _w;
var _menuBtnlist;
var _main;
var _switchBoxBtns;
var _selectedValues; //선택된 벨류값 가져오기
var _docment;
var _btnReload;

var mainUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _main = $("main");
        _menuBtnlist = _main.find(".menu_btn-list").find("li");
        _switchBoxBtns = _main.find(".switch_round > a");
        _selectedValues = JSON.parse(localStorage.getItem('selectedValues')) || [];
        _docment = $( document );

        // 선택된 벨류값이 있을 경우 
        if (_selectedValues && _selectedValues.length > 0) {
            _selectedValues.forEach(function (value) {
                var listItem = `<li>
                        <button class="cm_btn_round on tag"><span class="text">${value}</span></button>
                        <a href="javascript:;" class="btn_close tag_close"><span class="blind">삭제</span></a>
                    </li>`;
                $('.main.cm_btn_list').append(listItem);
            }); 
        } 
        if (_selectedValues.length === 0) {
            $('.main.btn_group').css('display', 'none');
        }
        
        _btnReload = _main.find(".btn_refresh");

    },
    addEvent: function () {
        _menuBtnlist.on("click", mainUi.menuBtnListClick);
        _switchBoxBtns.on("click", mainUi.switchBoxBtnClick);
        if (_main.find(".btn_group").length > 0) {
            _docment.on("click", '.tag_close', mainUi.tagCloseClick);
        }

    },
    loadEvent: function () {
        mainUi.create();
        mainUi.addEvent();
    },

    updateLocalStorage: function (values) {
        localStorage.setItem('selectedValues', JSON.stringify(values));
    },

    menuBtnListClick: function () {
        var className = $(this).attr('class');
        var sectionInner = $(".section_inner");
        $(".menu_box").removeClass("on");

        if (sectionInner.hasClass(className)) {
            sectionInner.removeClass(className).removeClass('open');
            $(".menu_box").removeClass("on");
        } else {
            sectionInner.removeClass().addClass('section_inner ' + className + ' open');
            $(this).find(".menu_box").addClass("on");
        }

    },

    commonSwitchAction: function (index) {
        var contents = $(".sections").find("section");
        var roundBar = $(".switch_round");
        var messageBox = $(".message_box");

        _switchBoxBtns.removeClass("on");
        _switchBoxBtns.eq(index).addClass("on");
        contents.removeClass("on");
        contents.eq(index).addClass("on");

        if (index === 0) {
            messageBox.css("display", "block");
            commonUi.sendBunCehck();
            roundBar.removeClass("right").addClass("left");
        } else {
            messageBox.css("display", "none");
            commonUi.sendBunCehck();
            roundBar.removeClass("left").addClass("right");
        }
    },


    mainSwichCahge: function ($type) {
        commonUi.gnbCloseClick();
        mainUi.commonSwitchAction($type);
    },

    switchBoxBtnClick: function () {
        var index = $(this).index();
        mainUi.commonSwitchAction(index);
    },

    tagCloseClick: function () {
        console.log( "111111111111111" );
        var text = $(this).siblings('.cm_btn_round').find('.text').text();
        $(this).parent('li').remove();

        _selectedValues = _selectedValues.filter(function (value) {
            return value !== text;
        });

        mainUi.updateLocalStorage(_selectedValues);
        if (_selectedValues.length === 0) {
            $('.main.btn_group').css('display', 'none');
        }
    },

    reloadBtnClick: function () {
        location.reload();
    }



};



$(function () {
    mainUi.init();
});