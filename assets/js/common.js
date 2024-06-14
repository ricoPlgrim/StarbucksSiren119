/* global variables */
var _w, _htmlBody, _gnb, _gnbBtn, _gnbCloseBtn, _scrollTopButton, _stickyTarget, _popBtn, _textFormBtn, _fileUploadBtn, _wrap;
var _switchBox, _switchBoxOffset, _marginTop, _totalOffsetTop, _bottomSheetDim, _bottomSheetClose, _bottomSheetDateList;
var _startDateInput, _endDateInput, _typeBtns, _twoDepsMenu, _twoDepsWrapMenu, _subDepsMenu, _searchInput, _deleteAllBtn, _btnTextDelete, _inputBoxTarget, _loginInPut, _btnTypeList, _rowScrolLBox, _btnBookmark;
var _lastSelectedStartDate, _lastSelectedEndDate;

var isAnimating = {
    main: false,
    sub: false
};

var commonUi = {

    init: function () {
        this.loadEvent();
    },

    create: function () {
        _w = $(window);
        _htmlBody = $("html, body");
        _gnb = $(".gnb");
        _gnbBtn = $(".btn_hamburger");
        _gnbCloseBtn = _gnb.find(".btn_close");
        _scrollTopButton = $(".scrolltop_box");
        _stickyTarget = $(".header_sticky");
        _popBtn = $("body").find("a, button"); // 팝업 버튼
        _textFormBtn = $(".text_box").find("input, textarea");   // 입렵폼 input, textarea
        _fileUploadBtn = $(".file_upload_wrap").find("#imageFile");   // 사진 파일 업로드

        _switchBox = $(".header_switchbox");
        if (_switchBox.length > 0) {
            _switchBoxOffset = _switchBox.offset().top;
            _marginTop = parseInt(_switchBox.css('margin-top'), 10);
            _totalOffsetTop = _switchBoxOffset - _marginTop;
        }

        _bottomSheetDim = $(".bottom_sheet .dimd");
        _bottomSheetClose = $(".bottom_sheet .btn_sheet_close");
        _bottomSheetDateList = $(".cm_date_contents .date_list li");
        _startDateInput = $("#startdate");
        _endDateInput = $("#enddate");
        _typeBtns = $(".cm_tab_contents .cm_type_list li");
        _twoDepsMenu = $(".cm_tab_panel .buttons_list li");
        _twoDepsWrapMenu = $(".cm_type_twodepth .buttons_list li");
        _subDepsMenu = $(".cm_tab_panel .depth_02 li");
        _searchInput = $(".search_input");
        _deleteAllBtn = $(".btn_all_delete");
        _btnTextDelete = $(".btn_text_delete");
        _inputBoxTarget = $(".input_box");
        _loginInPut = $(".login_box input");
        _btnTypeClose = $(".cm_btn_list .btn_close");
        _rowScrolLBox = $(".cm_btn_list");
        _btnBookmark = $(".btn_bookmark");
        _wrap = $("#wrap");

        _lastSelectedStartDate = null;
        _lastSelectedEndDate = null;
    },

    addEvent: function () {
        this.resizeEvent(null);
        _w.on("resize", this.resizeEvent);
        _wrap.on("scroll", this.scrollEvent);

        _gnbBtn.on("click", this.gnbBtnClick); //gnb 버튼 클릭
        _gnbCloseBtn.on("click", this.gnbCloseClick); //gnb 닫기
        _scrollTopButton.on("click", this.scrollTopClick); //하단 스크롤탑 버튼 클릭

        _bottomSheetDim.add(_bottomSheetClose).on("click", function () { //하단 팝업 시트 닫기
            var popupId = $(this).closest(".bottom_sheet").attr("id");
            commonUi.bottomSheetHide(popupId);
        });
        _bottomSheetDateList.on("click", this.bottomSheetDateListClick); //달력 버튼 온오프

        _startDateInput.on("change", this.startDateValue);; //시작 달력값 벨류값 
        _startDateInput.on("blur", this.startValueBlur);  //시작 달력값 설정값 없을때 
        _endDateInput.on("change", this.endDateValue); // 끝 달력값 벨류값
        _endDateInput.on("blur", this.endDateBlur);  // 마지막 달력값 설정값 없을때 

        _typeBtns.on("click", this.typeBtnsClick);
        _textFormBtn.on("click focus propertychange change keyup paste", this.textFormClick);   // input, textarea 이벤트
        _fileUploadBtn.on("change", this.fileImgUpload); // 파일 업로드

        _popBtn.on("click", this.popupItemClick);   // 팝업 버튼 클릭 이벤트
 
      
        _twoDepsMenu.on("click", function (e) {    // 투댑스 버튼 클릭 이벤트
            commonUi.handleMenuClick.call(this, e);
        });
        _twoDepsWrapMenu.on("click", function (e) { // 상단 픽시드 고정 투댑스 버튼 클릭 이벤트
            commonUi.handleMenuClick.call(this, e, true);
        });

        _subDepsMenu.on("click", this.subDepsMenuClick);

        _searchInput.on("input", this.inputTarget); //인풋이벤트 
        _searchInput.on("focus", this.inputFocusEvent);  //인풋 포커스 인 이벤트
        _searchInput.on("focusout", this.inputFocusOutEvent); //인풋 포커스 아웃 이벤트
        _btnTextDelete.on("click", this.inPutTextDeleteClick);  //인풋 벨류값 삭제
        _loginInPut.on("input", this.loginValueCheck);  //로그인 인풋 벨류 체크
        _btnTypeClose.on("click", this.btnTypeCloseClick); //타입 버튼 삭제 이벤트

        _rowScrolLBox.on("scroll", this.rowScrollBoxCheck);
        _btnBookmark.on("click", this.btnBookMarkClick); 
 
        this.tabActivation();  //탭영역 로드 체크 순서
        this.sendBunCehck();  //재난문자 영역 있는지 체크
    },

    loadEvent: function () {
        this.create();
        this.addEvent();
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
        var cHeader = $("header.common");
        var headerHeight = cHeader.height();

        _sT > 80 ? _scrollTopButton.fadeIn() : _scrollTopButton.fadeOut();
        _sT >= _totalOffsetTop ? _stickyTarget.addClass('active') : _stickyTarget.removeClass('active');

        if (!cHeader.hasClass("not")) {
            _sT >= headerHeight ? cHeader.addClass('on') : cHeader.removeClass('on');
        }

        if (cHeader.hasClass("not")) {
            if (_sT >= $("section").offset().top) {
                $(".cm_tab_contents, .cm_tab_panel").addClass('on');
            } else {
                $(".cm_tab_contents, .cm_tab_panel").removeClass('on');
            }
        }
    },

    scrollTopClick: function () {
        var target = $("#wrap").hasClass("home") ? _wrap : $('html, body');
        commonUi.animateScroll(target, 0, $("#wrap").hasClass("home") ? 'main' : 'sub');
    },

    animateScroll: function (target, duration, type) {
        if (!isAnimating[type]) {
            isAnimating[type] = true;
            target.animate({ scrollTop: 0 }, duration, function () {
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
        index === 3 ? commonUi.toggleDateFields(true) : commonUi.toggleDateFields(false);
    },

    toggleDateFields: function (isActive) {
        var action = isActive ? "removeClass" : "addClass";
        var reverseAction = isActive ? "addClass" : "removeClass";
        $(".date_start, .date_end").removeClass("disabled active");
        $(".date_start, .date_end")[action]("disabled");
        $(".date_start, .date_end")[reverseAction]("active");
    },

   
    startDateValue: function () {  // 시작 날짜 선택 시 _lastSelectedStartDate 저장
        _lastSelectedStartDate = $(this).val();
        commonUi.updateSelectedDates();
    },

  
    startValueBlur: function () {  // 시작 날짜 input이 포커스를 잃을 때, 만약 날짜가 선택되지 않았다면 마지막 선택한 날짜로 설정
        if (!$(this).val() && _lastSelectedStartDate) {
            $(this).val(_lastSelectedStartDate);
        }
        commonUi.updateSelectedDates();
    },

    endDateValue: function () {
        _lastSelectedEndDate = $(this).val();
        commonUi.updateSelectedDates();
    },
    
    endDateBlur: function () {
        if (!$(this).val() && _lastSelectedEndDate) { // 시작 날짜 input이 포커스를 잃을 때, 만약 날짜가 선택되지 않았다면 마지막 선택한 날짜로 설정
            $(this).val(_lastSelectedEndDate);
        }
        commonUi.updateSelectedDates();
    },

    updateSelectedDates: function () { //날짜 텍스트 표시
        if (_lastSelectedStartDate) {
            $(".date_start .date_text").text(_lastSelectedStartDate);
        }
        if (_lastSelectedEndDate) {
            $(".date_end .date_text").text(_lastSelectedEndDate);
        }
    },

    updateBarPosition: function (button) {    //상단 탭 바 에니메이션 
        var offsetLeft = button.position().left;
        var bars = $(".cm_tab_contents .bar");
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

        var tabPanelTarget = $(".cm_tab_panel .item");
        tabPanelTarget.removeClass("on");
        tabPanelTarget.eq(index).addClass("on");

        if ($(".cm_full_wrap").length > 0) {
            $(".cm_full_wrap .buttons_list").removeClass("on");
            $(".cm_full_wrap .buttons_list").eq(index).addClass("on");
        }
    },

    textFormClick: function () {
        var $this = $(this);
        var textForm = $this.parent();
        var textArea = $this.is("textarea");
        var byteNum = textForm.find(".byte_num");
        var textFormHeight = textForm.height();

        if ($this.val().length < 1) {
            textForm.find(".btn_delete").removeClass("on");
            textForm.parent().find("button").removeClass("on");
            if (textArea) {
                textForm.removeClass("on");
                byteNum.removeClass("on");
                $this.css("height", "auto");
                $("body").css("padding-bottom", 0);
            }
        } else {
            textForm.find(".btn_delete").addClass("on");
            textForm.parent().find("button").addClass("on");
            if (textArea) {
                textForm.addClass("on");
                byteNum.addClass("on");
                $this.css("height", "auto");
                $this.height(this.scrollHeight);
                $("body").css("padding-bottom", textFormHeight);
            }
        }

        function clearText(textValue) {
            textValue.val("").focus();
            if (textValue.is("textarea")) {
                textValue.css("height", "auto");
            }
        }

        function deleteText() {
            var parent = $(this).parent().parent();
            var textArea = parent.find("textarea");
            var inputField = parent.find("input");

            if (textArea.length > 0) {
                clearText(textArea);
            } else if (inputField.length > 0) {
                clearText(inputField);
            }
        }

        $(".btn_delete").on("click", deleteText);
    },

    handleMenuClick: function (e, wrapMenu = false) {
        e.preventDefault();
        var $this = $(this);
        var index = $this.index();
        var menuContainer = $this.closest(".buttons_list");
        var menuDepth02 = $this.parents("section").find(".depth_02");

        menuContainer.find("li").removeClass("on");
        menuContainer.find("li").eq(index).addClass("on");

        if (index > 0 && menuDepth02.length > 0) {
            menuDepth02.show();
            if (wrapMenu) {
                menuDepth02.css("display", "flex");
            }
        } else if (menuDepth02.length > 0) {
            menuDepth02.hide();
        }

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

    popupItemClick: function () {     // 레이어 팝업 이벤트
        var targetName = $(this).data("target");
        if (targetName) commonUi.openPopup(targetName);
    },

    openPopup: function (targetName) {
        var layerName = "#" + targetName;
        var popupType = $(layerName).attr("class");
        var closeTimeout;

        $("body").find(layerName).addClass("open");
        $("body").css("overflow", "hidden");

        $(layerName).find(".btn_close").on("click", function () {
            closePopup(layerName);
        });

        $(layerName).on("click", function (event) {    // 팝업 외부를 클릭하면 팝업을 닫는 이벤트 핸들러
            if (event.target === this) {
                closePopup(layerName);
            }
        });

        function closePopup(layerName) {
            clearTimeout(closeTimeout);
            $("body").find(layerName).removeClass("open");
            $("body").css("overflow", "scroll");
        }

        if (popupType && popupType.includes("layer_toast")) {    //3초 이후 토스트 팝업 삭제
            closeTimeout = setTimeout(function () {
                closePopup(layerName);
            }, 3000);
        }
    },

    inputTarget: function () {  //검색어 입력시 한글자이상 버튼 삭제 버튼 노출
        var inputLength = $(this).val().length;
        _btnTextDelete.css("display", inputLength > 0 ? "block" : "none");
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
        var liLength = $(".cm_btn_list li").length;
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

                var tabPanelTarget = $(".cm_tab_panel .item");
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
        var dimd = $(".btn_group .dimd");
        dimd.css("display", scrollLeft > 10 ? "none" : "block");
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

    fileImgUpload: function (e) {
        var files = e.target.files;

        function isImageFile(file) {
            var ext = file.name.split(".").pop().toLowerCase();
            return ["jpg", "jpeg", "png"].includes(ext);
        }

        function createListItem(src) {
            var listItem = $('<li><div class="img_box"><img src="' + src + '" alt="Uploaded Image"></div><span class="file_delete"></span></li>');

            listItem.find(".file_delete").on('click', function () {
                $(this).closest("li").remove();
            });

            return listItem;
        }

        function handleFileRead() {
            return function (e) {
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
    }
};

$(function () {
    commonUi.init();
});
