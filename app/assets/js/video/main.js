define([
    'text!/app/views/header.html',
    'text!/app/views/video/main.html',
    'text!/app/views/video/videoScreen.html',
    'text!/app/views/video/videoDetails.html',
    'text!/app/views/video/videocomments.html'

], function (
    header, 
    main, 
    videoScreen, 
    videoDetails,
    videoComments 
    ){
    var $app = $('#app');    
    $app.html(
        _.template(header)() +
        _.template(main)({ videoScreen: videoScreen, videoDetails: videoDetails, videoComments: videoComments })
    );
});