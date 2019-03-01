define([
    'text!/app/views/header.html',
    'text!/app/views/video/main.html',
    'text!/app/views/video/videoScreen.html',
    'text!/app/views/video/videoDetails.html',
    'text!/app/views/video/videocomments.html'

], function 
(
    header, 
    main, 
    videoScreen, 
    videoDetails,
    videoComments 
){

    function renderVideo (videoId) {
        var url = youtubeV3 + 'videos?part=snippet,statistics&id=' + videoId + '&key=' + apiKey;;
        $.get(url, null, null, 'json').always(function(response) {
            console.log(response)
            var video = response.items[0];
            console.log(video)
            var videoEmbed = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1';
            var videoTitle = video.snippet.localized.title;
            var videoViews = video.statistics.viewCount;
            var videoRelease = video.snippet.publishedAt;
            var videoLike = video.statistics.likeCount;
            var videoDislike = video.statistics.dislikeCount;
            $('.video-screen').html(
                _.template(videoScreen)({ videoEmbed: videoEmbed, videoTitle: videoTitle, videoViews: videoViews, videoRelease: videoRelease, videoLike: videoLike, videoDislike: videoDislike })
            );
            var thumbnails = video.snippet.thumbnails.maxres.url || video.snippet.thumbnails.standard.url || video.snippet.thumbnails.high.url;
            var channelTitle = video.snippet.channelTitle;
            // var videoDescriptions = JSON.stringify(video.snippet.description);
            var videoDescriptions = video.snippet.description;
            // videoDescriptions = JSON.stringify(videoDescriptions);
            console.log(videoDescriptions);
            $('.video-details').html(
                _.template(videoDetails)({ thumbnails: thumbnails, channelTitle: channelTitle, videoDescriptions: videoDescriptions, videoId: videoId })
            )
        })
        $.get('https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId='+ videoId +'&key='+apiKey, null, null, 'json').always(function(response) {
            $('.video-comments').html(
                _.template(videoComments)({ items: response.items })
            )
            console.log(response.items)
        })
    }





    return {
        init: function(){
            var $app = $('#app');    
            $app.html(
                _.template(header)() +
                _.template(main)({ videoScreen: videoScreen, videoDetails: videoDetails, videoComments: videoComments })
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
            
            var videoId = qs.id;
        renderVideo(videoId);
        }
    }
});