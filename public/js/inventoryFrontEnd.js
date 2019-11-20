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

    // $("#delete-item").on("click", () => {
    //     $("#delete-item-modal").addClass("active");
    // })
});

