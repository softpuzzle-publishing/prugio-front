var html = document.querySelector("html");
var body = document.querySelector("body");

var Init = {
  init: function () {
    this.scrolling();
    window.addEventListener("mousewheel", this.scrolling);
    window.addEventListener("touchmove", this.scrolling);
  },
  scrolling: function (e) {
    var doc = document.documentElement;
    var w = window;
    var prevScroll = w.scrollY || doc.scrollTop;
    var curScroll;
    var direction = 0;
    var prevDirection = 0;

    var checkScroll = function () {
      /*
       ** Find the direction of scroll
       ** 0 - initial, 1 - up, 2 - down
       */
      curScroll = w.scrollY || doc.scrollTop;
      if (curScroll > prevScroll) {
        //scrolled up
        direction = 2;
      } else if (curScroll < prevScroll) {
        //scrolled down
        direction = 1;
      }

      if (direction !== prevDirection) {
        scrollDirection(direction, curScroll);
      }

      prevScroll = curScroll;

      if (curScroll > 15) {
        html.classList.add("title-animated");
      } else {
        html.classList.remove("title-animated");
      }
    };

    var scrollDirection = function (direction, curScroll) {
      if (direction === 2) {
        html.classList.remove("scroll-up");
        html.classList.add("scroll-down");
        prevDirection = direction;
      } else if (direction === 1) {
        html.classList.remove("scroll-down");
        html.classList.add("scroll-up");
        prevDirection = direction;
      }
    };

    window.addEventListener("scroll", checkScroll);
  },
};

var Common = {
  init: function () {
    this.tabExpand();
    this.accordion();
  },
  tabExpand: function () {
    $(".btn-expand").on("click", function () {
      $(".new-pre-tabs").toggleClass("expanded");
    });
  },
  accordion: function () {
    $(".new-pre-zone").on("click", function () {
      var item = $(this);
      item.parent().toggleClass("active");
      if (item.parent().hasClass("active")) {
        setTimeout(function () {
          var offsetTop = item.offset().top - 167;
          var my = $("html, body");
          my.stop().animate({ scrollTop: offsetTop }, 350, "swing", function () {});
        }, 500);
      }
    });
    $(".new-pre-zone-details .inner").each(function () {
      var height = $(this).outerHeight();
      $(this).parent().css("height", height);
    });
  },
};

Init.init();
Common.init();
