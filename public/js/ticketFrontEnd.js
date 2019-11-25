$(document).ready(() => {

    // Blank img if no url is provided
    const ticketButtons = $("#ticket-buttons").children();
    for (let i = 0; i < ticketButtons.length; i++) {
        const imgTag = $(ticketButtons[i]).children()[0];
        if ($(imgTag).attr("src") === "") {
            $(imgTag).removeAttr("src");
            $(imgTag).css("opacity", 0);
        }
    };

    // Append item to ticket table
    $(".ticket-item").on("click", function () {
        const ticketTableBody = $("#ticket-table-body");

        const item = {
            itemId: $(this).attr("data-id"),
        };

        $.ajax({
            method: "GET",
            url: `api/inventory/${item.itemId}`
        }).then(inventory_item => {
            const reduceQuantity = $("<td>").append($("<button>").attr({
                "class": "reduce-button btn material-icons",
            }).text("remove"));

            const addQuantity = $("<td>").append($("<button>").attr({
                "class": "add-button btn material-icons",    
            }).text("add"));

            const deleteButton = $("<td>").append($("<button>").attr({
                "class": "delete-item btn btn-danger",
                "data-id": item.itemId,
                "data-toggle": "modal",
                "data-target": "#delete-item-modal",
            }).text("X"));

            let itemQuantity = $("<td>").addClass("ticket-cell").text(1);
            let productName = $("<td>").addClass("ticket-cell").text(inventory_item.productName);
            let productPrice = $("<td>").addClass("ticket-cell").text("10.00");

            let tableRow = $("<tr>").addClass("ticket-row");
            tableRow.append(reduceQuantity, itemQuantity, productName, productPrice, addQuantity, deleteButton);

            ticketTableBody.append(tableRow);
        });
    });
});

// Decrease Quantity
$(document).on("click", ".reduce-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    let quantity = $(quantityCell).text();
    if (quantity > 1) {
        quantity--;
        $(quantityCell).text(quantity);
    };
});

// Increase Quantity
$(document).on("click", ".add-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    let quantity = $(quantityCell).text();
    quantity++;
    $(quantityCell).text(quantity);
});

// Delete Item
$(document).on("click", ".delete-item", function () {
    const deleteTableRow = $(this).parent().parent();
    $("#delete-item-confirm").on("click", function(){
        deleteTableRow.remove();
    });
});