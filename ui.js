var WRAPPER_BOX = 'wrapper-box';
var LOADING_BOX = 'loading-box';
var COMMENT_BOX = 'comment-box';

// currently fetching places where this url has been posted to reddit
// default to true because that is the inital state
var loading = true;

startUI = function () {
  console.log('starting ui');

  makeLoadingBox();
}

loadPlacesLinked = function (places) {
  $('#' + LOADING_BOX).remove();
  makeCommentDiv(places);
}

var makeLoadingBox = function () {
  if (loading) {
    $.get(chrome.extension.getURL('public/loading-box.html'), function (data) {
      var lBox = Boundary.createBox(LOADING_BOX).html(data);
      Boundary.loadBoxCSS('#' + LOADING_BOX, chrome.extension.getURL('public/pure.min.css'));
      Boundary.loadBoxCSS('#' + LOADING_BOX, chrome.extension.getURL('public/loading.css'));
    });
  }
}

var toggleLoading = function () {
  loading = !loading;
  if (loading) {
    attachLoadingBox();
  } else {
    $('#loading').remove();
  }
}

var makeCommentDiv = function (places) {
  $.get(chrome.extension.getURL('public/comment-box.html'), function (data) {
    var template = Handlebars.compile(data);
    var params = {
      places: places
    };
    console.log(places);
    var html = template(params);
    var box = Boundary.createBox('comment-box').html(html);
    Boundary.loadBoxCSS('#comment-box', chrome.extension.getURL('public/pure.min.css'));
    Boundary.loadBoxCSS('#comment-box', chrome.extension.getURL('public/comments.css'));
  });
}
