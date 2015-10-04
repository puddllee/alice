findWherePosted = function (url) {
  console.log('find where posted ' + url);
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://www.reddit.com/submit/.json?url=" + url, true);
  console.log("open")
  xhr.onreadystatechange = function () {
    console.log("state change")
    if (xhr.readyState == 4) {
      var resp = JSON.parse(xhr.responseText);
      console.log(resp);
      var jsonResponse = formatResponse(resp);
    }
  }
  xhr.send();
  return jsonResponse
}

var formatResponse = function (resp) {
  var postList = []
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
        title: resp.data.children[i].data.title
      }
      postList.push(post)
      i++;
    }
  } else {
    console.log("response kind was: " + resp.kind);
  }

  // Sort postList by score
  postList.sort(function (a, b) {
    return a.score - b.score;
  });
  var jsonResponse = JSON.stringify(postList)
  return jsonResponse
}