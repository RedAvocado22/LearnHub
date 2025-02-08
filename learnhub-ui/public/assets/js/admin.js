/*
***
***
Name: 			admin.js
Written by: 	ThemeTrade 
Theme Version:	1.0.0
***
***
*/
(function ($) {
    "use strict";

    var AdminBuilder = (function () {
        var closeNav = function () {
            $(".ttr-overlay, .ttr-sidebar-toggle-button").on("click", function () {
                $("body").removeClass("ttr-opened-sidebar"), $("body").removeClass("ttr-body-fixed");
            });
        };

        var leftSidebar = function () {
            $(".ttr-toggle-sidebar").on("click", function () {
                if ($("body").hasClass("ttr-opened-sidebar")) {
                    $("body").removeClass("ttr-opened-sidebar"), $("body").removeClass("ttr-body-fixed");
                } else {
                    $(window).width() < 760 && $("body").addClass("ttr-body-fixed"),
                        $("body").addClass("ttr-opened-sidebar");
                }
            });

            $(".ttr-sidebar-pin-button").on("click", function () {
                $("body").toggleClass("ttr-pinned-sidebar");
            });

            $(".ttr-sidebar-navi li.show > ul").slideDown(200);
            $(".ttr-sidebar-navi a").on("click", function (e) {
                var a = $(this);
                $(this).next().is("ul")
                    ? (e.preventDefault(),
                      a.parent().hasClass("show")
                          ? (a.parent().removeClass("show"), a.next().slideUp(200))
                          : (a.parent().parent().find(".show ul").slideUp(200),
                            a.parent().parent().find("li").removeClass("show"),
                            a.parent().toggleClass("show"),
                            a.next().slideToggle(200)))
                    : (a.parent().parent().find(".show ul").slideUp(200),
                      a.parent().parent().find("li").removeClass("show"),
                      a.parent().addClass("show"));
            });
        };

        var waveEffect = function (e, a) {
            var s = ".ttr-wave-effect",
                n = e.outerWidth(),
                t = a.offsetX,
                i = a.offsetY;
            e.prepend('<span class="ttr-wave-effect"></span>'),
                $(s)
                    .css({
                        top: i,
                        left: t
                    })
                    .animate(
                        {
                            opacity: "0",
                            width: 2 * n,
                            height: 2 * n
                        },
                        500,
                        function () {
                            e.find(s).remove();
                        }
                    );
        };

        var materialButton = function () {
            $(".ttr-material-button").on("click", function (e) {
                waveEffect($(this), e);
            });
        };

        var headerSubMenu = function () {
            $(".ttr-header-submenu").show();
            $(".ttr-header-submenu")
                .parent()
                .find("a:first")
                .on("click", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this)
                        .parents(".ttr-header-navigation")
                        .find(".ttr-header-submenu")
                        .not($(this).parents("li").find(".ttr-header-submenu"))
                        .removeClass("active");
                    $(this).parents("li").find(".ttr-header-submenu").show().toggleClass("active");
                });
            $(document).on("click", function (e) {
                var a = $(e.target);
                !0 === $(".ttr-header-submenu").hasClass("active") &&
                    !a.hasClass("ttr-submenu-toggle") &&
                    a.parents(".ttr-header-submenu").length < 1 &&
                    $(".ttr-header-submenu").removeClass("active"),
                    a.parents(".ttr-search-bar").length < 1 &&
                        !a.hasClass("ttr-search-bar") &&
                        !a.parent().hasClass("ttr-search-toggle") &&
                        !a.hasClass("ttr-search-toggle") &&
                        $(".ttr-search-bar").removeClass("active");
            });
        };

        return {
            initialHelper: function () {
                closeNav();
                leftSidebar();
                materialButton();
                headerSubMenu();
            }
        };
    })(jQuery);

    /* jQuery ready  */
    jQuery(document).on("ready", function () {
        AdminBuilder.initialHelper();
    });
})(jQuery);

