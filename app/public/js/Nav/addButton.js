define(['jquery'], function ($) {
    'use strict';
    let addButton = $('#addButton');
    let isRotate = false

    function onclick(callback) {
        addButton.on('click', callback);
    }

    function turnPosition() {
        let position = addButton.css('position');

        if (position == 'absolute') {

            addButton.css('position', 'fixed');
        } else {

            addButton.css('position', 'absolute');
        }
    }

    function Rotate(angle) {
        if (!isRotate) {
            addButton.css('transform', 'rotate(' + angle + 'deg)');
            isRotate = true;
        } else {
            addButton.css('transform', 'rotate(0)');
            isRotate = false;
        }
    }


    function getButton() {
        return addButton;
    }
    return {
        Rotate: Rotate,
        onclick: onclick,
        turnPosition:turnPosition
    }
});