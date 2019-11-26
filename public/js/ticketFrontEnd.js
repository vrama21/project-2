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
            let productPrice = $("<td>").addClass("ticket-cell").text(`$${inventory_item.price}`);
            let netPrice = $("<td>").addClass("ticket-cell").text(`$${inventory_item.price}`);

            let tableRow = $("<tr>").addClass("ticket-row");
            tableRow.append(reduceQuantity, itemQuantity, productName, productPrice, netPrice, addQuantity, deleteButton);

            ticketTableBody.append(tableRow);
        });
    });
});

// Decrease Quantity
$(document).on("click", ".reduce-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    const priceCell = $(this).parent().parent().children()[3];
    const netPriceCell = $(this).parent().parent().children()[4];
    
    let quantity = $(quantityCell).text();
    let price = $(priceCell).text().substring(1);

    if (quantity > 1) {
        quantity--;
        netPrice = price * quantity;

        $(quantityCell).text(quantity);
        $(netPriceCell).text(`$${netPrice}`);
    };
});

// Increase Quantity
$(document).on("click", ".add-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    const priceCell = $(this).parent().parent().children()[3];
    const netPriceCell = $(this).parent().parent().children()[4];

    let quantity = $(quantityCell).text();
    let price = $(priceCell).text().substring(1);
    
    quantity++;
    netPrice = price * quantity;

    $(quantityCell).text(quantity);
    $(netPriceCell).text(`$${netPrice}`);
});

// Delete Item
$(document).on("click", ".delete-item", function () {
    const deleteTableRow = $(this).parent().parent();
    $("#delete-item-confirm").on("click", function(){
        deleteTableRow.remove();
    });
});