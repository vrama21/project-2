$(document).ready(() => {

    $("#item-submit").on("click", () => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: parseInt($("#current-quantity").val().trim()),
            weeklyQuantity: parseInt($("#weekly-quantity").val().trim()),
            imageURL: $("#image-URL").val().trim()
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
        $("#delete-item-confirm").on("click", function () {
            $.ajax({
                method: "DELETE",
                url: `/api/inventory/${itemId}`,
            }).then(() => {
                location.reload(true);
            });
        });
    });

    $(".edit-button").on("click", function () {
        const updateObject = {
            itemId: $(this).attr("data-id"),
            productNameInput: $("#product-name-update"),
            currentQuantityInput: $("#current-quantity-update"),
            weeklyQuantityInput: $("#weekly-quantity-update"),
            imageURLInput: $("#image-URL")
        };

        $.ajax({
            method: "GET",
            url: `api/inventory/${updateObject.itemId}`
        }).then(inventory_item => {
            updateObject.productNameInput.val(inventory_item.productName);
            updateObject.currentQuantityInput.val(inventory_item.currentQuantity);
            updateObject.weeklyQuantityInput.val(inventory_item.weeklyQuantity);
            updateObject.imageURLInput.val(inventory_item.imageURL);

            $("#item-update").on("click", function (event) {
                event.preventDefault();

                const updateItem = {
                    productName: $("#product-name-update").val().trim(),
                    currentQuantity: parseInt($("#current-quantity-update").val().trim()),
                    weeklyQuantity: parseInt($("#weekly-quantity-update").val().trim()),
                    imageURL: $("#image-URL").val().trim()
                };

                $.ajax({
                    method: "PUT",
                    url: `/api/inventory/${updateObject.itemId}`,
                    data: updateItem
                }).then(() => {
                    location.reload(true);
                });
            });
        });

    });

    // TODO: Add active class to currently selected page in navigation
    // $(".nav-link").on("click", function(event) {
    //     // event.preventDefault();
    //     window.location.replace($(this).attr("href"));
    //     $(".navbar-nav").children("li").attr("class", "nav-item");
    //     $(this).parent("li").attr("class", "nav-item active")
    // });

});