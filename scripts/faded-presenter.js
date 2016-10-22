/* global $ */

var FadedPresenter = function (body, element, htmlText, options) {
    var nice = null,
        slideNumber = 0,
        title,
        autoTransitionTimer,

        init = function () {
            switchToPresentationMode();
            element.html(getSlideArray());

            title = $("h1").html();
            $("title").html(title);

            bindEvents();
            addLastSlide(title);
            addFooter();
            setDefaults();
        },

        setDefaults = function () {
            body.find("#transition-fade").click();
        },

        switchToPresentationMode = function () {
            body.addClass("presentation-mode");
        },

        switchToSetupMode = function () {
            body.removeClass("presentation-mode");
        },

        nextSlide = function () {
            if (slideNumber + 1 === $("div.slide").length) {
                return;
            }

            slideNumber++;
            showSlide();
        },

        previousSlide = function () {
            if (!slideNumber) {
                return;
            }

            slideNumber--;
            showSlide();
        },

        autoTransitToNextSlide = function () {
            nextSlide();
        },

        getSlideArray = function () {
            var bracedString = "<div class='slide visible'>" +
                    htmlText.replace(/\<h2/g,
                                     "</div><div class='slide'><h2") +
                    "</div>";
            return bracedString;
        },

        showSlide = function () {
            var progressPercentage =
                    Math.ceil(100 * (slideNumber + 1) / $("div.slide").length);

            $("div.slide").
                removeClass("visible").
                eq(slideNumber).
                addClass("visible");

            body.find("#presentation-progress-text").
                text(progressPercentage + "%");

            body.find("#presentation-progress-bar").
                width(progressPercentage + "%");
        },

        bindEvents = function () {
            body.on("keydown", function (e) {
                if (e.keyCode === 39) {
                    nextSlide();
                } else if (e.keyCode === 37) {
                    previousSlide();
                }
            });


            body.find("#auto-progress").click(function () {
                if (autoTransitionTimer) {
                    window.clearInterval(autoTransitionTimer);
                    autoTransitionTimer = null;
                    $(this).removeClass("active");
                } else {
                    autoTransitionTimer = window.setInterval(autoTransitToNextSlide, 5000);
                    $(this).addClass("active");
                }
            });

            body.find(".animation-control").click(function () {
                var transition = this.id;

                if (transition === "transition-fade") {
                    element.removeClass("zoom").addClass("fade");
                } else if (transition === "transition-zoom") {
                    element.removeClass("fade").addClass("zoom");
                }

                body.find(".animation-control").removeClass("active");
                $(this).addClass("active");
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
            element.append("" +
                           "<div class='footer'>" +
                           "  Printed from <a href='https://www.npmjs.com/package/faded-presenter'>faded-presenter</a>" +
                           "</div>");
        };

    options = options || {};
    init();

    return {
        init: init,
        switchToPresentationMode: switchToPresentationMode,
        switchToSetupMode: switchToSetupMode,
        nextSlide: nextSlide,
        previousSlide: previousSlide
    };
};
