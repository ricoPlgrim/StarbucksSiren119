
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
var _fileUploadBtn;
var _wrap;

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
var _twoDepsWrapMenu;
var _subDepsMenu;

var _searchInput;
var _deleteAllBtn;
var _btnTextDelete;
var _inputBoxTarget;
var _btnTextDelete;
var _loginInPut;

var _btnTypeList;
var _rowScrolLBox;
var _btnBookmark;


var _lastSelectedStartDate;;
var _lastSelectedEndDate;


var isAnimating = {
    main: false,
    sub: false
};


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
        // 사진 파일 업로드
        _fileUploadBtn = $(".file_upload_wrap").find("#imageFile");

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
        _twoDepsWrapMenu = $(".cm_type_twodepth .buttons_list").find("li");
        _subDepsMenu = $(".cm_tab_panel .depth_02").find("li");
        _searchInput = $(".search_input");
        _deleteAllBtn = $(".btn_all_delete");
        _btnTextDelete = $(".btn_text_delete");
        _inputBoxTarget = $(".input_box");
        _loginInPut = $(".login_box").find("input");
        _btnTypeClose = $(".cm_btn_list").find(".btn_close");
        _rowScrolLBox = $(".cm_btn_list");
        _btnBookmark = $(".btn_bookmark");
        _wrap = $("#wrap");

        _lastSelectedStartDate = null;
        _lastSelectedEndDate = null;

    },

    addEvent: function () {
        commonUi.resizeEvent(null);
        _w.on("resize", commonUi.resizeEvent);
        if ($("#wrap").hasClass("home")) {
            _wrap.on("scroll", commonUi.scrollEvent);
        } else {
            _w.on("scroll", commonUi.scrollEvent);
        }

        _w.on("scroll", commonUi.headerScroll);
``
        _gnbBtn.on("click", commonUi.gnbBtnClick); //gnb 버튼 클릭
        _gnbCloseBtn.on("click", commonUi.gnbCloseClick); //gnb 닫기
        _scrollTopButton.on("click", commonUi.scrollTopClick); //하단 스크롤탑 버튼 클릭
        // 하단 레이어 닫기 이벤트
        _bottomSheetDim.add(_bottomSheetClose).on("click", function () { //하단 팝업 시트 닫기
            var popupId = $(this).closest(".bottom_sheet").attr("id");
            commonUi.bottomSheetHide(popupId);
        });
        _bottomSheetDateList.on("click", commonUi.bottomSheetDateListClick); //달력 버튼 온오프

        _startDateInput.on("change", commonUi.startDateValue); //시작 달력값 벨류값 
        _startDateInput.on("blur", commonUi.startValueBlur); //시작 달력값 설정값 없을때 
        _endDateInput.on("change", commonUi.endDateValue); // 끝 달력값 벨류값
        _endDateInput.on("blur", commonUi.endDateBlur); // 마지막 달력값 설정값 없을때 

        _typeBtns.on("click", commonUi.typeBtnsClick); //탭 영역 활성화
        _textFormBtn.on("click focus propertychange change keyup paste", commonUi.textFormClick);  // input, textarea 이벤트
        _fileUploadBtn.on("change", commonUi.fileImgUpload); // 파일 업로드

        _popBtn.on("click", commonUi.popupItemClick);  // 팝업 버튼 클릭 이벤트

        // 투댑스 버튼 클릭 이벤트
        _twoDepsMenu.on("click", function(e) {
            commonUi.handleMenuClick.call(this, e);
        });

        // 상단 픽시드 고정 투댑스 버튼 클릭 이벤트
        _twoDepsWrapMenu.on("click", function(e) {
            commonUi.handleMenuClick.call(this, e, true);
        });

        _subDepsMenu.on("click", commonUi.subDepsMenuClick);

        _searchInput.on("input", commonUi.inputTarget); //인풋이벤트 
        _searchInput.on("focus", commonUi.inputFocusEvent); //인풋 포커스 인 이벤트
        _searchInput.on("focusout", commonUi.inputFocusOutEvent); //인풋 포커스 아웃 이벤트
        _btnTextDelete.on("click", commonUi.inPutTextDeleteClick);  //인풋 벨류값 삭제
        _loginInPut.on("input", commonUi.loginValueCheck); //로그인 인풋 벨류 체크
        _btnTypeClose.on("click", commonUi.btnTypeCloseClick); //타입 버튼 삭제 이벤트

        _rowScrolLBox.on("scroll", commonUi.rowScrollBoxCheck);
        _btnBookmark.on("click", commonUi.btnBookMarkClick);

        commonUi.tabActivation(); //탭영역 로드 체크 순서
        commonUi.sendBunCehck();
    },

    loadEvent: function () {
        commonUi.create();
        commonUi.addEvent();
    },

    resizeEvent: function () {
        _typeBtns.each(function () {
            if ($(this).hasClass("on")) {
                commonUi.updateBarPosition($(this));
            }
        });
    },

    scrollEvent: function () {
        var _sT = $(this).scrollTop();
        if (_sT > 80) {
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
        if ($("#wrap").hasClass("home")) {
            // 메인 페이지일 경우
            commonUi.animateScroll(_wrap, 0, 'main');
        } else {
            // 서브 페이지일 경우
            commonUi.animateScroll($('html, body'), 0, 'sub');
        }
    },


    animateScroll: function (target, duration, type) {
        if (!isAnimating[type]) {
            isAnimating[type] = true;
            target.animate({
                scrollTop: 0
            }, duration, function() {
                isAnimating[type] = false;
            });
        }
    },
  
    gnbBtnClick: function () {
        _gnb.css("display", "block");
        _htmlBody.css("overflow", "hidden");
    },

    gnbCloseClick: function () {
        _htmlBody.css("overflow", "");
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
        $("html, body").css("overflow", "");

        setTimeout(function () {
            $(layerName).removeClass("open");
        }, 100);
    },

    bottomSheetDateListClick: function () {
        var index = $(this).index();
        _bottomSheetDateList.removeClass("on");
        _bottomSheetDateList.eq(index).addClass("on");
        //직접입력시
        if (index == 3) {
            commonUi.toggleDateFields(true);
        } else {
            commonUi.toggleDateFields(false);
        }
    },
     toggleDateFields: function (isActive) {
        const action = isActive ? "removeClass" : "addClass";
        const reverseAction = isActive ? "addClass" : "removeClass";
        $(".date_start, .date_end").removeClass("disabled active");
        $(".date_start, .date_end")[action]("disabled");
        $(".date_start, .date_end")[reverseAction]("active");
    },

    // 시작 날짜 선택 시 _lastSelectedStartDate 저장
    startDateValue: function () {
        _lastSelectedStartDate = $(this).val();
        commonUi.updateSelectedDates();
    },
    
      // 시작 날짜 input이 포커스를 잃을 때, 만약 날짜가 선택되지 않았다면 마지막 선택한 날짜로 설정
    startValueBlur: function(){
        if (!$(this).val() && _lastSelectedStartDate) {
            $(this).val(_lastSelectedStartDate);
        }
        commonUi.updateSelectedDates();
    },

    endDateValue: function () {
        _lastSelectedEndDate = $(this).val();
        commonUi.updateSelectedDates();
       
    },

    // 시작 날짜 input이 포커스를 잃을 때, 만약 날짜가 선택되지 않았다면 마지막 선택한 날짜로 설정
    endDateValueBlur: function(){
        if (!$(this).val() && _lastSelectedEndDate) {
            $(this).val(_lastSelectedEndDate);
        }
        commonUi.updateSelectedDates();
    },

    updateSelectedDates: function() {
        if (_lastSelectedStartDate) {
            $(".date_start").find(".date_text").text(_lastSelectedStartDate);
        } 

        if (_lastSelectedEndDate) {
            $(".date_end").find(".date_text").text(_lastSelectedEndDate);
        } 
    },

    updateBarPosition: function (button) {
        var offsetLeft = button.position().left;
        var bars = $(".cm_tab_contents").find(".bar");
        gsap.to(bars, {
            duration: 0.75,
            x: offsetLeft,
            ease: "expo.inOut"
        });
    },

    typeBtnsClick: function (e) {
        e.preventDefault();
        var index = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        commonUi.updateBarPosition($(this));

        var tabPanelTarget = $(".cm_tab_panel").find(".item");
        tabPanelTarget.removeClass("on");
        tabPanelTarget.eq(index).addClass("on");
        if( $( ".cm_full_wrap" ).length > 0 ){
            $( ".cm_full_wrap" ).find( ".buttons_list" ).removeClass( "on" );
            $( ".cm_full_wrap" ).find( ".buttons_list" ).eq(index).addClass( "on" );
        }

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

        if( !cHeader.hasClass( "not" )){
            if (winTop >= headerHeight) {
                $(cHeader).addClass('on');
            } else {
                $(cHeader).removeClass('on');
            }
        }
        
        if( cHeader.hasClass( "not" )){
            if (winTop >= $("section").offset().top ){
                $(".cm_tab_contents").addClass('on');
                $(".cm_tab_panel ").addClass('on');
            } else {
                $(".cm_tab_contents").removeClass('on');
                $(".cm_tab_panel ").removeClass('on');
            }
        }
    },

    handleMenuClick: function (e, wrapMenu = false) {
        e.preventDefault();
        var $this = $(this);
        var index = $this.index();
        var menuContainer = $this.closest(".buttons_list");
        var menuDepth02 = $this.parents("section").find(".depth_02");
    
        // Activate the clicked menu item
        menuContainer.find("li").removeClass("on");
        menuContainer.find("li").eq(index).addClass("on");
    
        // Handle 2-depth menu visibility
        if (index > 0) {
            if (menuDepth02.length > 0) {
                menuDepth02.show();
                if (wrapMenu) {
                    menuDepth02.css("display", "flex");
                }
            }
        } else {
            if (menuDepth02.length > 0) {
                menuDepth02.hide();
            }
        }
    
        // Handle additional 3-depth menu if present
        if (!wrapMenu) {
            var menuTypeDepth = $this.parents(".item").find(".depth_03");
            if (menuTypeDepth.length > 0) {
                menuTypeDepth.removeClass("on");
                menuTypeDepth.eq(index).addClass("on");
            }
        }
    
        commonUi.centerMenu(menuContainer, $this);
    },
    
    

    subDepsMenuClick: function () {
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
        var popupType = $(layerName).attr("class")
        var closeTimeout;

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
            clearTimeout(closeTimeout);
            $("body").find(layerName).removeClass("open");
            $("body").css("overflow", "scroll");
        }

        //3초 이후 토스트 팝업 삭제
        if (popupType && popupType.includes("layer_toast")) {
            closeTimeout = setTimeout(function () {
                closePopup(layerName);
            }, 3000);
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
        var userIdLength = $(".user_id").val().length;
        var userPwLength = $(".user_pw").val().length;

        if (userIdLength > 0 && userPwLength > 0) {
            $(".btn_login").addClass("on");
        } else {
            $(".btn_login").removeClass("on");
        }
    },

    btnTypeCloseClick: function () {
        var btnGroup = $(this).parents(".btn_group");
        var liLength = $(".cm_btn_list").find("li").length;
        $(this).parents("li").remove();
        if (liLength == 1) {
            btnGroup.remove();
        }
    },


    setTabIndex: function (index) {
        localStorage.setItem('tabIndex', index);
    },

    tabActivation: function () {
        var path = window.location.pathname;
        var page = path.split("/").pop();

        if (page === "index.html" && path.includes("/board/")) {
            var tabIndex = localStorage.getItem('tabIndex');
            if (tabIndex !== null) {
                tabIndex = parseInt(tabIndex, 10);
                var selectedButton = _typeBtns.eq(tabIndex);
                commonUi.updateBarPosition(selectedButton);

                var tabPanelTarget = $(".cm_tab_panel").find(".item");
                tabPanelTarget.removeClass("on");
                tabPanelTarget.eq(tabIndex).addClass("on");

                var cmTypeListItems = $(".cm_type_list li");
                cmTypeListItems.removeClass("on");
                cmTypeListItems.eq(tabIndex).addClass("on");
            }
        }
    },

    rowScrollBoxCheck: function () {
        var scrollLeft = $(this).scrollLeft();
        var dimd = $(".btn_group").find(".dimd");
        if (scrollLeft > 10) {
            dimd.css("display", "none");
        } else {
            dimd.css("display", "block");
        }
    },

    btnBookMarkClick: function () {
        $(this).toggleClass("on");
    },

    sendBunCehck: function () {
        if ($(".message_box").length === 0 || $(".message_box").css("display") === "none") {
            _scrollTopButton.addClass("on");
        } else {
            _scrollTopButton.removeClass("on");
        }
    },
    fileImgUpload: function(e) {
        var files = e.target.files;

        function isImageFile(file) {
            var ext = file.name.split(".").pop().toLowerCase();
            return ["jpg", "jpeg", "png"].includes(ext);
        }

        function createListItem(src) {
            var listItem = $('<li><div class="img_box"><img src="' + src + '" alt="Uploaded Image"></div><span class="file_delete"></span></li>');

            listItem.find(".file_delete").on('click', function() {
                $(this).closest("li").remove();
            });

            return listItem;
        }

        function handleFileRead() {
            return function(e) {
                if ($(".file_list li").length < 6) {
                    var listItem = createListItem(e.target.result);
                    $(".file_list").prepend(listItem);
                }
            };
        }

        for (var i = 0; i < files.length; i++) {
            var file = files[i];

            if (isImageFile(file)) {
                var reader = new FileReader();
                reader.onload = handleFileRead(file);
                reader.readAsDataURL(file);
            }
        }
    },
};


$(function () {
    commonUi.init();
});