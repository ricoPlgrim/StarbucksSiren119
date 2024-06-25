/* global var*/
var _search;
var _deleteAllBtn;
var _searchListBox;
var _btnSearhDelete;
var _btnCancel;
var _nolistText;

var searchUi = {

    init: function () {
        this.loadEvent();
    },
    create: function(){
        _search = $( ".searh" );
        _deleteAllBtn = _search.find( ".btn_all_delete" );
        _searchListBox = _search.find( ".search_list" );

        _btnSearhDelete = _search.find( ".btn_searh_delete" );
        _btnCancel = _search.find( ".btn_cancel" );
        _nolistText = _search.find( ".no_list" );

    },
    addEvent: function(){
        _deleteAllBtn.on( "click", this.deleteAllBtnClick );
        _btnSearhDelete.on( "click", this.btnSearhListDeleteClick );
        _btnCancel.on( "click", this.btnCancelClick );
    },

    loadEvent: function () {
        this.create();
        this.addEvent();
    },
   
   // 전체 삭제 버튼 클릭 이벤트
    deleteAllBtnClick: function(){ 
        _searchListBox.remove();
        _nolistText.css( "display", "block" ); 
        _deleteAllBtn.css( "display", "none" );
    },

  
    // 최근 검색어 리스트 삭제 버튼 클릭 이벤트
    btnSearhListDeleteClick: function(){
       $( this ).parents("li").remove();
       if( _searchListBox.find( "li" ).length == 0 ){
        _searchListBox.remove();
        _nolistText.css( "display", "block" ); 
        _deleteAllBtn.css( "display", "none" );
      }
    },

   // 취소 버튼 클릭 이벤트
    btnCancelClick: function(){
        _w[0].history.back();
    }
   
};
 


$(function () {
    searchUi.init();
});