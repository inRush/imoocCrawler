define(['jquery'], function ($) {
    'use strict';
    let navPage = $('#rightNav');

    function show(){
        navPage.addClass('showNav');
    }

    function hidden(){
        navPage.removeClass('showNav');
    }

    function turn(){
        if(!navPage.hasClass('showNav')){
            show();
        }else{
            hidden();
        }
    }

    return {
        turn:turn
    }

});