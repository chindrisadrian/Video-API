requirejs.config({
    baseUrl: 'app/assets/js/',
    paths: {
        'text':         'vendor/require.text',
        'jquery':       'vendor/jquery.min',
        'lodash':       'vendor/lodash.min',
        'bootstrap':    'vendor/bootstrap.bundle.min'
    },
    shim: {
        'lodash': { exports: '_' },
        'bootstrap': ['jquery']
    }
});
var $app = null
require([
    'jquery',
    'lodash',
    'bootstrap'
], function ($,_){
    require([
        'video/main',
        'search/main'
    ], function (){
    });

})
