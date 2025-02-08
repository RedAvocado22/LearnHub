/*
***
***
Name: 			functions.js
Written by: 	ThemeTrade 
Theme Version:	1.0.0
***
***
*/
(function ($) {
    "use strict";
    var ThemeBuilder = (function () {
        var windowSize = $(window).width();

        var setWindowSizeVar = function () {
            windowSize = $(window).width();
        };

        var checkSelectorExistence = function (selectorName) {
            if (jQuery(selectorName).length > 0) {
                return true;
            } else {
                return false;
            }
        };

        /* Control One Page Layout */
        var scrollPageLayout = function () {
            if (!checkSelectorExistence(".scroll-page")) {
                return;
            }
            $(".scroll-page").scroller();
        };

        /* Set Sticky Header */
        var setStickyheader = function () {
            jQuery(window).on("scroll", function () {
                if (!checkSelectorExistence(".sticky-header")) {
                    return;
                }
                var header = jQuery(".sticky-header");
                if ($(window).scrollTop() > header.offset().top) {
                    header.addClass("is-fixed"); /*change is-fixed to fixed*/
                } else {
                    header.removeClass("is-fixed");
                }
            });
        };

        /* Set Masonry Layout */
        var masonryLayout = function () {
            if (!checkSelectorExistence("#masonry")) {
                return;
            }
            var self = $("#masonry");
            if (jQuery(".action-card").length) {
                self.imagesLoaded(function () {
                    self.masonry({
                        gutterWidth: 15,
                        isAnimated: true,
                        itemSelector: ".action-card"
                    });
                });
            }

            if (!checkSelectorExistence(".filters")) {
                return;
            }
            jQuery(".filters").on("click", "li", function (e) {
                e.preventDefault();
                var filter = $(this).attr("data-filter");
                self.masonryFilter({
                    filter: function () {
                        if (!filter) return true;
                        return $(this).hasClass(filter);
                    }
                });
            });
        };

        /* Stylish Scroll */
        var setStylishScroll = function () {
            if (!checkSelectorExistence(".content-scroll")) {
                return;
            }
            $(".content-scroll").mCustomScrollbar({
                setWidth: false,
                setHeight: false,
                axis: "y"
            });
        };

        /* Left Side Menu */
        var manageLeftSideMenu = function () {
            jQuery(".menuicon")
                .unbind()
                .on("click", function () {
                    $(this).toggleClass("open");
                });

            if (windowSize <= 991) {
                jQuery(".navbar-nav > li > a, .sub-menu > li > a")
                    .unbind()
                    .on("click", function (e) {
                        //e.preventDefault();
                        if (jQuery(this).parent().hasClass("open")) {
                            jQuery(this).parent().removeClass("open");
                        } else {
                            jQuery(this).parent().parent().find("li").removeClass("open");
                            jQuery(this).parent().addClass("open");
                        }
                    });
            }
        };

        /* Function ============ */
        return {
            initialHelper: function () {
                scrollPageLayout();
                setStickyheader();
                setStylishScroll();
                manageLeftSideMenu();
            },

            afterLoadThePage: function () {
                masonryLayout();
            },

            changeTheScreen: function () {
                setWindowSizeVar();
                manageLeftSideMenu();
            }
        };
    })(jQuery);

    /* jQuery ready  */
    jQuery(document).on("ready", function () {
        ThemeBuilder.initialHelper();
    });
    /* jQuery Window Load */
    jQuery(window).on("load", function (e) {
        ThemeBuilder.afterLoadThePage();
    });
    /* Screen Resize */
    jQuery(window).on("resize", function () {
        ThemeBuilder.changeTheScreen();
    });
})(jQuery);
