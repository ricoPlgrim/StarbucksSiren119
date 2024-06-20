
/* global var*/
var _w;

var _message;
var _appointed;
var _allTeam;
var _allCheckboxes;

var alarmUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _message = $( ".message" );
        _appointed = _message.find( "#appointed" );
        _checkboxes = $('input[type=checkbox][name=check]');
        _allTeam = $( "#allTeam" );
        _allCheckboxes = $('.team_list input[type=checkbox]').not('#allTeam');

        // $('.team_list.check_list input[type=checkbox]').not('#allTeam').change(function() {
        //     if ($(this).is(':checked')) {
        //         $('#allTeam').prop('checked', false);
        //     }
        // });



    },
    addEvent: function () {
        _appointed.on( "change", this.appointedChage );
        _checkboxes.on( "change", this.checkboxChage );
        _allTeam.on( "change", this.allTeamClick );
        _allCheckboxes.on( "change", this.allCheckboxesChange );
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
    },

    allTeamClick: function(){
        if ($(this).is(':checked')) {
            $('.team_list.check_list input[type=checkbox]').not(this).prop('checked', false);
        }
    },

    allCheckboxesChange: function(){
        if ($(this).is(':checked')) {
            $('#allTeam').prop('checked', false);
        }
    }
    
};



$(function () {
    alarmUi.init();
});