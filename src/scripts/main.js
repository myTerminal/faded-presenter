/* global require, FileReader */

var presenter,
    $ = require('jquery'),
    showdown = require('showdown'),
    converter = new showdown.Converter(),
    FadedPresenter = require('./faded-presenter.js');

$(document).ready(main);

function main () {
    var stage = document.getElementById("stage");

    stage.ondragover = onDragOver;
    stage.ondrop = onDrop;
    stage.ondragend = onDragEnd;
    stage.onclick = onClick;

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
            window.localStorage.lastPresentation = event.target.result;

            presenter = new FadedPresenter($("body"),
                                           $("#presentation"),
                                           converter.makeHtml(event.target.result));
        };

        reader.readAsText(file);
        return false;
    };

    function onDragEnd () {
        this.className = '';
        return false;
    };

    function onClick () {
        var lastPresentation = window.localStorage.lastPresentation;

        if (lastPresentation) {
            presenter = new FadedPresenter($("body"),
                                           $("#presentation"),
                                           converter.makeHtml(lastPresentation));
        }
    }
}
