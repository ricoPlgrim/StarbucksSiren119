/* global var */
var _w;
var _popBtn;

var popupUi = {
    init: function () {
        popupUi.loadEvent();
    },
    create: function(){
        _w = $(window);
        _popBtn = $("body").find("a");
    },
    addEvent: function(){
        popupUi.resizeEvent(null);
        _w.on("resize", popupUi.resizeEvent);
        _popBtn.on("click", popupUi.popupItemClick);
    },
    loadEvent: function () {
        popupUi.create();
        popupUi.addEvent();
    },
    resizeEvent: function(){
        console.log("window resize");
    },
    popupItemClick: function(){
        var targetName = $(this).data("target");
        if(targetName) popupUi.openPopup(targetName);
    },
    openPopup: function(targetName) {
        var layerName = "#" + targetName;

        $("body").find(layerName).addClass("open");
        $("body").css("overflow", "hidden");

        $(layerName).find(".btn_close").on("click", function(){
            closePopup(layerName);
        });

        // 팝업 외부를 클릭하면 팝업을 닫는 이벤트 핸들러
        $(layerName).on("click", function(event) {
            if (event.target === this) {
                closePopup(layerName);
            }
        });

        function closePopup(layerName) {
            $("body").find(layerName).removeClass("open");
            $("body").css("overflow", "scroll");
        }
    },
};

$(function () {
    popupUi.init();
});
