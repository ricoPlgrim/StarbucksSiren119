
/* global var*/
var _w;
var _btnDisableAll;
var _btnDisable;
var _btnAccident;

var alarmUi = {

    init: function () {
        alarmUi.loadEvent();
    },
    create: function () {
        _w = $(window);
        _setting = $( ".setting" );
        _btnDisableAll= _setting.find( ".btn_disableAll" );
        _btnDisable= _setting.find( ".btn_disable" );
        _btnAccident = _setting.find( ".accident" );


    },
    addEvent: function () {
        _btnDisableAll.on( "click", alarmUi.btnDisableAllClick );
        _btnDisable.on( "click", alarmUi.btnDisableClick );
        _btnAccident.on( "change", alarmUi.btnAccidentCheck );

    },
    loadEvent: function () {
        alarmUi.create();
        alarmUi.addEvent();
    },

    btnDisableAllClick: function(){
        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked') || $('#toggle3').is(':checked')) {
            $('.toggle_input').prop('checked', false);
            alert( "전체 알림 해지했습니다." );
        }
    },

    btnDisableClick: function(){

        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked')) {
            _btnAccident.prop('checked', false);
            alert("사건 사고 알림 해지했습니다.");
        }
    },

    btnAccidentCheck: function(){
        if ($(this).is(':checked')) {
            _btnAccident.not(this).prop('checked', false);
        }
    },

  
    
};



$(function () {
    alarmUi.init();
});