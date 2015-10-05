startUI = function () {
  console.log('starting ui');

  makeCommentDiv();

  chrome.extension.getURL('public/materialize.min.js');
}

var makeCommentDiv = function () {
  $.get(chrome.extension.getURL('public/comment-box.html'), function (data) {
    // $($.parseHTML(data)).appendTo('body');
    var box = Boundary.createBox('comment-box').html(data);
    Boundary.loadBoxCSS('#comment-box', chrome.extension.getURL('public/pure.min.css'));
    Boundary.loadBoxCSS('#comment-box', chrome.extension.getURL('public/comment-box.css'));
  });
}
