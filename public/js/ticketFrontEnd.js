$(document).ready(() => {

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

            let itemQuantity = $("<td>").text(1);
            let productName = $("<td>").text(inventory_item.productName);
            let productPrice = $("<td>").text("10.00");

            let tableRow = $("<tr>");
            tableRow.append(reduceQuantity, itemQuantity, productName, productPrice, addQuantity, deleteButton);

            ticketTableBody.append(tableRow);
        });
    });
});

$(document).on("click", ".reduce-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    let quantity = $(quantityCell).text();
    if (quantity > 1) {
        quantity--;
        $(quantityCell).text(quantity);
    };
});

$(document).on("click", ".add-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    let quantity = $(quantityCell).text();
    quantity++;
    $(quantityCell).text(quantity);
});

$(document).on("change", "ticket-table", function() {
    const ticketTablePrice = $("#ticket-table-body").children().children()[4];
    console.log(ticketTablePrice);
});