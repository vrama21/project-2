$(document).ready(() => {
    $("#item-submit").on("click", () => {
        const addItem = {
            productName: $("#product-name").val().trim(),
            currentQuantity: parseInt($("#current-quantity").val().trim()),
            weeklyQuantity: parseInt($("#weekly-quantity").val().trim())
        };

        console.log(addItem);
        
        $.ajax({
            type: "POST",
            url: "/inventory/additem",
            data: addItem
        }).then(() => {
            console.log("Post Success!")
            location.window.href = ("/inventory");
        });
    });
});