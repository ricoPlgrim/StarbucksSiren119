if ($('#wrap').length > 0) {
    var _magnifyView = (function () {
        var $magnify = $('#wrap'),
            $slide = $magnify.find('.slide_img > ul > li'),
            $controller = $magnify.find('.pager'),
            arrSlideH = [],
            isInit = false;

        function setHeight() {
            var totalH = 0;
            arrSlideH = [];
            $slide.each(function (index) {
                totalH += $slide.eq(index).height();
                arrSlideH.push(totalH);
            });
        }

        function setController() {
            var headH = $magnify.find('.head').outerHeight(),
                scroll = $magnify.find('.body').scrollTop() + headH,
                index = 0;
                totalH = 0;
                arrSlideH = [];

                $slide.each(function() {
                    totalH += $(this).outerHeight();
                    arrSlideH.push(totalH);
                });

            if (scroll >= arrSlideH[arrSlideH.length - 1]) {
                index = arrSlideH.length - 1;
            } else {
                for (var i = 0; i < arrSlideH.length;  i++) {
                    var end = arrSlideH[i];
                    if (scroll < end) {
                        index = i;
                        break;
                    }
                }
            }

            $controller.find('span').removeClass('active');
            $controller.find('span').eq(index).addClass('active');
        }

        if ($magnify.find('.body > .slide_img > ul').length > 0) {
            var magnifyIMG = new MagnifyIMG($magnify.find('.body > .slide_img > ul'));
        }

        $magnify.find('.body').on('scroll', setController);


        return {
            zoomStart: function () {
                $controller.hide();
            },
            zoomEnd: function () {
                $controller.show();
            },
            resize: function () {
                setHeight();
                setController();
            },
            init: function () {
                if (!isInit) {
                    isInit = true;
                    isMagnify = true;
                    setHeight();
                }
            }
        };
    }());
}

function MagnifyIMG($target) {
    var panzoomOption = {
        minScale: 1,
        maxScale: 2,
        contain: 'invert',
        increment: 0.35,
        transition: true,
        panOnlyWhenZoomed: true,
        disablePan: true,
        animate: true,
        duration: 200,
        animate_easing: 'linear'
    };
    var $panzoom = $target.panzoom(panzoomOption);
    $panzoom.on('panzoomstart', function () {
        if (_magnifyView) _magnifyView.zoomStart();
    });
    $panzoom.on('panzoomend', function (e, panzoom, matrix, changed) {
        e.stopImmediatePropagation();
        var pan_maxY = Math.ceil((matrix[0] - 1) * $target.outerHeight() / 2) - 30;
        if (changed) {
            if (matrix[5] > pan_maxY - 20) {
                $panzoom.panzoom('destroy').panzoom().panzoom('option', panzoomOption);
                if (_magnifyView) _magnifyView.zoomEnd();
            }
            if (matrix[5] < -1 * pan_maxY + 15) {
                $panzoom.panzoom('destroy').panzoom().panzoom('option', panzoomOption);
                if (_magnifyView) _magnifyView.zoomEnd();
            }
        }
    });
}

window.onload = function () {
    _magnifyView.init();
}

$(window).on("resize", function () {
    _magnifyView.resize();
});