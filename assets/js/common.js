
/* global var*/
var _w;
var _htmlBody;
var _gnb;
var _gnbBtn;
var _gnbCloseBtn;
var _scrollTopButton;
var _stickyTarget;
var _popBtn;
var _textFormBtn;

var switchBox = $(".header_switchbox");
if (switchBox.length > 0) {
    var switchBoxOffset = switchBox.offset().top;
    var marginTop = parseInt(switchBox.css('margin-top'), 10);
    var totalOffsetTop = switchBoxOffset - marginTop;
}

var _switchBox;
var _switchBoxOffset;
var _marginTop;
var _totalOffsetTop

var _bottomSheetDim;
var _bottomSheetClose;
var _bottomSheetDateList;

var _startDateInput;
var _endDateInput;

var _typeBtns;
var _twoDepsMenu;
var _subDepsMenu;

var _searchInput;
var _deleteAllBtn;
var _btnTextDelete;
var _inputBoxTarget;
var _btnTextDelete;
var _loginInPut;

var _btnTypeList;


var commonUi = {

    init: function () {
        commonUi.loadEvent();
    },
    create: function () {
        _w = $(window);
        _htmlBody = $("html, body");
        _gnb = $(".gnb");
        _gnbBtn = $(".btn_hamburger");
        _gnbCloseBtn = _gnb.find(".btn_close");
        _scrollTopButton = $(".scrolltop_box");
        _stickyTarget = $(".header_sticky ");
        // 팝업 버튼
        _popBtn = $("body").find("a, button");
        // 입렵폼 input, textarea
        _textFormBtn = $(".text_box").find("input, textarea");

        _switchBox = $(".header_switchbox");
        if (switchBox.length > 0) {
            _switchBoxOffset = _switchBox.offset().top;
            _marginTop = parseInt(_switchBox.css('margin-top'), 10);
            _totalOffsetTop = _switchBoxOffset - _marginTop;
        }

        _bottomSheetDim = $(".bottom_sheet").find(".dimd");
        _bottomSheetClose = $(".bottom_sheet").find(".btn_sheet_close");
        _bottomSheetDateList = $(".cm_date_contents").find(".date_list").find("li");

        _startDateInput = $("#startdate");
        _endDateInput = $("#enddate");
        _typeBtns = $(".cm_tab_contents").find(".cm_type_list").find("li");

        _twoDepsMenu = $(".cm_tab_panel .buttons_list").find("li");
        _subDepsMenu = $( ".cm_tab_panel .depth_02" ).find("li");


        _searchInput = $(".search_input");
        _deleteAllBtn = $(".btn_all_delete");
        _btnTextDelete = $(".btn_text_delete");
        _inputBoxTarget = $(".input_box");

        _loginInPut = $(".login_box").find(".user_id");

        _btnTypeClose = $(".cm_btn_list").find(".btn_close");



    },
    addEvent: function () {
        commonUi.resizeEvent(null);
        _w.on("resize", commonUi.resizeEvent);
        _w.on("scroll", commonUi.scrollEvent);
        _w.on("scroll", commonUi.headerScroll);

        _gnbBtn.on("click", commonUi.gnbBtnClick);
        _gnbCloseBtn.on("click", commonUi.gnbCloseClick);
        _scrollTopButton.on("click", commonUi.scrollTopClick);
        // 하단 레이어 닫기 이벤트
        _bottomSheetDim.add(_bottomSheetClose).on("click", function () {
            var popupId = $(this).closest(".bottom_sheet").attr("id");
            commonUi.bottomSheetHide(popupId);
        });
        _bottomSheetDateList.on("click", commonUi.bottomSheetDateListClick);

        _startDateInput.on("change", commonUi.startDateValue);
        _endDateInput.on("change", commonUi.endDateValue);

        _typeBtns.on("click", commonUi.typeBtnsClick);
        // input, textarea 이벤트
        _textFormBtn.on("click focus propertychange change keyup paste", commonUi.textFormClick);
        // 팝업 버튼 클릭 이벤트
        _popBtn.on("click", commonUi.popupItemClick);

        _twoDepsMenu.on( "click", commonUi.twoDepsMenuClick );

        _searchInput.on("input", commonUi.inputTarget);
        _searchInput.on("focus", commonUi.inputFocusEvent);
        _searchInput.on("focusout", commonUi.inputFocusOutEvent);
        _btnTextDelete.on("click", commonUi.inPutTextDeleteClick);
        _loginInPut.on("input", commonUi.loginValueCheck);
        _btnTypeClose.on("click", commonUi._btnTypeCloseClick);



    },

    loadEvent: function () {
        commonUi.create();
        commonUi.addEvent();
    },

    resizeEvent: function () {
        _typeBtns.each(function() {
            if ($(this).hasClass("on")) {
                commonUi.updateBarPosition($(this));
            }
        });
    },

    scrollEvent: function () {
        var _sT = $(this).scrollTop();
        if (_sT > 100) {
            _scrollTopButton.fadeIn();
        } else {
            _scrollTopButton.fadeOut();
        }

        if (_sT >= _totalOffsetTop) {
            _stickyTarget.addClass('active');
        }
        else {
            _stickyTarget.removeClass('active');
        }
    },

    scrollTopClick: function () {
        _htmlBody.animate({
            scrollTop: 0
        }, 0);
        return false;
    },

    gnbBtnClick: function () {
        _gnb.css("display", "block");
    },

    gnbCloseClick: function () {
        _htmlBody.css("overflow", "auto");
        _gnb.css("display", "none");
    },

    bottomSheetOpen: function (popupId) {
        var layerName = "#" + popupId;

        $(layerName).addClass("open");
        $("html, body").css("overflow", "hidden");
        setTimeout(function () {
            $(".sheet_wrap").addClass("open");
        }, 50);
    },

    bottomSheetHide: function (popupId) {
        var layerName = "#" + popupId;

        $(".sheet_wrap").removeClass("open");
        $("html, body").css("overflow", "auto");

        setTimeout(function () {
            $(layerName).removeClass("open");
        }, 100);
    },

    bottomSheetDateListClick: function () {
        var index = $(this).index();
        _bottomSheetDateList.removeClass("on");
        _bottomSheetDateList.eq(index).addClass("on");

    },

    startDateValue: function () {
        console.log("qwelmwqklenmklwqnejkqwnejkwqnejkqwnjkeneq");
        var selectedDate = $(this).val();
        $(".date_start").find(".date_text").text(selectedDate);
    },

    endDateValue: function () {
        var selectedDate = $(this).val();
        $(".date_end").find(".date_text").text(selectedDate);
    },

    updateBarPosition: function(button) {
        var offsetLeft = button.position().left;
        var bars = $(".cm_tab_contents").find(".bar");
        gsap.to(bars, {
            duration: 0.75,
            x: offsetLeft,
            ease: "expo.inOut"
        });
    },

    typeBtnsClick: function () {
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        commonUi.updateBarPosition($(this));

        var tabPanelTarget = $(".cm_tab_panel").find(".item");
        tabPanelTarget.removeClass("on");
        tabPanelTarget.eq(index).addClass("on");
      
    },
    textFormClick: function () {
        var This = $(this);
        var textForm = This.parent();
        var textArea = This.is("textarea");
        var byteNum = textForm.find(".byte_num");
        var byteHeight = byteNum.height();
        var textFormHeight = textForm.height();

        if (This.val().length < 1) {
            textForm.find(".btn_delete").removeClass("on");
            textForm.parent().find("button").removeClass("on");
            if (textArea) {
                textForm.removeClass("on");
                byteNum.removeClass("on");
                This.css("height", "auto");
                textForm.css("padding-bottom", 0);
                $("body").css("padding-bottom", 0);
            }
        } else {
            textForm.find(".btn_delete").addClass("on");
            textForm.parent().find("button").addClass("on");
            if (textArea) {
                textForm.addClass("on");
                byteNum.addClass("on");
                This.css("height", "auto");
                This.height(this.scrollHeight);
                textForm.css("padding-bottom", byteHeight + "px");
                $("body").css("padding-bottom", textFormHeight);
            }
        }

        function clearText(textValue) {
            textValue.val("");
            textValue.focus();
            textValue.is("textarea") ? textValue.css("height", "auto") : '';
        }

        function deleteText() {
            var parent = $(this).parent();
            var textArea = parent.find("textarea");
            var inputField = parent.find("input");

            (textArea.length > 0 && clearText(textArea)) || (inputField.length > 0 && clearText(inputField));
        }

        $(".btn_delete").on("click", deleteText);
    },
    headerScroll: function () {
        // 스크롤 탑일때 헤더 변경
        var winTop = _w.scrollTop();
        var cHeader = $("header.common");
        var headerHeight = cHeader.height();

        if (winTop >= headerHeight) {
            $(cHeader).addClass('on');
        } else {
            $(cHeader).removeClass('on');
        }
    },
    twoDepsMenuClick: function (e) {
        e.preventDefault();
        var index = $(this).index();
        var menuContainer = $(this).closest(".buttons_list");
        var menuDepth02 = $(this).parents().parents().find(".depth_02");

        // 탭메뉴 클릭 시 활성화
        menuContainer.find("li").removeClass("on");
        menuContainer.find("li").eq(index).addClass("on");

        // 탭메뉴 하위 투뎁스 이벤트
        if(index > 0) {
            menuDepth02.show();
            menuDepth02.css("display", "flex");
        } else {
            $(".board_list." + filterText).show();
        }
        
        commonUi.centerMenu(menuContainer, $(this));
    },
    subDepsMenuClick: function(){
        var index = $(this).index();

        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    },
    centerMenu: function (menuContainer, menuItem) {
        var containerWidth = menuContainer.outerWidth();
        var itemOffsetLeft = menuItem.offset().left;
        var containerOffsetLeft = menuContainer.offset().left;
        var scrollLeftValue = menuContainer.scrollLeft() + (itemOffsetLeft - containerOffsetLeft) + (menuItem.outerWidth() / 2) - (containerWidth / 2);

        menuContainer.animate({
            scrollLeft: scrollLeftValue
        }, 300);
    },
    // 레이어 팝업 이벤트
    popupItemClick: function () {
        var targetName = $(this).data("target");
        if (targetName) commonUi.openPopup(targetName);
    },
    openPopup: function (targetName) {
        var layerName = "#" + targetName;

        $("body").find(layerName).addClass("open");
        $("body").css("overflow", "hidden");

        $(layerName).find(".btn_close").on("click", function () {
            closePopup(layerName);
        });

        // 팝업 외부를 클릭하면 팝업을 닫는 이벤트 핸들러
        $(layerName).on("click", function (event) {
            if (event.target === this) {
                closePopup(layerName);
            }
        });

        function closePopup(layerName) {
            $("body").find(layerName).removeClass("open");
            $("body").css("overflow", "scroll");
        }
    },


    //검색어 입력시 한글자이상 버튼 삭제 버튼 노출
    inputTarget: function () {
        var inputLength = $(this).val().length;
        if (inputLength > 0) {
            _btnTextDelete.css("display", "block");
        } else {
            _btnTextDelete.css("display", "none");
        }

    },

    inputFocusEvent: function () {
        _inputBoxTarget.addClass('active');
    },

    inputFocusOutEvent: function () {
        _inputBoxTarget.removeClass('active');
    },
    inPutTextDeleteClick: function () {
        _searchInput.val("");
        $(this).css("display", "none");

    },

    loginValueCheck: function () {
        var inputLength = $(this).val().length;
        if (inputLength > 0) {
            $(".btn_login").addClass("on");
        } else {
            $(".btn_login").removeClass("on");
        }
    },

    _btnTypeCloseClick: function () {
        var btnGroup = $( this ).parents( ".btn_group" );
        var liLength = $( ".cm_btn_list" ).find( "li" ).length; 
        $( this ).parents( "li" ).remove();
        if( liLength == 1 ){
            btnGroup.remove();
        }
     

    }
};



$(function () {
    commonUi.init();
});