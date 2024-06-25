/* global var*/
var _menuBtnlist;
var _main;
var _switchBoxBtns;
var _selectedValues; //선택된 벨류값 가져오기
var _docment;
var _btnReload;
var _btnApply;
var _btnReset;
var _filter;

var mainUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _main = $("main");
        _menuBtnlist = _main.find(".menu_btn-list").find("li");
        _switchBoxBtns = _main.find(".switch_round > a");
        _selectedValues = JSON.parse(localStorage.getItem('selectedValues')) || [];
        _docment = $( document );
        _filter = $( "section.filter" );
        _btnApply = _filter.find( ".cm_btn_round.active" );
        _btnReset = _filter.find( ".cm_btn_round.on" );
        _btnReload = _main.find(".cm_btn_refresh");

    },

    addEvent: function () {
        _menuBtnlist.on("click", this.menuBtnListClick);
        _switchBoxBtns.on("click", this.switchBoxBtnClick);
        _docment.on('click', '.typeAll', this.typeAllCheck);
        _docment.on('click', 'input[type="checkbox"]:not(.typeAll)', this.typeNotCheck);
        _docment.on('click', '.cm_btn_list .typetag_close', this.closeTag);
        _btnApply.on( "click", this.btnApplyClick );
        _btnReset.on( "click", this.btnResetClick );
        _btnReload.on( "click", this.btnResetClick );
    },

    loadEvent: function () {
        this.create();
        this.addEvent();
    },

    //로컬 스토리지를 업데이트
    updateLocalStorage: function (values) {
        localStorage.setItem('selectedValues', JSON.stringify(values));
    },

    // 메뉴 버튼 클릭 이벤트 핸들러
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
  // 공통 스위치 액션 함수
    commonSwitchAction: function (index) {
        var contents = $(".sections").find("section");
        var roundBar = $(".switch_round");

        _switchBoxBtns.removeClass("on");
        _switchBoxBtns.eq(index).addClass("on");
        contents.removeClass("on");
        contents.eq(index).addClass("on");

        if (index === 0) {
            roundBar.removeClass("right").addClass("left");
        } else {
            roundBar.removeClass("left").addClass("right");
        }
    },

     // 메인 스위치 변경 함수
    mainSwichCahge: function ($type) {
        commonUi.gnbCloseClick();
        mainUi.commonSwitchAction($type);
    },

    // 스위치 박스 버튼 클릭 이벤트 핸들러
    switchBoxBtnClick: function () {
        var index = $(this).index();
        mainUi.commonSwitchAction(index);
    },

     // 태그 닫기 클릭 이벤트 핸들러
    tagCloseClick: function () {
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

    //선택한 벨류값 세팅
    updateSelectedValues: function () {

      // 값이 0일 때 setting_contents 클래스에서 on 패딩 값을 제거
       if(  $('.filter_checkbox:checked').length == 0 ){
         if( $( ".setting_contents" ).hasClass( "on" )){
            $( ".setting_contents" ).removeClass( "on" );
         }
       }
        // 이전 리스트 항목을 지움
       $('.cm_btn_list.etc, .accident_filter .cm_btn_list').empty();
        
        // 체크된 체크박스를 반복하면서 리스트 항목을 추가
       $('.filter_checkbox:checked').each(function () {
            var text = $(this).data('value');
            var listItem = `<li>
                <button class="cm_btn_round on tag"><span class="text">${text}</span></button>
                <a href="javascript:;" class="typetag_close"><span class="blind">삭제</span></a>
            </li>`;

            $('.cm_btn_list.etc, .accident_filter .cm_btn_list').append(listItem);
        });
    
        // 태그의 존재 여부에 따라 bottom_group의 표시 여부를 토글
        var hasTags = $('.cm_btn_list.etc .cm_btn_round.on.tag').length > 0 || $('.accident_filter .cm_btn_list .cm_btn_round.on.tag').length > 0;
        $('.bottom_group').css('display', hasTags ? 'block' : 'none');
    
        // accident filter에 태그가 없으면 숨김
        var accidentFilterHasTags = $('.accident_filter .cm_btn_list .cm_btn_round.on.tag').length === 0;
        $('.accident_filter').css('display', accidentFilterHasTags ? 'none' : 'flex');
    },

     // 모든 체크박스를 선택하는 함수
    typeAllCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            // 동일 그룹의 다른 모든 체크박스를 체크 해제
            $('.checkbox_list[data-group="' + group + '"] input[type="checkbox"]').not(this).prop('checked', false);
        }
        mainUi.updateSelectedValues();
    },
    
     // 특정 체크박스를 선택 해제하는 함수
    typeNotCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            // 동일 그룹의 "typeAll" 체크박스를 체크 해제
            $('.checkbox_list[data-group="' + group + '"] .typeAll').prop('checked', false);
        }
        mainUi.updateSelectedValues();
    },
    
     // 닫기 버튼 클릭 시 li를 삭제하는 함수
    closeTag: function () {
        var text = $(this).siblings('.cm_btn_round').find('.text').text();
        $('input[type="checkbox"]').each(function( index, item) {
            if ($(this).data('value') === text) {
                $(this).prop('checked', false);
            }
        });
        $(this).parent('li').remove();
        mainUi.updateSelectedValues();
    },

    // 적용 버튼 클릭 시 이벤트 
    btnApplyClick: function () {
        var selectedValues = [];
    
        // .cm_btn_list.etc에서 선택된 값을 수집
        $('.cm_btn_list.etc li').each(function () {
            var value = $(this).find('.text').text();
            if (!selectedValues.includes(value)) {
                selectedValues.push(value);
            }
        });
    
         // .accident_filter .cm_btn_list에서 선택된 값을 수집하고 표시를 업데이트
        $('.accident_filter .cm_btn_list li').each(function () {
            var value = $(this).find('.text').text();
            if (!selectedValues.includes(value)) {
                selectedValues.push(value);
            }
        });
    
        // 값의 존재 여부에 따라 표시 업데이트
        if (selectedValues.length > 0) {
            localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
            console.log(selectedValues); // 선택한 벨류값들 setitem으로 값 넣기
            $('.accident_filter').css('display', 'flex');
            $( ".setting_contents" ).addClass( "on" );
        } else {
            $('.accident_filter').css('display', 'none');
            $( ".setting_contents" ).removeClass( "on" );
        }
    },
    
    // 값을 초기화하는 함수
    btnResetClick: function () {
        $('input[type="checkbox"]').prop('checked', false);
        $('.cm_btn_list.etc, .accident_filter .cm_btn_list').empty();
        $('.accident_filter, .bottom_group').css('display', 'none');
        if( $( ".setting_contents" ).hasClass( "on" )){
            $( ".setting_contents" ).removeClass( "on" );
        }
        localStorage.removeItem('selectedValues');
    },
      
};

$(function () {
    mainUi.init();
});