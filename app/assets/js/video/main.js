define([
    'text!/app/views/header.html',
    'text!/app/views/video/main.html',
    'text!/app/views/video/videoScreen.html',
    'text!/app/views/video/videoDetails.html',
    'text!/app/views/video/videocomments.html',
    'moment'

], function 
(
    header, 
    main, 
    videoScreen, 
    videoDetails,
    videoComments,
    moment
){

    function renderVideo (videoId) {
        var url = youtubeV3 + 'videos?part=snippet,statistics&id=' + videoId + '&key=' + apiKey;;
        $.get(url, null, null, 'json').always(function(response) {
            var video = response.items[0];
            var videoEmbed = 'https://www.youtube.com/embed/' + videoId + '?rel=0&showinfo=0&autoplay=1';
            var videoTitle = video.snippet.localized.title;
            var videoViews = toNumber(video.statistics.viewCount);
            var videoRelease = moment(video.snippet.publishedAt).format('LLL');
            var videoLike = toNumber(video.statistics.likeCount);
            var videoDislike = toNumber(video.statistics.dislikeCount);
            $('.video-screen').html(
                _.template(videoScreen)({ videoEmbed: videoEmbed, videoTitle: videoTitle, videoViews: videoViews, videoRelease: videoRelease, videoLike: videoLike, videoDislike: videoDislike })
            );
            var channelTitle = video.snippet.channelTitle;
            var videoDescriptions = video.snippet.description.replace(/(\r\n|\n|\r)/gm, "<br>");
            $('.video-details').html(
                _.template(videoDetails)({channelTitle: channelTitle, videoDescriptions: videoDescriptions, videoId: videoId })
            )
        })
        renderComments(videoId)
    }

    function renderComments(videoId) {
        $.get(youtubeV3 + 'commentThreads?part=snippet%2Creplies&order=relevance&videoId='+ videoId +'&key='+apiKey, null, null, 'json').always(function(response) {
            $('.video-comments').html(
                _.template(videoComments)({ items: response.items, moment: moment })
            )
        })
    }

    function toNumber(nr) {
        return parseInt(nr).toLocaleString();
    }

    return {
        init: function(videoId){
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
            
            videoId =  qs.id;
            renderVideo(videoId);
        }
    }
});