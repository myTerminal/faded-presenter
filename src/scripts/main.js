/* global require, FileReader */

var $ = require('jquery'),
    showdown = require('showdown'),
    converter = new showdown.Converter(),
    FadedPresenter = require('./faded-presenter.js'),
    PresenterView = require('./presenter-view.js'),
    presenter,
    presenterView;

$(document).ready(main);

function main () {
    var stage = document.getElementById('stage'),
        presenterViewStarter = document.getElementById('presenter-view-starter');

    stage.ondragover = onDragOver;
    stage.ondrop = onDrop;
    stage.ondragend = onDragEnd;
    stage.onclick = startPresentation;

    presenterViewStarter.onclick = startPresenterView;

    function onDragOver () {
        this.className = 'hover';
        return false;
    };

    function onDrop (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
            reader = new FileReader();

        reader.onload = function(event) {
            var lastPresentationDOM = converter.makeHtml(event.target.result);

            window.localStorage.lastPresentationDOM = lastPresentationDOM;

            presenter = new FadedPresenter($('body'),
                                           $('#presentation'),
                                           lastPresentationDOM);
        };

        reader.readAsText(file);
        return false;
    };

    function onDragEnd () {
        this.className = '';
        return false;
    };

    function startPresentation () {
        var lastPresentationDOM = window.localStorage.lastPresentationDOM;

        if (lastPresentationDOM) {
            presenter = new FadedPresenter($('body'),
                                           $('#presentation'),
                                           lastPresentationDOM);
        }
    }

    function startPresenterView () {
        var lastPresentationDOM = window.localStorage.lastPresentationDOM;

        if (lastPresentationDOM) {
            presenterView = new PresenterView($('body'),
                                              $('#presenter-view'),
                                              lastPresentationDOM);
        }
    }
}
