
/* global var*/
var _docment;
var _btnApply;
var _btnReset;

var filterUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _docment = $( document );
        _btnApply = $( ".filter" ).find( ".cm_btn_round.active" );
        _btnReset = $( ".filter" ).find( ".cm_btn_round.on" );

    },
    addEvent: function () {

        _docment.on('click', '.typeAll', this.typeAllCheck);
        _docment.on('click', 'input[type="checkbox"]:not(.typeAll)', this.typeNotCheck);
        _docment.on('click', '.cm_btn_list .btn_close', this.closeTag);
        _btnApply.on( "click", this.btnApplyClick );
        _btnReset.on( "click", this.btnResetClick );


    },

    loadEvent: function () {
        this.create();
        this.addEvent();
    },

    // 선택된 값을 업데이트
    updateSelectedValues: function () {
        $('.cm_btn_list.etc').empty();
        $('input[type="checkbox"]:checked').each(function() {
            var text = $(this).data('value');
            var listItem = `<li>
                <button class="cm_btn_round on tag"><span class="text">${text}</span></button>
                <a href="javascript:;" class="typetag_close"><span class="blind">삭제</span></a>
            </li>`;
            $('.cm_btn_list.etc').append(listItem);
        });
        if ($('.cm_btn_list.etc .cm_btn_round.on.tag').length > 0) {
            $('.btn_group').css('display', 'block');
        } else {
            $('.btn_group').css('display', 'none');
        }
    },

 // "모두 선택" 체크박스 클릭 이벤트
    typeAllCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] input[type="checkbox"]').not(this).prop('checked', false);
        }

        filterUi.updateSelectedValues();
    },

    // 특정 체크박스 클릭 이벤트
    typeNotCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] .typeAll').prop('checked', false);
        }
        filterUi.updateSelectedValues();
    },


    //닫기 버튼 클릭시 li 삭제 
    closeTag: function () {
        var text = $(this).siblings('.cm_btn_round').find('.text').text();
        $('input[type="checkbox"]').each(function() {
            if ($(this).data('value') === text) {
                $(this).prop('checked', false);
            }
        });
        $(this).parent('li').remove();
        filterUi.updateSelectedValues();
    },

    //적용버튼 클릭시
    btnApplyClick: function(){
        var selectedValues = [];
        $('.cm_btn_list.etc li').each(function() {
            var value = $(this).find('.text').text();
            selectedValues.push(value);
        });
        if (selectedValues.length > 0) {
            localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
            console.log(selectedValues); //선택한 벨류값들 setitem으로 값 넣기
        }

    },

    // 리셋 버튼 클릭 시 이벤트
    btnResetClick: function(){
      $('input[type="checkbox"]').prop('checked', false);
      $('.cm_btn_list.etc').empty();
      $('.btn_group').css('display', 'none');
      localStorage.removeItem('selectedValues');
    }
};



$(function () {
    filterUi.init();
});