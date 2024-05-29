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

        $("body").find(layerName).addClass("active");
        $("body").css("overflow", "hidden");

        $(layerName).find(".btn_close").on("click", function(){
            $("body").find(layerName).removeClass("active");
            $("body").css("overflow", "scroll");
        });
    },
};

$(function () {
    popupUi.init();
});
