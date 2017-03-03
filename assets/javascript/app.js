var animals = ['horse', 'cat', 'dog', 'chicken', 'duck', 'donkey', 'goat', 'cow', 'turkey', 'goose', 'rabbit'];

for (var i = 0; i < animals.length; i++) {
	console.log(animals[i]);
	
	animalBtn = $("<button>");
        
    animalBtn.addClass("animal");

    animalBtn.attr("data-animal", animals[i]);

    animalBtn.text(animals[i]);
      
    $(".buttons").append(animalBtn);


    }



$(".animal").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $(".gifs").prepend(gifDiv);
          }
        });
    });