$(document).ready(() => {
    backgroundColorizer();

    // Add Item
    $("#add-item").on("click", (event) => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: parseInt($("#current-quantity").val().trim()),
            weeklyQuantity: parseInt($("#weekly-quantity").val().trim()),
            price: parseFloat($("#price").val().trim()).toFixed(2),
            imageURL: $("#image-URL").val().trim()
        };

        $.ajax({
            type: "POST",
            url: "/api/inventory",
            data: addItem
        }).then(() => {
            location.reload(true);
        });
    });

    // Delete Item
    $(".delete-item").on("click", function () {
        const itemId = $(this).parent().parent().attr("data-id");
        $("#delete-item-confirm").on("click", function () {
            $.ajax({
                method: "DELETE",
                url: `api/inventory/${itemId}`,
            }).then(() => {
                location.reload(true);
            });
        });
    });

    // Edit Item
    $(".edit-item").on("click", function () {
        const updateObject = {
            itemId: $(this).parent().attr("data-id"),
            productNameInput: $("#product-name-update"),
            currentQuantityInput: $("#current-quantity-update"),
            weeklyQuantityInput: $("#weekly-quantity-update"),
            priceInput: $("#price-update"),
            imageURLInput: $("#image-URL-update")
        };

        $.ajax({
            method: "GET",
            url: `/api/inventory/${updateObject.itemId}`
        }).then(inventory_item => {
            updateObject.productNameInput.val(inventory_item.productName);
            updateObject.currentQuantityInput.val(inventory_item.currentQuantity);
            updateObject.weeklyQuantityInput.val(inventory_item.weeklyQuantity);
            updateObject.priceInput.val(inventory_item.price);
            updateObject.imageURLInput.val(inventory_item.imageURL);

            $("#item-update").on("click", function (event) {
                event.preventDefault();

                const updateItem = {
                    productName: $("#product-name-update").val().trim(),
                    currentQuantity: parseInt($("#current-quantity-update").val().trim()),
                    weeklyQuantity: parseInt($("#weekly-quantity-update").val().trim()),
                    price: parseFloat($("#price-update").val().trim()).toFixed(2),
                    imageURL: $("#image-URL-update").val().trim()
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
});

const backgroundColorizer = () => {
    const tableRows = $("#inventory-table-body").children("tr");

    for (let i = 0; i < tableRows.length; i++) {
        const tableRow = tableRows[i];
        const currentQuantityCell = $(tableRow).children()[1];
        const weeklyQuantityCell = $(tableRow).children()[2];

        if ($(currentQuantityCell).text() === "0") {
            $(tableRow).addClass("inventory-qty-danger");
        };
    };
};