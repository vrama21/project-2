$(document).ready(() => {
    blankImg();

    var tableIds = []
    $(".ticket-item").on("click", function () {
        const ticketTableBody = $("#ticket-table-body");
        const ticketRows = ticketTableBody.children("tr");
        const itemId = $(this).attr("data-id");


        if (tableIds.includes(itemId)) {
            for (let i = 0; i < ticketRows.length; i++) {
                const row = ticketRows[i];

                if (itemId === $(row).attr("data-id")) {
                    const quantityCell = $(row).children()[1];
                    const priceCell = $(row).children()[3];
                    const netPriceCell = $(row).children()[4];
                    increaseQuantity(quantityCell, priceCell, netPriceCell);
                };
            };
        } else {
            tableIds.push(itemId);
            appendItem(ticketTableBody, itemId)
        };
    });

    $("#order-submit").on("click", function () {
        submitOrder();
    });

    $("#clear-ticket-confirm").on("click", function () {
        const ticketRows = $("#ticket-table-body").children("tr");
        for (let i = 0; i < ticketRows.length; i++) {
            const ticketRow = ticketRows[i];
            ticketRow.remove();
            window.location.reload("true");
        };
    });

    $("#order-submit-confirm").on("click", function () {
        window.location.replace("/")
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
        netPrice = parseFloat(price * quantity).toFixed(2);

        $(quantityCell).text(quantity);
        $(netPriceCell).text(`$${netPrice}`);
    };

    updateTotal();
});

// Increase Quantity
$(document).on("click", ".add-button", function () {
    const quantityCell = $(this).parent().parent().children()[1];
    const priceCell = $(this).parent().parent().children()[3];
    const netPriceCell = $(this).parent().parent().children()[4];

    increaseQuantity(quantityCell, priceCell, netPriceCell);
});

// Delete Item
$(document).on("click", ".delete-item", function () {
    const deleteTableRow = $(this).parent().parent();
    $("#delete-item-confirm").on("click", function () {
        deleteTableRow.remove();
    });
});

// Blank img if no url is provided
const blankImg = () => {
    const ticketButtons = $("#ticket-buttons").children();
    for (let i = 0; i < ticketButtons.length; i++) {
        const imgTag = $(ticketButtons[i]).children()[0];
        if ($(imgTag).attr("src") === "") {
            $(imgTag).removeAttr("src");
            $(imgTag).css("opacity", 0);
        };
    };
};

// Append item to ticket table
const appendItem = (ticketTableBody, itemId) => {
    $.ajax({
        method: "GET",
        url: `api/inventory/${itemId}`
    }).then(inventory_item => {
        const reduceQuantity = $("<td>").append($("<button>").attr({
            "class": "reduce-button btn btn-primary material-icons",
        }).text("remove"));

        const addQuantity = $("<td>").append($("<button>").attr({
            "class": "add-button btn btn-primary material-icons",
        }).text("add"));

        const deleteButton = $("<td>").append($("<button>").attr({
            "class": "delete-item btn btn-danger",
            "data-id": itemId,
            "data-toggle": "modal",
            "data-target": "#delete-item-modal",
        }).text("X"));

        let itemQuantity = $("<td>").addClass("ticket-cell").text(1);
        let productName = $("<td>").addClass("ticket-cell").text(inventory_item.productName);
        let productPrice = $("<td>").addClass("ticket-cell").text(`$${inventory_item.price}`);
        let netPrice = $("<td>").addClass("ticket-cell").text(`$${inventory_item.price}`);

        let tableRow = $("<tr>").attr({
            "class": "ticket-row",
            "data-id": itemId
        });

        tableRow.append(reduceQuantity, itemQuantity, productName, productPrice, netPrice, addQuantity, deleteButton);

        ticketTableBody.append(tableRow);

        updateTotal();
    });
};

const submitOrder = () => {
    const tableRows = $("#ticket-table-body").children("tr");

    // Check if ticket table is empty
    if (tableRows.length === 0) {
        $("#confirm-submit-modal").modal("show");
    };

    let newOrderArray = [];

    for (let i = 0; i < tableRows.length; i++) {
        const tableRow = tableRows[i];
        const productQuantityCell = $(tableRow).children()[1];
        const productNameCell = $(tableRow).children()[2];
        const priceCell = $(tableRow).children()[3];

        const newOrder = {
            id: $(tableRow).attr("data-id"),
            productName: $(productNameCell).text(),
            productQuantity: $(productQuantityCell).text(),
            price: $(priceCell).text().substring(1)
        };

        newOrderArray.push(newOrder);
    };

    console.log(newOrderArray)

    $.ajax({
        method: "GET",
        url: "/api/inventory"
    }).then(inventory => {
        console.log(inventory);

        for (let j = 0; j < newOrderArray.length; j++) {
            const orderItemID = parseInt(newOrderArray[j].id);

            for (let k = 0; k < inventory.length; k++) {
                const inventoryItemID = inventory[k].id;

                if (orderItemID === inventoryItemID) {

                    // Check if inventory has sufficient quantity to meet order
                    if (newOrderArray[j].productQuantity <= inventory[k].currentQuantity) {
                        let newOrderUpdate = {
                            currentQuantity: inventory[k].currentQuantity - newOrderArray[j].productQuantity,
                        };

                        $.ajax({
                            method: "PUT",
                            url: `/api/inventory/${orderItemID}`,
                            data: newOrderUpdate
                        }).then(() => {
                            $("#order-submit-modal").modal("show");
                        });
                    } 
                    // Insufficient quantity in inventory to meet the order
                    else {
                        $("#insufficient-qty-modal").modal("show")
                    }
                };
            };
        };
    });
};

const increaseQuantity = (quantityCell, priceCell, netPriceCell) => {
    let quantity = $(quantityCell).text();
    let price = $(priceCell).text().substring(1);

    quantity++;
    netPrice = parseFloat(price * quantity).toFixed(2);

    $(quantityCell).text(quantity);
    $(netPriceCell).text(`$${netPrice}`);

    updateTotal();
};

const updateTotal = () => {
    const tableRows = $("#ticket-table-body").children("tr");

    let totalPriceArray = []
    for (let i = 0; i < tableRows.length; i++) {
        const tableRow = tableRows[i];
        const netPriceCell = $(tableRow).children()[4];
        totalPriceArray.push(parseFloat($(netPriceCell).text().substring(1)));
    };
    const add = (a, b) => a + b;
    const totalPrice = totalPriceArray.reduce(add);
    $("#total-price").text(totalPrice.toFixed(2));
};