require.config({
    paths: {
        jquery: './jquery-3.1.1.min',
        bootstrap: './bootstrap.min',
        nav: './Nav/nav',
        addButton: './Nav/addButton',
        navPage: './Nav/navPage'
    },
    shim: {
        'bootstrap': ['jquery']
    }
});


requirejs(['nav','bootstrap'], function (nav) {
    nav.start();
});