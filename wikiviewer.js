function expandSearch() {
  $('#search-icon').addClass("hide");
  $('#input-container').removeClass("hide");
  $('#search-input').focus();
}

function contractSearch() {
  $('#search-input').val('');
  $('#search-icon').removeClass("hide");
  $('#input-container').addClass("hide");
  $('#search-results').html("");
  $('#help').removeClass("hide");
}

function displaySearchResults(e) {
  e.preventDefault();
  $('#help').addClass("hide");
  var title = $('#search-input').val();
  var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
  this.results = [];
  var page = 'https://en.wikipedia.org/?curid=';
  $.ajax({
    url: "https://crossorigin.me/" + api + title,
    success: function(response) {
      _.forEach(response.query.pages, function(val, key) {
        this.results.push({title: val.title, body: val.extract, page: page + val.pageid})
      }.bind(this));

      _.forEach(this.results, function(obj) {
        $('#search-results').append("<div class='text-left result'><a href=" + obj.page + "><p>" + obj.title + "</p><p>" + obj.body + "</p></a></div>")
      });
    }.bind(this),
  });
}
