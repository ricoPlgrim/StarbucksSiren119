
/* global var*/
var _w;

var _message;
var _appointed;
var _allTeam;
var _allCheckboxes;
var _teamCheckBox;
var _messageDetail;
var _twodepth;

var alarmUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _message = $( ".message" );
        _messageDetail = $( ".message_detail" );
        _appointed = _message.find( "#appointed" );
        _checkboxes = _message.find('input[type=checkbox][name=check]');
        _allTeam =  _message.find( "#allTeam" );
        _allCheckboxes = _message.find('.team_list input[type=checkbox]').not('#allTeam');
        _teamCheckBox = _messageDetail.find( ".team_checkbox" );
        _twodepth = _messageDetail.find( ".cm_type_twodepth" );
    },
    addEvent: function () {
        _appointed.on( "change", this.appointedChage );
        _checkboxes.on( "change", this.checkboxChage );
        _allTeam.on( "change", this.allTeamClick );
        _allCheckboxes.on( "change", this.allCheckboxesChange );
        _teamCheckBox.on('change', this.teamCheckBoxChage );
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
    },

    teamCheckBoxChage: function(){
        // 체크박스의 부모 라벨 요소를 찾습니다.
        var label = $(this).closest('label');
        var labelText = label.text().trim();
        console.log( labelText == "DM" );
        if ($(this).is(':checked') && labelText == "DM"){
            _twodepth.css( "display", "block" )
        } else {
            _twodepth.css( "display", "none" )
        }
    }
    
};



$(function () {
    alarmUi.init();
});