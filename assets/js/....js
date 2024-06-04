$(document).ready(function() {
  // 가운데 정렬 함수
  function centerMenu(menuContainer, menuItem) {
    var containerWidth = $(menuContainer).outerWidth();
    var itemOffsetLeft = $(menuItem).offset().left;
    var itemWidth = $(menuItem).outerWidth();
    $(menuContainer).scrollLeft(itemOffsetLeft - (containerWidth - itemWidth) / 2);
  }

  // 각 메뉴 컨테이너에 대해 이벤트 처리
  $('.menu-container').each(function() {
    var menuContainer = $(this);
    var menuItems = menuContainer.find('.menu li');

    // 메뉴 클릭 이벤트
    menuItems.find('a').on('click', function(e) {
      e.preventDefault();
      centerMenu(menuContainer, $(this).parent());
    });

    // 스크롤 이벤트
    menuContainer.on('scroll', function() {
      var containerWidth = $(this).outerWidth();

      menuItems.each(function() {
        var itemOffsetLeft = $(this).offset().left;
        var itemWidth = $(this).outerWidth();

        if (itemOffsetLeft < containerWidth / 2 && itemOffsetLeft + itemWidth > containerWidth / 2) {
          centerMenu(menuContainer, $(this));
        }
      });
    });
  });
});
