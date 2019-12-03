const db = require("../models");

module.exports = (app) => {
    app.get("/api/inventory/", (req, res) => {
        db.Inventory.findAll().then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    app.get("/api/inventory/:id", (req, res) => {
        db.Inventory.findOne({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    app.post("/api/inventory", (req, res) => {
        db.Inventory.create(req.body).then(inventory_item => {
            res.json(inventory_item);
        });
    });

    app.put("/api/inventory/:id", (req, res) => {
        db.Inventory.update(
            req.body, {
                where: {
                    id: req.params.id
                }
            }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    app.delete("/api/inventory/:id", (req, res) => {
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.json(inventory_item);
        });
    });

    // app.post('/orders/create', asyncHandler(async (req, res) => {

    //     // Create and save the order
    //     const savedOrder = await Order.create(req.body, {
    //         w: 1
    //     }, {
    //         returning: true
    //     });

    //     // Loop through all the items in req.products
    //     req.body.products.forEach((item) => {

    //         // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
    //         const product = await Product.findById(item.id);
    //         if (!product) {
    //             return res.status(400);
    //         }

    //         // Create a dictionary with which to create the ProductOrder
    //         const po = {
    //             orderId: savedOrder.id,
    //             productId: item.id,
    //             qty: item.qty,
    //         }

    //         // Create and save a productOrder
    //         const savedProductOrder = await ProductOrder.create(po, {
    //             w: 1
    //         }, {
    //             returning: true
    //         });
    //     });

    //     // If everything goes well, respond with the order
    //     return res.status(200).json(savedOrder)
    // }));
};