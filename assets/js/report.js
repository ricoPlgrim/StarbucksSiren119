/* global var*/
var _w;
var _report;
var _reportListBtn;
var _selectBtn;
var _selectItem;

var reportUi = {

    init: function () {
        reportUi.loadEvent();
        reportUi.detailSwiper(); 
    },
    create: function(){
        _w = $( window );
        _report = $( ".report" );
        _reportListBtn = _report.find("ul.form_list").find("li").not(".option_list > li");
        _selectBtn = _report.find("ul.form_list").find(".select_option");
        _selectItem = _report.find("ul.option_list").find("li");
    },
    addEvent: function(){
        reportUi.resizeEvent( null );
        _w.on( "resize", reportUi.resizeEvent );
        _reportListBtn.on("click", reportUi.reportBtnClick);
        _selectBtn.on("click", reportUi.selectBtnClick);
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

        $(".option_list").not(optionList).removeClass("active");
        optionList.toggleClass("active");
        selectBox.addClass("on");

        _selectItem.on("click", reportUi.selectItemClick);
    },
    selectItemClick: function(){
        var selectedText = $(this).text();
        var selectBox = $(this).closest(".select_box");
        var selectOption = selectBox.find(".select_option");

        selectOption.text(selectedText);
        selectBox.find(".option_list").removeClass("active");
    },
    detailSwiper: function(){
        var swiper = new Swiper(".swiper01", {
			slidesPerView: "auto",
			pagination: {
				el: ".swiper-pagination",
			},
		});
	},
};

$(function () {
    reportUi.init();
});