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
            location.reload(true);
            // location.window.href = ("localhost:3000/inventory");
        });
    });

    $("#add-item").on("click", () => {
        $("#add-item-modal").modal("show");
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

    function deleteItem() {
        const itemId = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: `/api/inventory/${itemId}`,
        }).then(() => {
            location.reload(true);
        });
    }

});