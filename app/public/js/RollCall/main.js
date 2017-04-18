require.config({
    paths: {
        jquery: '../jquery-3.1.1.min',
        bootstrap: '../bootstrap.min',
        rollcall: './rollcall',
        nav: '../Nav/nav',
        addButton: '../Nav/addButton',
        navPage: '../Nav/navPage'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});



requirejs(['jquery', 'rollcall', 'nav'], function ($, rollcall, nav) {
    rollcall.start();
    nav.start();
});