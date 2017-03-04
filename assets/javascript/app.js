$(document).ready(function() {
// Array for the giphy buttons
var animals = ['horse', 'cat', 'dog', 'chicken', 'duck', 'donkey', 'goat', 'cow', 'turkey', 'goose', 'rabbit'];

// Create the initial buttons
for (var i = 0; i < animals.length; i++) {
	console.log(animals[i]);
	animalBtn = $("<button>");
    animalBtn.addClass("animal");
    animalBtn.attr("data-animal", animals[i]);
    animalBtn.text(animals[i]);
      
    $(".buttons").append(animalBtn);
}

// Click function to add an animal button
$('.submit').on('click', function() {
    var val = $("input[type='text']").val();
    $("input[type='text']").val('');
    animals.push(val);

    $(".buttons").empty();

    for (var i = 0; i < animals.length; i++) {
        console.log(animals[i]);
        animalBtn = $("<button>");
        animalBtn.addClass("animal");
        animalBtn.attr("data-animal", animals[i]);
        animalBtn.text(animals[i]);
          
        $(".buttons").append(animalBtn);
    }
    
})

// AJAX call to GiphyAPI and addings images to DOM
$(".animal").on("click", function() {

	$('.gifs').empty();

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
            animalImage.attr("src", results[i].images.original_still.url);
            animalImage.attr('data-still', results[i].images.original_still.url);
            animalImage.attr('data-animate', results[i].images.fixed_height.url);
            animalImage.attr('data-state', 'still');
            animalImage.attr('class', 'gif');

            gifDiv.prepend(p);
            gifDiv.prepend(animalImage);

            $(".gifs").prepend(gifDiv);
          }
        });
    });

// Click event to start and pause the gif
$(".gif").on("click", function() {

    var state = $(this).attr('data-state');
    console.log(state);
    if (state === 'still') {
        var dataAnimate = $(this).attr('data-animate');
        $(this).attr('src', dataAnimate);
        $(this).attr('data-state', 'animate');
      } else {
        var dataStill = $(this).attr('data-still');
        $(this).attr('src', dataStill);
        $(this).attr('data-state', 'still');
      }

});

});