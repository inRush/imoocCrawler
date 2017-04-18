

define(['jquery', 'addButton', 'navPage'], function ($, addButton, navPage) {

    var start = function () {

        addButton.onclick(function () {
            addButton.Rotate(225);
            addButton.turnPosition();
            navPage.turn();
        });
    }

    return {
        start:start
    }
});