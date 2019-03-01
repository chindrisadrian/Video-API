define([
    'text!/app/views/header.html',
    'text!/app/views/search/main.html',
    'text!/app/views/search/elementList.html',

], function (
    header, 
    main,
    elementListTemplate

    ){
    return {
        init: function() {
            var $app = $('#app');    
            $app.html(
                _.template(header)() +
                _.template(main)({})
            );
        }
    }
    
});