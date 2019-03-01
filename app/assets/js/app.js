requirejs.config({
    baseUrl: '/app/assets/js/',
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
var apiKey = 'AIzaSyAL02xqSBfqMdr1sHxSVXqMC8E5Vum3v2g';
var youtubeV3 = 'https://www.googleapis.com/youtube/v3/';


require([
    'jquery',
    'lodash',
    'bootstrap'
], function ($,_){
    require([
        'video/main',
        'search/main'
    ], function (videoMain, searchMain){

        videoMain.init();
        // searchMain.init();

        var $form = $('.form-inline');
        $form
        .on('click', function(event){
            event.preventDefault()
        });
    });

})
