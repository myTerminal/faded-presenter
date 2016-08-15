var FadedPresenter = function (element, htmlText, options) {
    var nice = null,
        slideNumber = 0,
        title,

        init = function () {
            element.html(getSlideArray());

            title = $("h1").html();
            $("title").html(title);

            bindEvents();
            addLastSlide(title);
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

        getSlideArray = function () {
            var bracedString = "<div class='slide visible'>" +
                    htmlText.replace(/\<h2/g,
                                     "</div><div class='slide'><h2") +
                    "</div>";
            return bracedString;
        },

        showSlide = function () {
            $("div.slide").
                removeClass("visible").
                eq(slideNumber).
                addClass("visible");
        },

        bindEvents = function () {
            element.on("keydown", function (e) {
                if (e.keyCode === 39) {
                    nextSlide();
                } else if (e.keyCode === 37) {
                    previousSlide();
                }
            });
        },

        addLastSlide = function (title) {
            element.append("" +
                           "<div class='slide'>" +
                           "  <h1>" + title + "</h1>" +
                           "  Thanks for attending the session. Questions please..." +
                           "</div>");
        };

    options = options || {};
    init();

    return {
        init: init,
        nextSlide: nextSlide,
        previousSlide: previousSlide
    };
};
