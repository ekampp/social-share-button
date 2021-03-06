
window.SocialShareButton = {
  openUrl: function(url) {
    window.open(url);
    return false;
  },
  share: function(el) {
    var get_tumblr_extra, img, site, title, tumblr_params, url;
    site = $(el).data('site');
    description = $(el).parent().data('desc');
    title = encodeURIComponent($(el).parent().data('title') || '');
    img = encodeURIComponent($(el).parent().data("img") || '');
    
    do{
      url = decodeURIComponent($(el).parent().data("url") || '');
    }while(url != decodeURIComponent($(el).parent().data("url") || ''));
    
    do{
      img = decodeURIComponent($(el).parent().data("img") || '');
    }while(img != decodeURIComponent($(el).parent().data("img") || ''));
    console.log($(el));
    
    if (url.length === 0) {
      do{
        url = decodeURIComponent($(el).parent().data("url") || location.href);
      }while(url != decodeURIComponent($(el).parent().data("url") || location.href));
    }
    switch (site) {
      case "weibo":
        SocialShareButton.openUrl("http://service.weibo.com/share/share.php?url=" + url + "&type=3&pic=" + img + "&title=" + title);
        break;
      case "twitter":
        SocialShareButton.openUrl("https://twitter.com/home?status=" + title + ": " + url);
        break;
      case "douban":
        SocialShareButton.openUrl("http://shuo.douban.com/!service/share?href=" + url + "&name=" + title + "&image=" + img);
        break;
      case "facebook":
        SocialShareButton.openUrl("http://www.facebook.com/sharer/sharer.php?s=100&p[url]=" + url + "&p[images][0]=" + img + "&p[title]=" + title + "&p[summary]=" + description);
        break;
      case "qq":
        SocialShareButton.openUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + url + "&title=" + title + "&pics=" + img);
        break;
      case "tqq":
        SocialShareButton.openUrl("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + url + "&title=" + title + "&pic=" + img);
        break;
      case "baidu":
        SocialShareButton.openUrl("http://hi.baidu.com/pub/show/share?url=" + url + "&title=" + title + "&content=");
        break;
      case "kaixin001":
        SocialShareButton.openUrl("http://www.kaixin001.com/rest/records.php?url=" + url + "&content=" + title + "&style=11&pic=" + img);
        break;
      case "renren":
        SocialShareButton.openUrl("http://widget.renren.com/dialog/share?resourceUrl=" + url + "&title=" + title + "&description=");
        break;
      case "google_plus":
        SocialShareButton.openUrl("https://plus.google.com/share?url=" + url + "&t=" + title);
        break;
      case "google_bookmark":
        SocialShareButton.openUrl("https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=" + url + "&title=" + title);
        break;
      case "delicious":
        SocialShareButton.openUrl("http://www.delicious.com/save?url=" + url + "&title=" + title + "&jump=yes&pic=" + img);
        break;
      case "linkedin":
        SocialShareButton.openUrl("http://www.linkedin.com/shareArticle?mini=true&url=" + url + "&title=" + title);
        break;
      case "tumblr":
        get_tumblr_extra = function(param) {
          var cutom_data;
          cutom_data = $(el).attr("data-" + param);
          if (cutom_data) {
            return encodeURIComponent(cutom_data);
          }
        };
        tumblr_params = function() {
          var params, path, quote, source;
          path = get_tumblr_extra('type') || 'link';
          params = (function() {
            switch (path) {
              case 'text':
                title = get_tumblr_extra('title') || title;
                return "title=" + title;
              case 'photo':
                title = get_tumblr_extra('caption') || title;
                source = get_tumblr_extra('source') || img;
                return "caption=" + title + "&source=" + source;
              case 'quote':
                quote = get_tumblr_extra('quote') || title;
                source = get_tumblr_extra('source') || '';
                return "quote=" + quote + "&source=" + source;
              default:
                title = get_tumblr_extra('title') || title;
                url = get_tumblr_extra('url') || url;
                return "name=" + title + "&url=" + url;
            }
          })();
          return "/" + path + "?" + params;
        };
        SocialShareButton.openUrl("http://www.tumblr.com/share" + (tumblr_params()));
    }
    return false;
  }
};

