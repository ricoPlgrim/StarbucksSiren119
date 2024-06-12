/* global var*/
var _w;
var _report;
var _reportListBtn;
var _timeBtn;
var _dateBtn;
var _selectItem;

var reportUi = {

    init: function () {
        reportUi.loadEvent();
        reportUi.detailSwiper();
        reportUi.visualPopScroll(); 
    },
    create: function(){
        _w = $( window );
        _report = $(".sub");
        _reportListBtn = _report.find(".form_list li").filter(function() {
            return !$(this).hasClass("text_box") && !$(this).hasClass("time_box") && !$(this).hasClass("date_box");
        });
        _timeBtn = _report.find(".form_list").find(".time_box");
        _dateBtn = _report.find(".form_list").find(".date_box");
    },
    addEvent: function(){
        reportUi.resizeEvent( null );
        _w.on( "resize", reportUi.resizeEvent );
        _reportListBtn.on("click", reportUi.reportBtnClick);
        _timeBtn.on("click", reportUi.timeBtnClick);
        _dateBtn.on("click", reportUi.dateBtnClick);
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
    timeBtnClick: function(){
        var timeInput = $(this).find(".time_input");
        var timeText = $(this).find(".time_display");  

        $(this).addClass("on");

        timeInput.on("change", function() {
            var selectedTime = $(this).val();
                if (selectedTime) {
                    var hourMinute = selectedTime.split(":");
                        hours = parseInt(hourMinute[0]),
                        minutes = hourMinute[1],
                        period = hours >= 12 ? "오후" : "오전";
                    
                    var formattedHours = ("0" + hours).slice(-2);
                    var formattedTime = `${period} ${formattedHours}시 ${minutes}분`;

                timeText.text(formattedTime);
            }
        });
    },
    dateBtnClick: function(){
        var dateInput = $(this).find(".date_input");     
        var dateText = $(this).find(".date_display");  
        
        $(this).addClass("on");

        dateInput.on("change", function() {
            var selectedDate = new Date($(this).val()),
                year = selectedDate.getFullYear(),
                month = String(selectedDate.getMonth() + 1).padStart(2, '0'),
                day = String(selectedDate.getDate()).padStart(2, '0');

            var formattedDate = `${year}년 ${month}월 ${day}일`;
            dateText.text(formattedDate);
        });
    },
    detailSwiper: function(){
        if ($(".detail_swiper").length) {
            new Swiper(".detail_swiper", {
                slidesPerView: "auto",
                pagination: {
                    el: ".swiper-pagination",
                },
            });
        }
	},
    // 보고 상세 상단 확대보기 팝업 스크롤 이벤트
    visualPopScroll: function(){
        if ($("#detailVisualPop").length > 0) {
            var detailVisualWrap = $("#detailVisualPop"),
                slides = detailVisualWrap.find(".slide_img > ul > li"),
                pagination = detailVisualWrap.find(".pagination"),
                bullets = pagination.find(".bullet");
    
            function setController() {
                var headH = detailVisualWrap.find("header").outerHeight(),
                    scroll = detailVisualWrap.find(".pop_cont01").scrollTop() + headH,
                    index = 0,
                    totalH = 0,
                    arrSlideH = [];
    
                slides.each(function () {
                    totalH += $(this).outerHeight();
                    arrSlideH.push(totalH);
                });
    
                if (scroll >= arrSlideH[arrSlideH.length - 1]) {
                    index = arrSlideH.length - 1;
                } else {
                    for (var i = 0; i < arrSlideH.length; i++) {
                        var end = arrSlideH[i];
                        if (scroll < end) {
                            index = i;
                            break;
                        }
                    }
                }
    
                bullets.removeClass("active");
                bullets.eq(index).addClass("active");
            }
    
            detailVisualWrap.find(".pop_cont01").on("scroll", setController);
        }
    }
};

$(function () {
    reportUi.init();
});