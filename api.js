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
      formatResponse(resp);
    }
  }
  xhr.send();
}

var formatResponse = function (resp) {
  var postList = []
  var jsonResponse = '{'
  if (resp.kind == "Listing") {
    jsonResponse += '['
    var i = 0
      // create post objects for each post
    for (object in resp.data.children) {
      var post = {
        subreddit: resp.data.children[i],
        author: resp.data.children[i],
        score: resp.data.children[i],
        nsfw: resp.data.children[i],
        permalink: resp.data.children[i],
        title: resp.data.children[i]
      }
      postList.push(post)
      i++;
    }
  } else {
    console.log("response kind was: " + resp.kind);
  }
  console.log(postList)

}