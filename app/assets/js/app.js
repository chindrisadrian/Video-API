requirejs.config({
    baseUrl: '/app/assets/js/',
    paths: {
        'text':         'vendor/require.text',
        'jquery':       'vendor/jquery.min',
        'lodash':       'vendor/lodash.min',
        'bootstrap':    'vendor/bootstrap.bundle.min',
        'moment':       'vendor/moment.min'
    },
    shim: {
        'lodash': { exports: '_' },
        'bootstrap': ['jquery']
    }
});
var apiKey = 'AIzaSyBc3ep8CSa_FPWfHu70Vkzp2yZpLhq81ys';
var youtubeV3 = 'https://www.googleapis.com/youtube/v3/';




require([
    'jquery',
    'lodash',
    'moment',
    'bootstrap',
], function ($,_){
    require([
        'video/main',
        'search/main'
    ], function (videoMain, searchMain){

        var qs = (function(a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i)
            {
                var p=a[i].split('=', 2);
                if (p.length == 1)
                    b[p[0]] = "";
                else
                    b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));

        if(qs.id){
            videoMain.init();
        }
        if(qs.search_query || _.isEmpty(qs)){
            searchMain.init();
        }

        // var routes = {
        //     '/':  function() {searchMain.init()},
        //     '/search': function() {searchMain.init()},
        //     '/watch': function() {videoMain.init()}
        // };
        // routes[window.location.pathname]()

        var $form = $('.form-inline');
        $form
        .on('submit', function(event){
            event.preventDefault()
            $input = $($form).find('input');
            window.history.pushState(null, null, '/?search_query='+ $input.val())
            window.history.go(0);

        });
    });
})
