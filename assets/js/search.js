    
/* global var*/
var _w;
var _search;
var _deleteAllBtn;
var _searchListBox;
var _btnSearhDelete;
var _btnCancel;
var _inputBoxTarget;
var _nolistText;

var searchUi = {

    init: function () {
        searchUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _search = $( ".searh" );
        _deleteAllBtn = _search.find( ".btn_all_delete" );
        _searchListBox = _search.find( ".search_list" );

        _btnSearhDelete = _search.find( ".btn_searh_delete" );
        _btnCancel = _search.find( ".btn_cancel" );
        _inputBoxTarget = _search.find( ".input_box" );
        _nolistText = _search.find( ".no_list" );

    },
    addEvent: function(){
        _deleteAllBtn.on( "click", searchUi.deleteAllBtnClick );
        _btnSearhDelete.on( "click", searchUi.btnSearhListDeleteClick );
        _btnCancel.on( "click", searchUi.btnCancelClick );
    },

    loadEvent: function () {
        searchUi.create();
        searchUi.addEvent();
    },
   
    //전체 삭제 이벤트 
    deleteAllBtnClick: function(){ 
        _searchListBox.remove();
        _nolistText.css( "display", "block" ); 
        _deleteAllBtn.css( "display", "none" );
    },

  
    //최근 검색어 리스트 삭제버튼 클릭
    btnSearhListDeleteClick: function(){
     
       $( this ).parents("li").remove();
       if( _searchListBox.find( "li" ).length == 0 ){
        _searchListBox.remove();
        _nolistText.css( "display", "block" ); 
        _deleteAllBtn.css( "display", "none" );
      }
    },

    btnCancelClick: function(){
        _w[0].history.back();
    }
   
};
 


$(function () {
    searchUi.init();
});