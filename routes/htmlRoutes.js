const db = require("../models");

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index");
    })

    app.get("/inventory", (req, res) => {
        db.Inventory.findAll().then((items) => {
            res.render("inventory", {
                inventory: items,
                scripts: [{
                    script: "/js/inventoryFrontEnd.js"
                }]
            });
        });
    });

    app.get("/ticket", (req, res) => {
        db.Inventory.findAll().then(items => {
            res.render("ticket", {
                inventory: items
            })
        });
    });

    app.post("/inventory", (req, res) => {
        db.Inventory.create(req.body).then(item => {
            res.json(item);
        });
    });

    app.get("/ticket", (req, res) => {
        db.Inventory.findAll().then(items => {
            res.render("ticket", {
                inventory: items
            })
        })
    })

    app.get("/inventory/:id", (req, res) => {
        db.Inventory.findOne({
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