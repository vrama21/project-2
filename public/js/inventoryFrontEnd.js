$(document).ready(() => {
    $("#add-item").on("click", (event) => {
        addItem();
    });

    $("#delete-item").on("click", (event) => {
        deleteItem();
    });

    $("#edit-item").on("click", (event) => {
        editItem();
    });
});

const addItem = () => {
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
};

const deleteItem = () => {
    const itemId = $(this).parent().parent().attr("data-id");
    $("#delete-item-confirm").on("click", function () {
        $.ajax({
            method: "DELETE",
            url: `api/inventory/${itemId}`,
        }).then(() => {
            location.reload(true);
        });
    });
};

const editItem = () => {
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
};