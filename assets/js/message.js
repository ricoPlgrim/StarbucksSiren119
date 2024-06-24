
/* global var*/
var _w;

var _message;
var _appointed;
var _allTeam;
var _allCheckboxes;
var _teamCheckBox;
var _twodepth;
var _teamDetailPopup;
var _teamListBtn;

var alarmUi = {

    init: function () {
        this.loadEvent();
    },
    create: function () {
        _w = $(window);
        _message = $( ".message" );
        _teamDetailPopup = $( "#teamDetailPopup" );
        _appointed = _message.find( "#appointed" );
        _checkboxes = _message.find('input[type=checkbox][name=check]');
        _allTeam =  _teamDetailPopup.find( "#allTeam" );
        _allCheckboxes = _teamDetailPopup.find('.team_list input[type=checkbox]').not('#allTeam');
        _teamCheckBox = _teamDetailPopup.find( ".team_checkbox" );
        _twodepth = _teamDetailPopup.find( ".cm_type_twodepth" );
        _teamListBtn = _message.find( ".btn_team_close" );
    },
    addEvent: function () {
        _appointed.on( "change", this.appointedChage );
        _checkboxes.on( "change", this.checkboxChage );
        _allTeam.on( "change", this.allTeamClick );
        _allCheckboxes.on( "change", this.allCheckboxesChange );
        _teamCheckBox.on('change', this.teamCheckBoxChange );
        _teamListBtn.on( "click", this.teamListBtnClick );
    },
    loadEvent: function () {
        this.create();
        this.addEvent();
    },

    appointedChage: function(){
        if ($(this).is(':checked')) {
            commonUi.openPopup( "teamDetailPopup" );
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

    teamCheckBoxChange: function(){
        // 체크박스의 부모 라벨 요소를 찾습니다.
        var label = $(this).closest('label');
        var labelText = label.text().trim();
        if ($(this).is(':checked')) {
            _teamCheckBox.not(this).prop('checked', false);
        }
        if ($(this).is(':checked') && labelText == "DM"){
            _twodepth.css( "display", "block" )
        } else {
            _twodepth.css( "display", "none" )
        }
    },

    teamListBtnClick: function(){
        var that = $( this ).parents( "li" );
        var list = _message.find( ".team_list" ).find( "li" );
        var contents = _message.find( ".team_contents" );
        that.remove();
        if( list.length-1 == 0 ){
            contents.remove();
        }
       
    }
    
};



$(function () {
    alarmUi.init();
});