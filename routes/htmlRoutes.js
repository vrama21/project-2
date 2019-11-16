const db = require("../models");

module.exports = (app) => {
    // Load index page
    app.get("/", (req, res) => {
        db.Inventory.findAll({}).then((inventory) => {
            res.render("index", {
                msg: "Welcome!",
                inventory: inventory
            });
        });
    });

    // Load example page and pass in an example by id
    app.get("/inventory/:id", (req, res) => {
        db.Example.findOne({
            where: {
                id: req.params.id
            }
        }).then((inventory_item) => {
            res.render("example", {
                inventory: inventory_item
            });
        });
    });

    // Render 404 page for any unmatched routes
    app.get("*", (req, res) => {
        res.render("404");
    });
};