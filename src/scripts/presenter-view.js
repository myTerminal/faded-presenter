/* global module, require */

module.exports = function (body, element, htmlText) {
    var $ = require('jquery'),
        intercom = window.Intercom.getInstance(),
        slideNumber = 0,
        title,

        init = function () {
            switchToPresenterViewMode();
            element.html(getSlideArray());

            title = $("h1").html();
            $("title").html(title);

            bindEvents();
            addLastSlide(title);
            addFooter();
            setDefaults();
        },

        switchToPresenterViewMode = function () {
            body.addClass("presenter-view-mode");
        },

        switchToSetupMode = function () {
            body.removeClass("presenter-view-mode");
        },

        getSlideArray = function () {
            return "<div class='slide'>" +
                htmlText.replace(/\<h2/g,
                                 "</div><div class='slide'><h2") +
                "</div>";
        },

        highlightSlide = function (slideIndex) {
            $("div.slide").
                removeClass("active").
                eq(slideIndex).
                addClass("active");
        },

        bindEvents = function () {
            intercom.on('slide-changed', function (data) {
                highlightSlide(data.slideIndex);
            });
        },

        addLastSlide = function (title) {
            element.append("" +
                           "<div class='slide last-slide'>" +
                           "  <h1>" + title + "</h1>" +
                           "  Thanks for attending the session. Questions please..." +
                           "</div>");
        },

        addFooter = function () {
            // Nothing here yet
        },

        setDefaults = function () {
            // Nothing here yet
        };

    init();

    window.intercom = intercom;

    return {
        init: init,
        switchToPresenterViewMode: switchToPresenterViewMode,
        switchToSetupMode: switchToSetupMode
    };
};
