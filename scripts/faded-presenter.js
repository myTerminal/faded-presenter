var FadedPresenter = function (element, htmlText, options) {
    var nice = null,

        init = function () {
            element.html(htmlText);
        },

        nextPage = function () {
            // TODO: Implement
        },

        previousPage = function () {
            // TODO: Implement
        };

    options = options || {};
    init();

    return {
        init: init,
        nextPage: nextPage,
        previousPage: previousPage
    };
};
