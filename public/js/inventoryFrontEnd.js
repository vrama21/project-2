$(document).ready(() => {

    $("#item-submit").on("click", () => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: Number($("#current-quantity").val().trim()),
            weeklyQuantity: Number($("#weekly-quantity").val().trim())
        };

        $.ajax({
            type: "POST",
            url: "/inventory",
            data: addItem
        }).then(() => {
            location.reload(true);
        });
    });

    $(".delete-item").on("click", function () {
        const itemId = $(this).attr("data-id");

        $("#delete-item").on("click", function () {
            $.ajax({
                method: "DELETE",
                url: `/api/inventory/${itemId}`,
            }).then(() => {
                location.reload(true);
            });
        });
    });

    $(".edit-button").on("click", function() {
        $.ajax({
            method: "PUT",
            url: "/api/inventory",
        }).then(() => {
            location.reload(true);
        })
    });

    // TODO: Add active class to currently selected page in navigation
    // $(".nav-link").on("click", function(event) {
    //     // event.preventDefault();
    //     window.location.replace($(this).attr("href"));
    //     $(".navbar-nav").children("li").attr("class", "nav-item");
    //     $(this).parent("li").attr("class", "nav-item active")
    // });

});