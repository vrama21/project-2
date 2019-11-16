$(document).ready(() => {
    $("#item-submit").on("click", () => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: $("#current-quantity").val().trim(),
            weeklyQuantity: $("#weekly-quantity").val().trim()
        };

        console.log(addItem)

        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "inventory/addItem",
            data: addItem
        }).then(() => {
            console.log("Post Success!")
        });
    });
});