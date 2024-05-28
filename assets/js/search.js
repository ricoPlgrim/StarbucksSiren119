    
/* global var*/
var _w;
var _search;
var _searchInput;
var _deleteAllBtn;
var _btnTextDelete;
var searchListBox;
var searchListItem;
var btnSearhDelete;

var searchUi = {

    init: function () {
        searchUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _search = $( ".searh" );
        _searchInput= _search.find( ".search_input" );
        _deleteAllBtn = _search.find( ".btn_all_delete" );
        _btnTextDelete = _search.find( ".btn_text_delete" );
        searchListBox = _search.find( ".search_list" );

        btnSearhDelete = _search.find( ".btn_searh_delete" );

        console.log( _deleteAllBtn );
    },
    addEvent: function(){
        _searchInput.on( "input", searchUi.inputTarget );
        _deleteAllBtn.on( "click", searchUi.deleteAllBtnClick );
        _btnTextDelete.on( "click", searchUi.inPutTextDeleteClick );
        btnSearhDelete.on( "click", searchUi.btnSearhListDeleteClick );
    },

    loadEvent: function () {
        searchUi.create();
        searchUi.addEvent();
    },


    //검색어 입력시 한글자이상 버튼 삭제 버튼 노출
    inputTarget: function(){
        var inputLength = $( this ).val().length;

        if( inputLength >0 ){
            _btnTextDelete.css( "display", "block" );
        }else{
            _btnTextDelete.css( "display", "none" );
        }

    },

    //전체 삭제 이벤트 
    deleteAllBtnClick: function(){ 
        searchListBox.find( "li" ).remove();
        console.log( "전체 삭제!" );
    },

    //인풋에 텍스트 글자 삭제
    inPutTextDeleteClick: function(){
        _searchInput.val("");
    },

    //최근 검색어 리스트 삭제버튼 클릭
    btnSearhListDeleteClick: function(){
        var that = $( this ).parents("li").remove();
        console.log( that); 
    }
   
};
 


$(function () {
    searchUi.init();
});