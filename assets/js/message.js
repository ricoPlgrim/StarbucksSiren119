
/* global var*/
var _w;

var _message;
var _appointed;
var alarmUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _message = $( ".message" );
        _appointed = _message.find( "#appointed" );
        _checkboxes = $('input[type=checkbox][name=check]');

    },
    addEvent: function () {
        _appointed.on( "change", this.appointedChage );
        _checkboxes.on( "change", this.checkboxChage );
    },
    loadEvent: function () {
        this.create();
        this.addEvent();
    },

    appointedChage: function(){
        if ($(this).is(':checked')) {
            commonUi.openPopup( "teamDetailPopup" );
            console.log('체크박스가 체크되었습니다.');
        } else {
            console.log('체크박스가 체크 해제되었습니다.');
        }
    },

    checkboxChage: function(){
        if ($(this).is(':checked')) {
            $('input[type=checkbox][name=check]').not(this).prop('checked', false);
        }
    }

    
    
};



$(function () {
    alarmUi.init();
});