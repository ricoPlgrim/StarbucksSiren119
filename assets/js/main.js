var _w;
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
        _w = $(window);
        _main = $("main");
        _menuBtnlist = _main.find(".menu_btn-list").find("li");
        _switchBoxBtns = _main.find(".switch_round > a");
        _selectedValues = JSON.parse(localStorage.getItem('selectedValues')) || [];
        _docment = $( document );
        _filter = $( "section.filter" );
        _btnApply = _filter.find( ".cm_btn_round.active" );
        _btnReset = _filter.find( ".cm_btn_round.on" );
        _btnReload = _main.find(".btn_refresh");

    },
    addEvent: function () {
        _menuBtnlist.on("click", mainUi.menuBtnListClick);
        _switchBoxBtns.on("click", mainUi.switchBoxBtnClick);
        _docment.on('click', '.typeAll', mainUi.typeAllCheck);
        _docment.on('click', 'input[type="checkbox"]:not(.typeAll)', mainUi.typeNotCheck);
        _docment.on('click', '.cm_btn_list .typetag_close', mainUi.closeTag);
        _btnApply.on( "click", mainUi.btnApplyClick );
        _btnReset.on( "click", mainUi.btnResetClick );

     



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
        $('.cm_btn_list.etc').empty();
        $('.accident_filter .cm_btn_list').empty(); // Clear the accident filter list before appending new items
        $('input[type="checkbox"]:checked').each(function() {
            var text = $(this).data('value');
            var listItem = `<li>
                <button class="cm_btn_round on tag"><span class="text">${text}</span></button>
                <a href="javascript:;" class="typetag_close"><span class="blind">삭제</span></a>
            </li>`;
            $('.cm_btn_list.etc').append(listItem);
            $('.accident_filter .cm_btn_list').append(listItem);
        });
        if ($('.cm_btn_list.etc .cm_btn_round.on.tag').length > 0 || $('.accident_filter .cm_btn_list .cm_btn_round.on.tag').length > 0){
            $('.bottom_group').css('display', 'block');
        }else{
            $('.bottom_group').css('display', 'none');
        }

        if(  $('.accident_filter .cm_btn_list .cm_btn_round.on.tag').length == 0 ){
            $( ".accident_filter " ).css( "display", "none" )
        }
    },

    typeAllCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] input[type="checkbox"]').not(this).prop('checked', false);
        }

        mainUi.updateSelectedValues();
    },


    typeNotCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] .typeAll').prop('checked', false);
        }
        mainUi.updateSelectedValues();
    },


    //닫기 버튼 클릭시 li 삭제 
    closeTag: function () {
        console.log( "close?" );
        var text = $(this).siblings('.cm_btn_round').find('.text').text();
        $('input[type="checkbox"]').each(function() {
            if ($(this).data('value') === text) {
                $(this).prop('checked', false);
            }
        });
        $(this).parent('li').remove();
        mainUi.updateSelectedValues();
    },

    //적용하기
    btnApplyClick: function(){
        var selectedValues = [];
        $('.cm_btn_list.etc li').each(function() {
            var value = $(this).find('.text').text();
            if (!selectedValues.includes(value)) {
                selectedValues.push(value);
            }
        });
        
        //메인화면 필터 리스트 태그 
        $('.accident_filter .cm_btn_list li').each(function() {
            var value = $(this).find('.text').text();
            if (!selectedValues.includes(value)) {
                selectedValues.push(value);
            }
            if( value && value.length > 0){
                $( ".accident_filter" ).css( "display", "flex" );
            }else{
                $( ".accident_filter" ).css( "display", "none" );
            }
        });

        if (selectedValues.length > 0) {
            localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
            console.log(selectedValues); //선택한 벨류값들 setitem으로 값 넣기
        }
        var oneDepsIndex = commonUi.selectedOneDepsIndex ; 
        var twoDepsIndex = commonUi.selectedTwoDepsIndex ; 

        console.log( oneDepsIndex, twoDepsIndex );

    },

    //벨류값 초기화
    btnResetClick: function(){
        $('input[type="checkbox"]').prop('checked', false);
        $('.cm_btn_list.etc').empty();
        $('.accident_filter .cm_btn_list').empty();
        $('.accident.btn_group').css('display', 'none');
        $('.bottom_group').css('display', 'none');
        localStorage.removeItem('selectedValues');
      },
      
     //새로고침
    reloadBtnClick: function () {
        location.reload();
    },

    



};



$(function () {
    mainUi.init();
});