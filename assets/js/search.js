    
/* global var*/
var _w;
var _search;
// var _searchInput;
var _deleteAllBtn;
// var _btnTextDelete;
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
        // _searchInput= _search.find( ".search_input" );
        _deleteAllBtn = _search.find( ".btn_all_delete" );
        // _btnTextDelete = _search.find( ".btn_text_delete" );
        _searchListBox = _search.find( ".search_list" );

        _btnSearhDelete = _search.find( ".btn_searh_delete" );
        _btnCancel = _search.find( ".btn_cancel" );
        _inputBoxTarget = _search.find( ".input_box" );
        _nolistText = _search.find( ".no_list" );

    },
    addEvent: function(){
        // _searchInput.on( "input", searchUi.inputTarget );
        // _searchInput.on( "focus", searchUi.inputFocusEvent );
        // _searchInput.on( "focusout", searchUi.inputFocusOutEvent );
        _deleteAllBtn.on( "click", searchUi.deleteAllBtnClick );
        // _btnTextDelete.on( "click", searchUi.inPutTextDeleteClick );
        _btnSearhDelete.on( "click", searchUi.btnSearhListDeleteClick );
        _btnCancel.on( "click", searchUi.btnCancelClick );
    },

    loadEvent: function () {
        searchUi.create();
        searchUi.addEvent();
    },


    //검색어 입력시 한글자이상 버튼 삭제 버튼 노출
    // inputTarget: function(){
    //     var inputLength = $( this ).val().length;
    //     if( inputLength > 0 ){
    //         _btnTextDelete.css( "display", "block" );
    //     }else{
    //         _btnTextDelete.css( "display", "none" );
    //     }

    // },

    // inputFocusEvent: function(){
    //     _inputBoxTarget.addClass('active');
    // },

    // inputFocusOutEvent: function(){
    //     _inputBoxTarget.removeClass('active');
    // },
    //전체 삭제 이벤트 
    deleteAllBtnClick: function(){ 
        _searchListBox.remove();
        _nolistText.css( "display", "block" ); 
        _deleteAllBtn.css( "display", "none" );
    },

    //인풋에 텍스트 글자 삭제
    // inPutTextDeleteClick: function(){
    //     _searchInput.val("");
    // },

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