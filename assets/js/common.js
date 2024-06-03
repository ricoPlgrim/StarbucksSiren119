
/* global var*/
var _w;
var _htmlBody;
var _gnb;
var _gnbBtn;
var _gnbCloseBtn;
var _scrollTopButton;
var _stickyTarget;
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
        _scrollTopButton = $(".scroll_top_box");
        _stickyTarget = $(".header_sticky ");
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

        _bottomSheetDateList = $(".bottom_sheet").find(".date_list").find("li");

        _startDateInput = $( ".bottom_sheet" ).find( "#startdate" );
        _endDateInput = $( ".bottom_sheet" ).find( "#enddate" );

        _typeBtns = $( ".cm_tab_contents" ).find( ".cm_type_list" ).find( "li" );



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
        _bottomSheetDim.add(_bottomSheetClose).on("click", function() {
            var popupId = $(this).closest(".bottom_sheet").attr("id");
            commonUi.bottomSheetHide(popupId);
        });
        _bottomSheetDateList.on("click", commonUi.bottomSheetDateListClick);

        _startDateInput.on( "change",commonUi.startDateValue  );
        _endDateInput.on( "change",commonUi.endDateValue  );

        _typeBtns.on( "click", commonUi.typeBtnsClick );
        // input, textarea 이벤트
        _textFormBtn.on("click focus propertychange change keyup paste", commonUi.textFormClick);
        // header 스크롤 이벤트
 
    },

    loadEvent: function () {
        commonUi.create();
        commonUi.addEvent();
        console.log("loadEvent init");

    },

    resizeEvent: function () {
        console.log("window resize");
    },

    scrollEvent: function () {
        var _sT = $(this).scrollTop(); 
        if (_sT > _w.height()/3 ) {
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
        $( "html, body" ).css( "overflow", "hidden" );
        setTimeout(function () {
            $(".sheet_wrap").addClass("open");
        }, 50);
    },
    
    bottomSheetHide: function (popupId) {
        var layerName = "#" + popupId;

        $(".sheet_wrap").removeClass("open");
        $( "html, body" ).css( "overflow", "auto" );
        
        setTimeout(function () {
            $(layerName).removeClass("open");
        }, 100);
    },

    bottomSheetDateListClick: function () {
        var index = $( this ).index();
        _bottomSheetDateList.removeClass( "on" );
        _bottomSheetDateList.eq(index).addClass( "on" );

    },

    startDateValue: function(){
        var selectedDate = $(this).val();
        $( ".date_start" ).find( ".date_text" ).text( selectedDate );
    },

    endDateValue: function(){
        var selectedDate = $(this).val();
        $( ".date_end" ).find( ".date_text" ).text( selectedDate );
    },

    typeBtnsClick : function(){
        $( this ).addClass( "on" ).siblings().removeClass( "on" );
        var bars = $( ".cm_tab_contents" ).find( ".bar" );
        var offsetLeft = $(this).position().left;
            console.log( offsetLeft );
            gsap.to(bars, {
                duration: 0.75,
                x: offsetLeft,
                ease: "expo.inOut"
            });
    },
    textFormClick: function() {
        var This = $(this);
        var textForm = This.parent();
        var textArea = This.is("textarea");
        var byteNum = textForm.find(".byte_num");
        var scrollHeight = This[0].scrollHeight;
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
                This.css("height", scrollHeight + "px");
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
    headerScroll: function() {
        // 스크롤 탑일때 해더 변경
        var winTop = _w.scrollTop();
        var cHeader = $("header.common");
        var headerHeight = cHeader.height();

		if(winTop >= headerHeight){
			$(cHeader).addClass('on'); 
		} else {
			$(cHeader).removeClass('on');
		}
    }
};



$(function () {
    commonUi.init();
});