/* global var */
var _w;
var _docment;
var _btnApply;
var _btnReset;

var filterUi = {
    init: function () {
        filterUi.loadEvent();
        filterUi.loadSelectedValues(); // 페이지 로드 시 저장된 값을 호출
    },
    create: function () {
        _docment = $(document);
        _btnApply = $(".filter").find(".cm_btn_round.active");
        _btnReset = $(".filter").find(".cm_btn_round.on");
    },
    addEvent: function () {
        _docment.on('click', '.typeAll', filterUi.typeAllCheck);
        _docment.on('click', 'input[type="checkbox"]:not(.typeAll)', filterUi.typeNotCheck);
        _docment.on('click', '.cm_btn_list .btn_close', filterUi.closeTag);
        _btnApply.on("click", filterUi.btnApplyClick);
        _btnReset.on("click", filterUi.btnResetClick);
    },
    loadEvent: function () {
        filterUi.create();
        filterUi.addEvent();
    },
    updateSelectedValues: function () {
        $('.cm_btn_list.etc').empty();
        $('input[type="checkbox"]:checked').each(function () {
            var text = $(this).data('value');
            var listItem = `<li>
                <button class="cm_btn_round on tag"><span class="text">${text}</span></button>
                <a href="javascript:;" class="btn_close"><span class="blind">삭제</span></a>
            </li>`;
            $('.cm_btn_list.etc').append(listItem);
        });
        if ($('.cm_btn_list.etc .cm_btn_round.on.tag').length > 0) {
            $('.btn_group').css('display', 'block');
        } else {
            $('.btn_group').css('display', 'none');
        }
    },
    typeAllCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] input[type="checkbox"]').not(this).prop('checked', false);
        }
        filterUi.updateSelectedValues();
    },
    typeNotCheck: function () {
        var group = $(this).closest('.checkbox_list').data('group');
        if ($(this).is(':checked')) {
            $('.checkbox_list[data-group="' + group + '"] .typeAll').prop('checked', false);
        }
        filterUi.updateSelectedValues();
    },
    closeTag: function () {
        var text = $(this).siblings('.cm_btn_round').find('.text').text();
        $('input[type="checkbox"]').each(function () {
            if ($(this).data('value') === text) {
                $(this).prop('checked', false);
            }
        });
        $(this).parent('li').remove();
        filterUi.updateSelectedValues();
    },
    btnApplyClick: function () {
        var selectedValues = [];
        $('.cm_btn_list.etc li').each(function () {
            var value = $(this).find('.text').text();
            selectedValues.push(value);
        });
        localStorage.setItem('selectedValues', JSON.stringify(selectedValues));
        window.history.go(-1);
    },
    btnResetClick: function () {
        $('input[type="checkbox"]').prop('checked', false);
        $('.cm_btn_list.etc').empty();
        $('.btn_group').css('display', 'none');
        localStorage.removeItem('selectedValues'); 
    },

    loadSelectedValues: function () {
        var selectedValues = JSON.parse(localStorage.getItem('selectedValues'));
        if (selectedValues && selectedValues.length > 0) {
            var uniqueValues = [...new Set(selectedValues)];
            uniqueValues.forEach(function (value) {
                $('input[type="checkbox"]').each(function () {
                    if ($(this).data('value') === value) {
                        $(this).prop('checked', true);
                    }
                });
                var listItem = `<li>
                    <button class="cm_btn_round on tag"><span class="text">${value}</span></button>
                    <a href="javascript:;" class="btn_close"><span class="blind">삭제</span></a>
                </li>`;
                $('.cm_btn_list.etc').append(listItem);
            });
            $('.btn_group').css('display', 'block');
        } else {
            $('.btn_group').css('display', 'none');
        }
    }
};

$(function () {
    filterUi.init();
});