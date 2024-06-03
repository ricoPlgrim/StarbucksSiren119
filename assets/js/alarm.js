
/* global var*/
var _w;
var _btnDisableAll;
var _btnDisable;

var alarmUi = {

    init: function () {
        alarmUi.loadEvent();
    },
    create: function () {
        _w = $(window);
        _setting = $( ".setting" );
        _btnDisableAll= _setting.find( ".btn_disableAll" );
        _btnDisable= _setting.find( ".btn_disable" );


    },
    addEvent: function () {
        _btnDisableAll.on( "click", alarmUi.btnDisableAllClick );
        _btnDisable.on( "click", alarmUi.btnDisableClick );

    },
    loadEvent: function () {
        alarmUi.create();
        alarmUi.addEvent();
    },


    btnDisableAllClick: function(){
        $('.toggle_input').prop('checked', false);
        alert( "전체 알림 해지했습니다." );
        return false;
    },

    btnDisableClick: function(){

        if ($('.entire').prop('checked') || $('.emergency').prop('checked')) {
            $('.entire, .emergency').prop('checked', false);
            alert( "사건 사고 알림 해지했습니다." );
            return false;
        } 
    }
    
};



$(function () {
    alarmUi.init();
});