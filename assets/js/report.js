/* global var*/
var _w;
var _report;
var _detail;
var _reportListBtn;
var _selectBtn;
var _selectItem;
var _btnBookmark;

var reportUi = {

    init: function () {
        reportUi.loadEvent();
        reportUi.detailSwiper(); 
    },
    create: function(){
        _w = $( window );
        _report = $(".report");
        _detail = $(".detail");
        _reportListBtn = _report.find(".form_list").find("li").not("li.text_box");
        _selectBtn = _report.find(".form_list").find(".select_option");
        _selectItem = _report.find(".option_list").find("p");
        _btnBookmark = _detail.find(".btn_bookmark");
    },
    addEvent: function(){
        reportUi.resizeEvent( null );
        _w.on( "resize", reportUi.resizeEvent );
        _reportListBtn.on("click", reportUi.reportBtnClick);
        _selectBtn.on("click", reportUi.selectBtnClick);
        _btnBookmark.on("click", reportUi.bookmarkBtnClick);
    },
    loadEvent: function () {
        reportUi.create();
        reportUi.addEvent();
    },
    resizeEvent: function(){
        console.log("window resize");
    },
    reportBtnClick: function(){
        $(this).toggleClass("on");
    },
    selectBtnClick: function(){
        var optionList = $(this).siblings(".option_list");
        var selectBox = $(this).parents(".select_box");

        optionList.toggleClass("active");
        selectBox.addClass("on");

        var currentText = $(this).text();

        optionList.find("p").each(function() {
            $(this).text() === currentText ?  $(this).hide() : $(this).show();
        });

        _selectItem.on("click", reportUi.selectItemClick);
    },
    selectItemClick: function(){
        var selectBox = $(this).closest(".select_box");
        var selectedText = $(this).text();
        var optionList = selectBox.find(".option_list");
        var selectOption = selectBox.find(".select_option");

        selectOption.text(selectedText);
        selectBox.find(".option_list").removeClass("active");

        optionList.find("p").each(function() {
            $(this).text() === selectedText ? $(this).show() : $(this).hide();
        });
    },
    bookmarkBtnClick: function(){
        $(this).toggleClass("on");
    },
    detailSwiper: function(){
        if ($('.detail_swiper').length) {
            new Swiper('.detail_swiper', {
                slidesPerView: 'auto',
                pagination: {
                    el: '.swiper-pagination',
                },
            });
        }
	},
};

$(function () {
    reportUi.init();
});