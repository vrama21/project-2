$(document).ready(() => {
    $("#item-submit").on("click", () => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: Number($("#current-quantity").val().trim()),
            weeklyQuantity: Number($("#weekly-quantity").val().trim())
        };

        $.ajax({
            type: "POST",
            url: "/inventory/additem",
            data: addItem
        }).then(() => {
            console.log("Post Success!")
            location.window.href = ("/inventory");
        });
    });

    $("#add-item").on("click", () => {
        $("#add-item-modal").addClass("active");
    });

    $(".delete-item").on("click", function() {
        const itemId = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: `/api/inventory/${itemId}`,
        }).then(() => {
            window.location.href = "/inventory";
        });
    });



    function updatePost(post) {
        $.ajax({
                method: "PUT",
                url: "/api/inventory",
                data: post
            })
            .then(() => {
                window.location.href = "/blog";
            });
    };

});