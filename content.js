// JQuery ready
$(function () {
  startUI();

  findWherePosted(document.URL, function(data) {
    console.log(data);
  });
});
