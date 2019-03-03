define([
    'text!/app/views/header.html',
    'text!/app/views/search/main.html',
    'text!/app/views/search/elementList.html',
    'video/main',
    'moment'

], function 
(
    header, 
    main,
    elementListTemplate,
    videoMain,
    moment
){



    function renderList(search_query) {
        $.get(youtubeV3 + 'search?part=snippet&maxResults=10&q=' + search_query + '&key='+apiKey, null, null, 'json').always(function(response) {
            $('main').html(
                _.template(main)({ moment: moment, elementListTemplate: elementListTemplate, items: response.items})
            )
            $('li.media').on('click', function(event){ 
                var $item = $(event.currentTarget);
                var $id = $item.data('id');
                // videoMain.init($item.data('id'));
                window.history.pushState(null, null, '/?id='+ $id);
                window.history.go(0);                
            });
        })
        
    }

    


    return {
        init: function() {
            var $app = $('#app');    
            $app.html(
                _.template(header)() +
                _.template(main)({ elementListTemplate: elementListTemplate })
            );
            
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
            
            var search_query = qs.search_query || '';
            renderList(search_query);
            

        }
            
    }
    
});