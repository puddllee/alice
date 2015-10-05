findWherePosted = function (url, callback) {
  var jsonResponse = {};
  console.log('find where posted ' + url);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.reddit.com/submit/.json?url=" + url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      jsonResponse = formatSubredditResponse(resp);

      callback(jsonResponse);
    }
    return jsonResponse;
  }
  xhr.send();
}

var formatSubredditResponse = function (resp) {
  var postList = []
  if (!resp || !resp.kind) {
    return postList;
  }
  if (resp.kind == "Listing") {
    var i = 0

    // create post objects for each post
    for (object in resp.data.children) {
      var post = {
        subreddit: resp.data.children[i].data.subreddit,
        author: resp.data.children[i].data.author,
        score: resp.data.children[i].data.score,
        nsfw: resp.data.children[i].data.over_18,
        permalink: resp.data.children[i].data.permalink,
        title: resp.data.children[i].data.title,
        id: resp.data.children[i].data.id

      }
      postList.push(post)
      i++;
    }
  } else {
    console.log("response kind was: " + resp.kind);
  }

  // Sort postList by score
  postList.sort(function (a, b) {
    return b.score - a.score;
  });
  return postList;
}

getComments = function (permalink) {
  var commentResponse = ''
  console.log('getting comments for ' + permalink)
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.reddit.com" + permalink + '/.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      commentReponse = formatCommentResponse(resp[1].data.children); // First element is title
    }
  }
  xhr.send();
  console.log(commentResponse)
  return commentResponse
}

var formatCommentResponse = function (parentComment) {
  var commentSiblings = [];

  console.log("new level")
  if (parentComment == "") {
    console.log('no replies')
    return commentSiblings;
  }

  for (var i = 0; i < parentComment.length; i++) {
    var currentComment = parentComment[i].data;
    comment = {
      gilded: currentComment.gilded,
      replies: formatCommentResponse(currentComment.replies),
      author: currentComment.author,
      score: currentComment.score,
      body: currentComment.body,
      body_html: currentComment.body_html
    }
    commentSiblings.push(comment)
  }
  console.log(commentSiblings)
  return commentSiblings
}