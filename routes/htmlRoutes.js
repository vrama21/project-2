const db = require("../models");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    })

    app.get("/inventory", (req, res) => {
        db.Inventory.findAll({}).then((items) => {
            console.log(items);
            res.render("inventory", {
                inventory: items
            });
        });
    });

    app.get("/inventory/addItem", (req, res) => {
        res.render("inventoryForm");
    })

    app.post("/inventory/addItem", (req, res) => {
        db.Inventory.create(req.body).then(() => {
            console.log(req.body);
            res.redirect("/inventory");
        });
    })

    app.get("/inventory/:id", (req, res) => {
        db.Example.findOne({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.render("inventory", {
                inventory: inventory_item
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", (req, res) => {
        res.render("404");
    });
};