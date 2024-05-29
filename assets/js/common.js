
/* global var*/
var _w;
var _htmlBody;
var _gnb;
var _gnbBtn;
var _gnbCloseBtn;
var _scrollTopButton;
var _stickyTarget;

var switchBox = $(".header_switchbox");
if( switchBox.length > 0  ){
    var switchBoxOffset = switchBox.offset().top; 
    var marginTop = parseInt(switchBox.css('margin-top'), 10); 
    var totalOffsetTop = switchBoxOffset - marginTop; 
}

var _switchBox;
var _switchBoxOffset;
var _marginTop; 
var _totalOffsetTop 

var _bottomSheetDim;
var _bottomSheetClose;

var commonUi = {

    init: function () {
        commonUi.loadEvent();
    },
    create: function(){
        _w = $( window );
        _htmlBody = $( "html, body" );
        _gnb = $( ".gnb" );
        _gnbBtn = $( ".btn_hamburger" );
        _gnbCloseBtn = _gnb.find( ".btn_close" );
        _scrollTopButton =  $( ".scroll_top_box" );
        _stickyTarget= $( ".header_sticky " );

        _switchBox = $(".header_switchbox");
        if( switchBox.length > 0 ){
            _switchBoxOffset = _switchBox.offset().top; 
            _marginTop = parseInt(_switchBox.css('margin-top'), 10); 
            _totalOffsetTop = _switchBoxOffset -_marginTop; 
        }

        _bottomSheetDim = $( ".bottom_sheet" ).find( ".dimd" );
        _bottomSheetClose = $( ".bottom_sheet" ).find( ".btn_sheet_close" );
    },
    addEvent: function(){
        commonUi.resizeEvent( null );
        _w.on( "resize", commonUi.resizeEvent );
        _w.on( "scroll", commonUi.scrollEvent );
        
        _gnbBtn.on( "click", commonUi.gnbBtnClick );
        _gnbCloseBtn.on( "click", commonUi.gnbCloseClick );
        _scrollTopButton.on( "click", commonUi.scrollTopClick );
        $(_bottomSheetDim).add(_bottomSheetClose).on("click", commonUi.bottomSheetHide);
    },

    loadEvent: function () {
        commonUi.create();
        commonUi.addEvent();
        console.log( "loadEvent init" );

    },

    resizeEvent: function(){
        console.log( "window resize" );
    },

    scrollEvent: function(){
        var _sT = $(this).scrollTop(); // 현재 스크롤 위치
        

        if (_sT > 10) {
            _scrollTopButton.fadeIn();
        } else {
            _scrollTopButton.fadeOut();
        }

        if (_sT >= _totalOffsetTop) {
            _stickyTarget.addClass('active');
           }
           else {
            _stickyTarget.removeClass('active');
        }
    },

    scrollTopClick: function(){
         _htmlBody.animate({
            scrollTop : 0
        }, 0);
         return false;
    },

    gnbBtnClick: function(){
        _gnb.css( "display", "block" );
    },

    gnbCloseClick: function(){
        _htmlBody.css( "overflow", "auto" );
        _gnb.css( "display", "none" );
    },

    bottomSheetOpen: function(){
        $( ".bottom_sheet" ).addClass( "open" );
        setTimeout( function(){
            $( ".sheet_wrap" ).addClass( "open" );
        },50);
    },
   
    bottomSheetHide: function(){
        $( ".sheet_wrap" ).removeClass( "open" );
        setTimeout( function(){
            $( ".bottom_sheet" ).removeClass( "open" );
        },100);
    }
    
   
};



$(function () {
    commonUi.init();
});