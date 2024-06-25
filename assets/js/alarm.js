
/* global var*/
var _btnDisableAll;
var _btnDisable;
var _btnAccident;
var _btnAllCheck;
var _btnRemoveAll;


var alarmUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _setting = $( ".setting" );
        _btnDisableAll= _setting.find( ".btn_disableAll" );
        _btnDisable= _setting.find( ".btn_disable" );
        _btnAccident = _setting.find( ".accident" );
        _btnAllCheck = _setting.find( ".situation" );
        _btnRemoveAll = _setting.find( ".delete" );
        _appointed = $( "#appointed" );


    },
    addEvent: function () {
        _btnDisableAll.on( "click", this.btnDisableAllClick );
        _btnDisable.on( "click", this.btnDisableClick );
        _btnAccident.on( "change", this.btnAccidentCheck );
        _btnAllCheck.on( "click", this.btnAllCheck );
        _btnRemoveAll.on( "click", this.btnRemoveAlltag );

    },
    loadEvent: function () {
        this.create(); 
        this.addEvent();
    },

     // 전체 알림 해지 버튼 클릭 이벤트 핸들러
    btnDisableAllClick: function(){
        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked') || $('#toggle3').is(':checked')) {
            $('.toggle_input').prop('checked', false);
            commonUi.openPopup("settingPop"); 
            $( "#settingPop").find( ".text" ).text( "전체 알림 해지했습니다." );
        }
    },

    // 특정 알림 해지 버튼 클릭 이벤트 핸들러
    btnDisableClick: function(){
        if ($('#toggle1').is(':checked') || $('#toggle2').is(':checked')) {
            _btnAccident.prop('checked', false);
            commonUi.openPopup("settingPop"); 
            $( "#settingPop").find( ".text" ).text( "사건 사고 알림 해지했습니다." );
        }
    },

    // 사고 알림 체크박스 변경 이벤트 핸들러
    btnAccidentCheck: function(){
        if ($(this).is(':checked')) {
            _btnAccident.not(this).prop('checked', false);
        }
    },

     // 전체 체크 버튼 클릭 이벤트 핸들러
    btnAllCheck: function(){
        commonUi.bottomSheetHide('record');
        if( $( ".alarm_list" ).find( "li" ).length > 0  ){
            $( ".alarm_list" ).find( "li" ).addClass( "lead");
        }
    },
    
     // 전체 삭제 버튼 클릭 이벤트 핸들러
    btnRemoveAlltag: function(){
        commonUi.bottomSheetHide('record');
        if( $( ".alarm_list_box" ).length > 0  ){
            $( ".alarm_list_box" ).remove();
            $( ".no_alerts" ).css( "display", "block" );
        }
    },
    
};



$(function () {
    alarmUi.init();
});