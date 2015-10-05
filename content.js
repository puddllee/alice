// JQuery ready
$(function () {
  startUI();

  findWherePosted(document.URL, function (data) {
    loadPlacesLinked(data);
  });
});
