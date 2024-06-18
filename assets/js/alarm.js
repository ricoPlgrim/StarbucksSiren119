
/* global var*/
var _w;
var _btnDisableAll;
var _btnDisable;
var _btnAccident;

var _btnAlCheck;
var _btnRemoveAll;

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
        _btnAlCheck = _setting.find( ".situation" );
        _btnRemoveAll = _setting.find( ".delete" );


    },
    addEvent: function () {
        _btnDisableAll.on( "click", alarmUi.btnDisableAllClick );
        _btnDisable.on( "click", alarmUi.btnDisableClick );
        _btnAccident.on( "change", alarmUi.btnAccidentCheck );
        _btnAlCheck.on( "click", alarmUi.btnAllCheck );
        _btnRemoveAll.on( "click", alarmUi.btnRemoveAlltag );

    },
    loadEvent: function () {
        alarmUi.create();
        alarmUi.addEvent();
    },

    btnDisableAllClick: function(){
        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked') || $('#toggle3').is(':checked')) {
            $('.toggle_input').prop('checked', false);
            commonUi.openPopup("settingPop"); 
            $( "#settingPop").find( ".text" ).text( "전체 알림 해지했습니다." );
        }
    },

    btnDisableClick: function(){

        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked')) {
            _btnAccident.prop('checked', false);
            commonUi.openPopup("settingPop"); 
            $( "#settingPop").find( ".text" ).text( "사건 사고 알림 해지했습니다." );
        }
    },

    btnAccidentCheck: function(){
        if ($(this).is(':checked')) {
            _btnAccident.not(this).prop('checked', false);
        }
    },
    btnAllCheck: function(){
        commonUi.bottomSheetHide('record');
        if( $( ".alarm_list" ).find( "li" ).length > 0  ){
            $( ".alarm_list" ).find( "li" ).addClass( "lead");
        }
    },
    
    btnRemoveAlltag: function(){
        commonUi.bottomSheetHide('record');
        if( $( ".alarm_list_box" ).length > 0  ){
            $( ".alarm_list_box" ).remove();
            $( ".no_alerts" ).css( "display", "block" );
        }
    }
    
};



$(function () {
    alarmUi.init();
});