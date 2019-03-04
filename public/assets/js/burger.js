$(function() {
  $(".change-eaten").on("click", function(event) {
    let id = $(this).data("id");

    // Send the PUT request.
    $.ajax(`/api/burgers/${id}`, {
      type: `PUT`,
      data: {devoured: 1}
    }).then(() => location.reload());
  });

  $(".add-burger-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#new-burger-name").val().trim(),
      devoured: 0
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function() {
        console.log("created new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
